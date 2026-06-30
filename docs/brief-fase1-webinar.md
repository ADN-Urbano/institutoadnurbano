# Brief técnico — Fase 1: Motor de webinar + captación de leads + atribución

> Estado: **pendiente de aprobación**. Decisiones en `docs/fase1-webinar-leads.md`. Análisis en `docs/analisis-marketing.md`.

## 1. Resumen
Construir el embudo de captación: registro de webinar **evergreen** + otros lead magnets → colección **`Leads`** en Payload + email (**Resend**) + **atribución completa** (UTMs first/last-touch + Meta/LinkedIn Pixel + CAPI server-side), con el origen arrastrado hasta la venta. Sin WhatsApp (nutrición solo email). Diseño limpio (respeta la preferencia del cliente).

## 2. Modelo de datos — colección `Leads` (`src/collections/Leads.ts`)
Registrar en `src/payload.config.ts`. Acceso: `create: () => true` (la crea el endpoint público), `read/update/delete: canEdit` (admin). Campos:
- `email` (text, required, index) · `name` · `phone` · `municipio` · `situacion` (select: gobierno | oposicion | candidato | tecnico | otro) · `comoNosConociste` (text, autoreportado) · `message` (textarea, para contacto)
- `type` (select required: `webinar` | `descarga-pdf` | `contacto` | `lista-espera`)
- `courseSlug` (text, opcional — para lista-espera/contexto)
- **Atribución**: grupos `firstTouch` y `lastTouch` con `{ source, medium, campaign, content, term, landingPage, referrer, date }`; grupo `clickIds { fbclid, gclid, liFatId }`
- `offerDeadline` (date — registro + 72 h, para la cuenta atrás del webinar)
- `enrollment` (relationship → enrollments, opcional — se enlaza tras la compra)
- `createdAt` (auto)

Admin: `useAsTitle: "email"`, `defaultColumns: ["email","type","situacion","firstTouch.source","createdAt"]`, `group: "Marketing"`.

## 3. Captura de atribución (cliente)
- **Componente `AttributionInit`** (client, en el layout): en la **primera visita** lee `utm_*`, `fbclid`/`gclid`/`li_fat_id`, `referrer` y `pathname` → guarda **first-touch** en cookie propia `adn_attrib` (90 días, JSON) si no existe; **siempre** actualiza el **last-touch** en `adn_attrib_last`.
- Estas cookies son **first-party y funcionales** (analítica propia) → no requieren consentimiento; los **píxeles de terceros sí** (ver §7).
- Los formularios leen `adn_attrib`/`adn_attrib_last` y los mandan al endpoint.

## 4. Endpoint `POST /api/leads` (`src/app/api/leads/route.ts`)
- Valida (email obligatorio, `type` válido, anti-spam básico: honeypot + rate-limit suave).
- Crea el `Lead` (Local API) con la atribución recibida. Para `webinar`: calcula `offerDeadline = now + 72h`.
- Dispara **email** (Resend, ver §5) según `type`.
- Dispara **CAPI server-side** (Meta Conversions API, evento `Lead`/`CompleteRegistration`) con email hasheado (SHA-256) + click IDs (ver §7).
- Responde `{ ok, ... }` (para `webinar`: incluye `redirect` a la página de visionado / `offerDeadline`).
- Idempotencia suave: si el mismo email registra el mismo `type` en <24 h, no duplicar email (sí actualizar last-touch).

## 5. Emails (Resend, ampliar `src/lib/email.ts`)
Reutilizar el `shell()` existente. Drip **sin cron** usando el **`scheduledAt` de Resend** (se programan al registrar):
- `webinar`: **email 1** inmediato (acceso a "ver el webinar") · **email 2** (+1 día, valor + recordatorio) · **email 3** (+2 días, oferta + deadline) · **email 4** (a las ~66 h, "últimas horas"). *(Copy a aprobar; dejo borradores.)*
- `descarga-pdf`: email con el **folleto PDF** adjunto/enlazado.
- `contacto`: aviso interno a `EMAIL_FROM`/equipo + autoresponder al lead.
- `lista-espera`: confirmación ("te avisaremos cuando abra la edición").

## 6. Página del webinar evergreen (`/webinar` + visionado)
- **`/webinar`**: landing + **formulario de registro** (name, email, municipio, **situación** gobierno/oposición, ¿cómo nos conociste?) → `POST /api/leads` (`type:webinar`).
- Al registrar: set cookie `adn_webinar` con `offerDeadline` → **redirige a `/webinar/ver`** (página de visionado): **vídeo Bunny** (placeholder hasta tener la grabación) + **cuenta atrás** (deadline 72 h) + **CTA al curso** (con el −40% como bonus del webinar).
- La cuenta atrás se basa en `offerDeadline` (cookie + Lead) → persiste aunque recargue.

