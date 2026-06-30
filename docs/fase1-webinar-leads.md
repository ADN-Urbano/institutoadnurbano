# Fase 1 — Motor de webinar + captación de leads + atribución

> **Estado: decisiones tomadas el 2026-06-27. Implementación pendiente (próxima sesión).**
> Mañana: convertir esto en el brief técnico y construir. Base: `docs/analisis-marketing.md`.

## Decisiones bloqueadas ✅

**Core**
1. **Webinar EVERGREEN** (grabado, registro 24/7). *(El usuario lo prefirió a directo; se compensa la urgencia con el deadline por registrante.)*
2. **Registro y datos EN CASA** (Lead en Payload + email Resend). Dueños del dato → atribución limpia.
3. **Nutrición SOLO EMAIL** (pre-venta). *El WhatsApp del cliente es para la comunidad post-compra del curso, aparte.*
4. **Atribución COMPLETA**: UTMs **first-touch + last-touch** en el Lead + **Meta Pixel** + **LinkedIn Insight Tag** + **Conversions API (CAPI) server-side**.

**Sub-decisiones (ok del usuario a todo)**
5. Vídeo del webinar en **Bunny Stream** (alternativa rápida: YouTube no-listado).
6. **Deadline de la oferta por registrante: 72 h** desde el registro (cuenta atrás en web + emails).
7. El **−40%** se enmarca como **bonus exclusivo del webinar** con ese deadline (no descuento permanente).
8. **Una sola colección `Leads`** para todo: tipos `webinar`, `descarga-pdf`, `contacto`, `lista-espera`.
9. **CTA de webinar PRIMARIO en el Inicio** (hero) + la sección de webinar como registro + en las fichas de curso.

## El embudo (evergreen, email)
```
Ad (con UTMs)  →  CTA "Webinar gratuito"  →  Form registro
   → crea Lead (Payload) con first/last-touch + click IDs
   → email Resend con acceso + dispara CAPI (CompleteRegistration)
   → Página "ver webinar": vídeo Bunny + CUENTA ATRÁS (72h) + CTA al curso
   → Secuencia email (acceso → valor → oferta+deadline → last chance)
   → Stripe Checkout → Enrollment hereda el origen del Lead → CAPI (Purchase)
```

## Alcance a construir (Fase 1)
- **Colección `Leads`** (Payload): `nombre`, `email`, `telefono?`, `municipio`, `situacion` (gobierno/oposicion), `comoNosConociste`, `type`, `firstTouch{source,medium,campaign,content,term,landing,referrer,date}`, `lastTouch{…}`, `clickIds{fbclid,gclid,li_fat_id}`, `createdAt`, (luego) enlace al `Enrollment`.
- **`POST /api/leads`**: valida, crea Lead, envía email (Resend), dispara CAPI. Reutilizable por todos los formularios (`type`).
- **Captura de atribución (client):** script que en la **primera visita** guarda UTMs + `referrer` + landing en **cookie propia (90 días)** → first-touch persistente; last-touch en cada conversión.
- **Formularios** (todos → `/api/leads`): registro webinar · descarga PDF (email→PDF) · "Escríbenos" · lista de espera (cursos `soon`).
- **Página del webinar** (`/webinar` o similar): vídeo Bunny + cuenta atrás (deadline 72h desde el registro, guardado en el Lead) + CTA al curso.
- **Emails (Resend):** confirmación/acceso inmediato + secuencia (valor, oferta+deadline, last chance). *Definir nº y copy en el brief.*
- **Píxeles:** Meta Pixel + LinkedIn Insight Tag (client, **con consentimiento del CookieBanner**) + **CAPI server-side** en `/api/leads` (registro) y en el webhook de Stripe (compra), con email hasheado + click IDs.
- **Atribución hasta la venta:** el `Enrollment` guarda/enlaza el origen del Lead (casar por email).
- **CTA de webinar en el Inicio** (hero) — añadir.
- **RGPD:** consentimiento para píxeles (CookieBanner ya existe); documentar en privacidad.

## Convención UTM (a usar en todos los ads)
- `utm_source`: `instagram` · `linkedin` · `facebook` · `google` · `newsletter` · `referral`
- `utm_medium`: `paid` · `organic` · `email` · `social`
- `utm_campaign`: `{objetivo}-{aaaa-mm}` → p. ej. `webinar-2026-09`
- `utm_content`: la creatividad/variante → `video-a`, `carrusel-b`
- `utm_term`: audiencia/segmento (opcional)

## Pendiente de definir mañana (en el brief)
- Tema/título y guion del webinar (copy del contenido).
- Nº de emails de la secuencia + copy.
- Página vs modal para el registro.
- **Edición fundadora** (primeros testimonios) — decisión de sales, aparte del motor.

## Cabos sueltos anteriores (no de esta fase, pero pendientes)
- WhatsApp de la **comunidad del curso** (post-compra): falta el enlace del grupo.
- Editar **FAQ/feats** de los 2 cursos en `/admin` (prod) para el "6 meses".
- Subir la **foto de Gerardo** en `/admin`.
- **Rotar** la contraseña de Neon (quedó expuesta) y las credenciales admin del seed.
