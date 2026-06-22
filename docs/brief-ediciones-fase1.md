# Brief técnico — Fase 1: Ediciones (CourseEditions) dentro de un mismo curso

> Estado: **pendiente de aprobación**. Decisiones de producto cerradas (ver §12). Preguntas residuales en §13.

## 1. Resumen

Se introduce una nueva colección Payload `CourseEditions` que encapsula todo lo que varía por convocatoria (precio, estado, fechas, directos, anuncios), dejando en `Courses` únicamente el contenido permanente (módulos, vídeos, textos, materiales, instructor, FAQ). El flujo de compra resuelve la edición abierta del curso y la almacena en Stripe metadata y en el `Enrollment`. Un gate server-side compara `edition.startDate` con la fecha actual para determinar si el alumno tiene acceso (`active`) o está en espera (`pending`), aplicado en la página del área y en el endpoint de progreso.

## 2. Modelo de datos

### 2.1 Nueva colección `CourseEditions` (`src/collections/CourseEditions.ts`)

| Campo | Tipo Payload | Notas |
|---|---|---|
| `course` | `relationship` → `courses`, required | N:1 al curso padre |
| `editionLabel` | `text` | Ej.: "Curso 01 · Edición Junio 2026" (sustituye `edition` de Course) |
| `status` | `select` required, default `"soon"` | `soon` / `open` / `running` / `past` |
| `statusLabel` | `text` | Ej.: "Inscripción abierta · 16 plazas" |
| `priceCents` | `number` required | En céntimos |
| `oldPriceCents` | `number` | Precio anterior tachado |
| `priceNote` | `text`, default `"IVA inc."` | |
| `startDate` | `date` required | Inicio de acceso al contenido (gate) |
| `endDate` | `date` | Informativo/opcional. NO revoca acceso |
| `startLabel` | `text` | Ej.: "29 jun" |
| `seatsLabel` | `text` | Ej.: "14 / 30" |
| `liveSessions` | `array` `{ title (req), date (req), teamsLink }` | Directos del cohorte |
| `announcements` | `array` `{ date, title (req), body (req) }` | Avisos del cohorte |

Admin: `useAsTitle: "editionLabel"`, `defaultColumns: ["editionLabel","course","status","startDate","priceCents"]`, `group: "Contenido"`. Acceso: `read: () => true`, `create/update/delete: canEdit`.

### 2.2 Cambios en `Courses.ts` — campos que se ELIMINAN (DESTRUCTIVO)

`edition`; collapsible "Precio y estado" salvo `published` (`priceCents`, `oldPriceCents`, `priceNote`, `status`, `statusLabel`); de atributos: `startLabel`, `seatsLabel` (se mantienen `durationLabel`, `levelLabel`); de `modules[].lessons[]`: la opción `kind:"live"`, `liveDate`, `teamsLink`; `announcements`.

Permanecen en Course: `title`, `accent`, `headline`, `headlineAccent`, `slug`, `summary`, `description`, `instructor`, `feats`, `teams` (solo textos), `modules` (video/text/doc), `forYes`, `forNo`, `faq`, `durationLabel`, `levelLabel`, `published`.

### 2.3 Cambios en `Enrollments.ts`

Añadir `edition` (`relationship` → `course-editions`, `required: false` en esta fase para tolerar legado). Idempotencia pasa de `(student, course)` a `(student, edition)`.

### 2.4 `payload.config.ts`

Registrar `CourseEditions` en `collections`.

## 3. Checkout y webhook

### 3.1 `POST /api/checkout`
1. Recibe `{ slug }` (cliente sin cambios).
2. Busca curso por slug + `published`.
3. Busca edición con `course = courseId` y `status = "open"`, `limit 1`. Si no → 409.
4. Precio de `edition.priceCents` (valida `>= 50`).
5. `unit_amount: edition.priceCents`.
6. metadata: `{ courseId, editionId, slug }` (todos string).
7. `product_data.name` sigue siendo `course.title`.

### 3.2 Webhook `fulfillCheckout`
- `editionId = Number(session.metadata?.editionId)`; si `NaN`/0 → log y return (no reintento).
- Idempotencia: buscar `{ student, edition }`. Si existe → return.
- Guard secundario: buscar por `stripePaymentId`; si existe → return.
- Crear Enrollment `{ student, course, edition, status:"active", purchasedAt, stripePaymentId }`.
- Email de bienvenida sin cambios.