## 7. Píxeles + CAPI + consentimiento
- **`PixelLoader`** (client, en el layout): carga **Meta Pixel** y **LinkedIn Insight Tag** **solo si** `localStorage.adn_cookie_consent === "accepted"`.
- **CookieBanner**: al **Aceptar**, emitir un evento (`window.dispatchEvent(new Event("adn-consent"))`) para que `PixelLoader` cargue sin recargar. *(Pequeño cambio en `CookieBanner.tsx`.)*
- **CAPI server-side** (Meta Conversions API): disparar `Lead`/`CompleteRegistration` desde `/api/leads` y `Purchase` desde el **webhook de Stripe**, con email hasheado + `fbclid`. (LinkedIn: con el Insight Tag client basta de inicio.)
- **Eventos**: `PageView` (pixel), `Lead` (registro), `Purchase` (compra, valor = priceCents).

## 8. Atribución hasta la venta
- Añadir `source` (group, opcional) al **`Enrollment`** o, mejor, **enlazar el `Lead`**: en el webhook de Stripe, buscar el `Lead` por email y (a) setear `lead.enrollment`, (b) copiar `firstTouch`/`lastTouch` al `Enrollment` (para reporting de ingresos por canal).

## 9. Cablear formularios existentes (todos → `/api/leads`)
- `src/components/curso/InfoContact.tsx`: el form pasa a enviar (`type:contacto`); el botón "Descargar programa PDF" → captura email (`type:descarga-pdf`) y entrega el PDF.
- **Sección webinar** del sitio → enlaza a `/webinar`.
- **Estado "Próximamente"** de cursos (`CourseHero`/ficha) → form de **lista de espera** (`type:lista-espera`).

## 10. CTA de webinar en el Inicio
- Añadir un **CTA primario** en el hero del Inicio ("Reserva tu plaza · webinar gratuito" → `/webinar`). "Ver programas" como secundario.

## 11. Convención UTM (documentar)
`utm_source` (instagram|linkedin|facebook|google|newsletter|referral) · `utm_medium` (paid|organic|email|social) · `utm_campaign` (`{objetivo}-{aaaa-mm}`) · `utm_content` (creatividad) · `utm_term` (opcional).

## 12. Prerrequisitos (los aporta el cliente / env)
- **Meta**: Pixel ID + **CAPI access token**. **LinkedIn**: Partner ID (Insight Tag).
- **Bunny Stream**: librería + la **grabación del webinar** subida → video ID. *(El motor se construye con placeholder; el vídeo se enchufa luego.)*
- **Resend**: dominio verificado (ya se usa para magic links).
- **Folleto PDF** del programa.
- Aprobación del **copy** de los emails.
- Variables de entorno: `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_TOKEN`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `BUNNY_*`.

## 13. Files that will change
**Nuevos**: `src/collections/Leads.ts` · `src/app/api/leads/route.ts` · `src/app/(frontend)/webinar/page.tsx` · `src/app/(frontend)/webinar/ver/page.tsx` · `src/components/marketing/{AttributionInit,PixelLoader,LeadForm,WebinarCountdown}.tsx` · `src/lib/leads.ts` (helpers atribución/hash) · `src/lib/meta-capi.ts`.
**Modificados**: `src/payload.config.ts` · `src/lib/email.ts` · `src/app/(frontend)/layout.tsx` (AttributionInit + PixelLoader) · `src/components/CookieBanner.tsx` (evento consent) · `src/components/curso/InfoContact.tsx` · `src/app/api/stripe/webhook/route.ts` (CAPI Purchase + enlazar Lead) · `src/collections/Enrollments.ts` (origen) · Inicio (`(frontend)/page.tsx` o `LandingHero`) para el CTA.

## 14. Fuera de alcance
- Grabación real del webinar y el PDF (los aporta el cliente).
- Edición fundadora / testimonios (decisión de sales aparte).
- WhatsApp (nutrición es solo email; la comunidad post-compra es otra tarea).
- Dashboard de reporting avanzado (de inicio, vistas/filtros en Payload admin).

## 15. Reglas duras (CLAUDE.md) + verificación
- NO Payload CLI; tipos locales + casts. Build `--webpack`. Webhook: idempotencia, `Number()` en IDs, no confiar precio del cliente. Tests Vitest puros para los helpers (hash de email, parseo de UTMs, cálculo de deadline). `tsc`/`lint`/`vitest` sin nuevos errores. No tocar `.env`.
- **RGPD**: píxeles solo con consentimiento; actualizar textos de `privacidad`/`cookies`. Anti-spam en `/api/leads`.
