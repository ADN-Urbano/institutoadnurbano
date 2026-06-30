# Plan — ADN Local como página de venta de cursos (y los cursos en sí)

> Construye sobre lo ya hecho. Plan maestro previo: `~/.claude/plans/scalable-baking-otter.md`.

## Estado actual (qué ya funciona)
- **Sitio reestructurado**: Inicio (marca/promesa) · Programas · Itinerario · Metodología · Sobre nosotros · fichas `/curso/[slug]`.
- **Modelo de ediciones** (convocatorias) con precio/fechas/estado por edición, **gate de acceso** por `startDate` y **selector de edición** en la compra.
- **Checkout Stripe** + **webhook** (alta de alumno + enrollment idempotente) + **reembolsos** (`charge.refunded` revoca acceso).
- **Área del alumno**: classroom, progreso, próximo directo, anuncios.

---

## A. Página de VENTA (conversión + confianza)

1. **Contenido/copy final** — sustituir placeholders: **foto del profesor** (Gerardo), revisar FAQ/feats por curso en `/admin` (p. ej. "6 meses", WhatsApp), métricas reales si las hubiera (de momento NO inventar formación).
2. **Prueba social** (cuando haya alumnos): testimonios, casos, valoraciones, logos de ayuntamientos. Hoy no hay → dejar hueco y rellenar tras las primeras ediciones.
3. **Checkout con datos del comprador** *(feedback cliente)* — recoger nombre/apellidos, municipio, país y teléfono **dentro de Stripe Checkout** (`custom_fields` + `billing_address_collection`), sin formulario propio. Activar **IVA/Stripe Tax** (`automatic_tax`, ya pre-cableado).
4. **Recomendador gobierno/oposición** *(feedback cliente)* — mini-selector "¿gobiernas o estás en la oposición?" → recomienda *Hacia un nuevo mandato* / *Construir la alternativa*. Orientación, no candado.
5. **SEO**: metadata por página (hecho), **OG images**, `sitemap.xml`, `robots.txt`, **datos estructurados** `schema.org/Course` para las fichas.
6. **Analítica + embudo**: Vercel Analytics o GA4 + eventos de checkout (Stripe) para medir conversión.
7. **Legal/RGPD**: ya hay aviso legal/privacidad/cookies/condiciones; añadir **política de reembolso/garantía** visible y los datos fiscales de la empresa.

## B. Captación de LEADS (Fase 2 — los formularios hoy son decorativos)
1. **Colección `Leads`** + endpoint + email (Resend).
2. **Cablear**: "Escríbenos" (contacto), **reservar webinar**, y **"reserva tu plaza" / lista de espera** para cursos `soon`/"Próximamente" (p. ej. *Gobernando con éxito*).
3. **Webinar real**: fecha, registro y recordatorios.

## C. Los CURSOS en sí (entrega / LMS)
1. **Vídeos reales** con **Bunny Stream** (`bunnyVideoId` ya existe en el modelo de lección) — sustituir los mocks.
2. **Almacenamiento de media** en **R2/S3**: hoy el media del seed (SVG/CSV) **da 404 en Vercel** (disco efímero). Imprescindible para materiales descargables y miniaturas.
3. **Comunidad por WhatsApp** *(feedback cliente)* — sustituir Slack en el área del alumno: nuevo `WHATSAPP_INVITE_URL`, renombrar `SlackCard`/`Onboarding` y el copy. (En la web pública ya pone WhatsApp.)
4. **Certificados de finalización** (pendiente 4.7): generar PDF al 100% de progreso.
5. **Email de bienvenida** (Resend) — revisar y pulir el magic-link + acceso.
6. **Ediciones reales**: crear convocatorias en `/admin` con su **calendario de directos** por edición.

## D. Operativa / infra
1. **Stripe dashboard**: branding, recibos, datos fiscales de España, IVA/Stripe Tax.
2. **Seguridad**: **rotar la contraseña de Neon** (quedó expuesta en la migración) y las **credenciales admin del seed**.
3. **Backups** de Neon y monitorización básica.

---

## Priorización sugerida

| Fase | Objetivo | Incluye |
|---|---|---|
| **1 · Lanzar bien** | Poder vender de verdad | Foto profesor · FAQ/feats correctos en /admin · checkout con datos + IVA · WhatsApp en área · Stripe fiscal · SEO básico + analítica · rotar credenciales |
| **2 · Captación** | No perder interesados | Colección Leads + formularios cableados (contacto, webinar, lista de espera) · recomendador gobierno/oposición |
| **3 · Entrega** | Cursos de verdad | Vídeos Bunny · R2 storage · certificados · comunidad WhatsApp |
| **4 · Escala** | Crecer | Testimonios/casos · más cursos del itinerario · optimización de conversión (A/B, copy) |

## Cabos sueltos inmediatos (de esta tanda)
- Editar **FAQ/feats** de los 2 cursos en `/admin` (prod) para que el "6 meses" salga live.
- **WhatsApp del área**: falta el enlace del grupo para cablearlo.
- Subir la **foto de Gerardo** en `/admin`.