### 3.3 `revokeRefund` — sin cambios (revoca por `stripePaymentId`).

## 4. Capa de datos (`src/lib/courses.ts`)

- Nuevo tipo local `EditionDoc` (course, editionLabel, status, statusLabel, priceCents, oldPriceCents, priceNote, startDate, endDate, startLabel, seatsLabel, liveSessions[], announcements[]).
- `CourseDoc` se simplifica (quita los campos movidos).
- `CourseDetail` (`src/data/curso.ts`): renombrar `edition`→`editionLabel`, añadir `startDate` y `accessState`.
- `EnrolledCourse`: añadir `editionId`, `startDate`, `accessState`.
- `CatalogCard.id` pasa a `editionLabel` de la edición activa.

**`computeAccessState` (función pura exportada, testeable):**
```ts
export function computeAccessState(startDate: string, now: number = Date.now()): "pending" | "active" {
  return new Date(startDate).getTime() <= now ? "active" : "pending";
}
```

- `nextLiveSession(edition: EditionDoc, now?)` — lee de `edition.liveSessions`.
- `courseAnnouncements(edition: EditionDoc)` — lee de `edition.announcements`.
- `getCatalogCourses`: query única a `CourseEditions` con `status in [open, soon]`, `depth:1` para poblar curso; ordenar por `startDate`. Evita N+1. (Quita `sort:"edition"`.)
- `getCourseWithEdition(slug)` → `{ course, edition|null }` (la usan la página pública y la del área).
- `toCourseDetail(course, edition, now?)` — precio/estado/fechas de la edición; duración/nivel del curso; calcula `accessState`.
- `getStudentCourses`: poblar `edition` con `depth:1`; añadir `editionId`, `startDate`, `accessState`. `progress` sigue inline.
- `isEnrolled`: sin cambio de firma.

## 5. Gate de acceso server-side

Criterio: `enrollment.status === "active"` AND `accessState === "active"`.

- `src/app/(frontend)/area/curso/[slug]/page.tsx`: si `!mine` → `redirect("/area")`; si `pending` → pantalla "plaza confirmada" + cuenta atrás hasta `startDate` (sin Classroom ni materiales; sí Onboarding adaptado + Announcements de la edición); si `active` → flujo actual.
- `src/app/api/progress/route.ts`: tras verificar ownership, cargar `enrollment.edition`, `computeAccessState(startDate)`; si `pending` → 403. `edition` nulo (legado) → tratar como `active`.

## 6. Componentes

- `area/page.tsx`: tarjeta muestra "Acceso desde [fecha]" si `pending`; progreso si `active`. Enlace navegable (gate en destino).
- `area/curso/[slug]/page.tsx`: ver §5; directos/anuncios desde la edición.
- `components/area/NextSession.tsx`: sin cambios de interfaz (el llamador pasa `nextLiveSession(edition)`).
- `components/area/Classroom.tsx`: sin cambios (sin lógica de acceso).
- `curso/[slug]/page.tsx`: usa `getCourseWithEdition` + `toCourseDetail(course, edition)`.
- `components/curso/CourseHero.tsx`: `course.edition` → `course.editionLabel`.
- `components/curso/PurchaseCard.tsx`, `CheckoutButton.tsx`: sin cambios de lógica.

## 7. Seed y backfill

### 7.1 Recrear esquema en dev (DESTRUCTIVO)
```bash
pkill next
psql "postgresql://santi@localhost:5432/adnlocal?host=/tmp" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
rm -rf .next
npm run dev
# luego: GET /api/seed?secret=<PAYLOAD_SECRET>
```

### 7.2 `src/data/courses-seed.ts`
Separar los campos de edición en un array paralelo `editionsSeed` (uno por curso): `courseSlug`, `editionLabel`, `status`, `statusLabel`, `priceCents`, `oldPriceCents`, `priceNote`, `startDate`, `startLabel`, `seatsLabel`, `liveSessions[]`, `announcements[]`. Quitar de `coursesSeed` esos campos y eliminar las lecciones `kind:"live"`.

### 7.3 `src/app/api/seed/route.ts`
Paso 2c) upsert de ediciones (por `courseSlug` + `editionLabel`). Paso 3) enrollment de prueba con `edition` cuya `startDate` esté en el pasado (alumno de prueba = `active`).

## 8. Plan de migración a producción (Neon)

