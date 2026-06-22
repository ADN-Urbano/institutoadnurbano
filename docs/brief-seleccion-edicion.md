# Brief técnico — Selección de edición en la compra (Opción B)

> Estado: **pendiente de aprobación**. Construye SOBRE el modelo de ediciones (Fase 1) y el rediseño de `/curso/[slug]`.

## 1. Objetivo
Permitir que el comprador **elija a qué edición (cohorte) se apunta** entre las ediciones comprables de un curso, en lugar de comprar siempre la edición `open` por defecto. La tarjeta de precios de 3 tramos pasa de informativa a **seleccionable**.

## 2. Definiciones (decisión)
- **Edición comprable** = `status` en (`open`, `soon`) **y** `startDate` en el futuro **y** `priceCents` válido (≥ 50). Es decir, un cohorte programado y aún no empezado. `running`/`past` **no** son comprables.
- **Edición por defecto (preseleccionada)** = la `open`. Si no hay ninguna `open`, la comprable más próxima por `startDate`.
- Un curso muestra la **tarjeta de compra con selector** si tiene ≥1 edición comprable. Si tiene **0** comprables → estado **"Próximamente"** sin botón (comportamiento actual P1, solo se afina la condición: "0 comprables" en vez de "sin edición open").
- El **precio que se cobra** = `priceCents` de la **edición seleccionada** (nunca del cliente).
- El **acceso al contenido** sigue arrancando en `startDate` de la edición comprada (gate de Fase 1, sin cambios): si compras noviembre, accedes en noviembre.

## 3. Capa de datos (`src/lib/courses.ts`, `src/data/curso.ts`)
- `PriceTier` (en `curso.ts`) gana: `editionId: string`, `purchasable: boolean`, `isDefault: boolean`.
- `toPriceTiers(editions)` incluye esos campos; ordena por `startDate`; tonos 1ª `turquoise` / 2ª `amber` / resto `ink`. Solo entran ediciones **comprables** como seleccionables (las `past` no se muestran como tramo seleccionable).
- Nueva función **pura exportada y testeable** `resolvePurchasableEdition(editions, editionId?)`:
  - Si `editionId` se pasa: devuelve esa edición **solo si** pertenece a la lista y es comprable; si no, lanza/`null` (el checkout responde 409/404).
  - Si no se pasa: devuelve la edición por defecto (la `open`, o la comprable más próxima).
  - Sin comprables → `null`.
- `CourseDetail` expone `priceTiers` (con `editionId`/`purchasable`/`isDefault`) y un `defaultEditionId`.

## 4. Checkout (`src/app/api/checkout/route.ts`)
- Acepta `{ slug, editionId? }`. El `editionId` es **opcional** (compatibilidad: si falta → edición por defecto).
- Pasos: buscar curso por `slug` + `published`; traer sus ediciones; `resolvePurchasableEdition(editions, editionId)`:
  - Edición no encontrada en el curso → **404**.
  - Edición existe pero **no comprable** (past/running/sin precio) → **409**.
  - Sin comprables → **409** ("no hay inscripción abierta").
- `unit_amount = edicionSeleccionada.priceCents`; `metadata = { courseId, editionId: String(edicion.id), slug }`. `product_data.name = course.title` (opcionalmente `+ " · " + editionLabel`).
- **Seguridad (mantener):** el precio se lee SIEMPRE de la edición en Payload por su id; el `editionId` del cliente se valida contra las ediciones del curso (no se confía el precio ni que el id sea de ese curso). `Number(editionId)` (entero vs string de Stripe).

## 5. Webhook (`src/app/api/stripe/webhook/route.ts`)
- **Sin cambios.** Ya lee `Number(metadata.editionId)`, crea el Enrollment con `edition` e idempotencia `(student, edition)` + guard por `stripePaymentId`. Como ahora la metadata trae la edición elegida, el alumno queda inscrito en la correcta automáticamente.

## 6. UI — tarjeta de compra interactiva
- La tarjeta pasa a tener **selector de edición**. Como hoy `PurchaseCard.tsx` es server component, extraer la parte interactiva a un **client component** nuevo `src/components/curso/EditionPurchase.tsx` (`"use client"`):
  - Recibe `slug`, `priceTiers` (comprables) y `defaultEditionId`.
  - Estado `selectedEditionId` (init = `defaultEditionId`).
  - Renderiza los tramos como **opciones seleccionables** (rol radio, accesibles por teclado): tramo seleccionado resaltado (borde turquesa/anillo), los no seleccionados atenuados. Mantener el diseño actual de los tramos (old price tachado, precio grande con tono, `editionLabel`, badge -40%/-20%).
  - El botón **"Inscribirme al curso →"** (reutiliza/ajusta `CheckoutButton`) envía el `selectedEditionId`. Opcional: el botón muestra el precio/edición seleccionados.
- `PurchaseCard.tsx` (server) mantiene badge, "Plazas limitadas"/"Garantía", checklist de `feats` y pie "PAGO SEGURO…", y embebe `<EditionPurchase>` en lugar del bloque estático de tramos + botón.
- `CheckoutButton.tsx`: acepta `editionId?` y lo manda en el POST (`{ slug, editionId }`).
- Estado **"Próximamente"** (0 comprables): igual que ahora, sin selector ni botón.

## 7. Tests (`src/lib/courses.test.ts`)
- `resolvePurchasableEdition`: por defecto devuelve la `open`; con `editionId` válido y comprable lo devuelve; con `editionId` de otra edición no comprable (past) → null/throw; sin comprables → null; sin `open` pero con `soon` futura → devuelve la más próxima.
- `toPriceTiers`: marca `isDefault` en la `open`, `purchasable` correcto, incluye `editionId`.
- Manual (Stripe CLI): seleccionar la 2ª edición y verificar que la Checkout Session lleva ese `editionId` y su `unit_amount`; webhook crea el Enrollment en la edición elegida; intentar `editionId` de una edición `past`/de otro curso → 409/404.

## 8. Files that will change
**Nuevos:** `src/components/curso/EditionPurchase.tsx`.
**Modificados:** `src/lib/courses.ts`, `src/data/curso.ts`, `src/lib/courses.test.ts`, `src/app/api/checkout/route.ts`, `src/components/curso/PurchaseCard.tsx`, `src/components/curso/CheckoutButton.tsx`.

## 9. Fuera de alcance
- Webhook, gate de acceso, modelo de ediciones (sin cambios estructurales).
- Leads/formularios (Fase 2).
- No tocar `.env`, ni la BD (no hace falta reseed: es solo lógica/UI; el esquema no cambia).

## 10. Decisión residual a confirmar
- Al hacer **comprables las ediciones `soon`**, los cursos que hoy solo tienen ediciones `soon` (p. ej. `comunicacion-politica-local`, `turismo-interior`) **dejarán de mostrar "Próximamente" y pasarán a ser comprables** (tienen precio y fecha futura). 
  - Si eso es lo que quieres (pre-venta de cualquier cohorte programado): perfecto, nada que hacer.
  - Si quieres conservar un estado **"anunciado pero todavía no a la venta"**, habría que añadir un `status` nuevo (p. ej. `announced`) que NO sea comprable. Eso es **additive y fuera de este brief** salvo que lo pidas.