1. Preparar y verificar todo en local (build `--webpack`, tests, ciclo DROP/reseed hecho).
2. Crear `course_editions` y la columna `edition` en Neon arrancando `dev` contra Neon (con `NODE_OPTIONS=...ipv4first`). Parar.
3. Crear en `/admin` de prod una `CourseEdition` por curso, `startDate` en el pasado. Anotar IDs.
4. Backfill SQL **antes** de desplegar: `UPDATE enrollments SET edition_id = <id> WHERE course_id = <id> AND edition_id IS NULL;` (verificar nombre exacto de columna en dev).
5. Desplegar en Vercel.
6. (Post-deploy, opcional) limpiar columnas obsoletas en `courses` con `ALTER TABLE ... DROP COLUMN`. **Nunca `DROP SCHEMA` en Neon.**

## 9. Tests

- Nuevos: `computeAccessState` (pasado→active, futuro→pending, igual→active por `<=`, ISO inválida→pending).
- Actualizar: `nextLiveSession` y `courseAnnouncements` (fixture pasa de CourseDoc a EditionDoc), `toCatalogCard` (firma `(course, edition)`), `toCourseDetail` (accessState active/pending, editionLabel).
- Manual: checkout resuelve edición + metadata; webhook crea enrollment con edición; gate `pending` (área + 403 progress); idempotencia (reenviar evento).

## 10. Files that will change

**Nuevos:** `src/collections/CourseEditions.ts` (y opcionalmente `src/lib/editions.ts`; se recomienda mantener todo en `courses.ts`).

**Modificados:** `src/payload.config.ts`, `src/collections/Courses.ts`, `src/collections/Enrollments.ts`, `src/lib/courses.ts`, `src/lib/courses.test.ts`, `src/data/curso.ts`, `src/data/courses-seed.ts`, `src/app/api/seed/route.ts`, `src/app/api/checkout/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/app/api/progress/route.ts`, `src/app/(frontend)/area/page.tsx`, `src/app/(frontend)/area/curso/[slug]/page.tsx`, `src/app/(frontend)/curso/[slug]/page.tsx`, `src/components/curso/CourseHero.tsx`.

## 11. Riesgos

- **R1** Casts `as unknown as` ocultan errores de forma → disciplina manual en tipos locales.
- **R2** `sort:"edition"` romperá al quitar el campo → cambiar a la vez.
- **R3** Página pública sin edición abierta (ver P1).
- **R4** Ventana entre deploy y backfill → hacer backfill SQL **antes** del deploy.
- **R5** N+1 en `getCatalogCourses` → query única a `CourseEditions`.
- **R6** Enrollments sin `edition` tras deploy → fallback `active`.
- **R7** Pantalla de espera (`pending`) nueva → seguir estilo existente, mobile-first.
- **R8** Renombrar `edition`→`editionLabel` en `CourseDetail` → buscar todos los usos de `course.edition`/`c.edition`.

## 12. Decisiones ya tomadas

1. Colección nueva `CourseEditions` (no array anidado).
2. Una edición a la venta a la vez por curso (`status:"open"`), invariante del admin.
3. Compra sin fricción; precio de la edición.
4. Gate = solo límite inferior `startDate`; `pending`→`active`; sin revocación por `endDate`.
5. Gate server-side en área + `progress`.
6. Directos en `edition.liveSessions`; eliminar `kind:"live"`.
7. Anuncios en la edición.
8. Reparto de campos según §2.1/§2.2.
9. Checkout resuelve edición e inyecta `editionId`; webhook `Number(editionId)`, idempotencia `(student, edition)` + guard por `stripePaymentId`.
10. Backfill: una edición por curso, `startDate` en pasado, precio actual.

## 13. Preguntas residuales — RESUELTAS (aprobadas)

- **P1** Página pública `/curso/[slug]` sin edición activa → **(b) "Próximamente"**: mostrar la página informativa con la PurchaseCard en estado "Próximamente" y **sin botón de compra**. La captura de email/waitlist es Fase 2. (Caso "Gobernando con éxito".)
- **P2** `getCatalogCourses` → **omitir** los cursos sin edición `open`/`soon` (no son vendibles ahora). Variante de query única a `CourseEditions`.
- **P3** Edición `past` → acceso de por vida = `active` siempre; **sin diferencia visual** entre `running` y `past` en esta fase.
- **P4** Nombre de columna de relación (`edition_id`): el build-agent lo verifica en el esquema generado en dev antes de redactar el SQL de backfill del plan de prod.
