# Cambios web ADN Local — lista de tareas (PDF "Cambios web ADN Local")

> Origen: PDF del cliente (16 págs). Implementado el **30-jun-2026**.
> **ESTADO: ✅ COMPLETADO** (todo el PDF + unificación de heroes). Único en espera: **Itinerario** (decisión del cliente pendiente).
> Leyenda: ✏️ texto/dato · 🔧 componente · 🆕 nuevo · 🎨 imagen/diseño · 🗄️ backend/migración.

## Commits (en `main`)
| Tanda | Commit | Contenido |
|---|---|---|
| 1 | `1ce2edf` | Globales + textos (footer, header, hero, microcredenciales, WhatsApp) |
| 2 | `4b3e66c` | Newsletter (+ revert enlaces footer nueva pestaña) — **migrado en Neon** |
| 3 | `8333611` | Programas: abiertos + próximos |
| 4 | `eac900e` | Metodología (rediseño estilo limpio) |
| B3 | `63bccff` | "¿Por qué ADN Local?" → Home |
| 5 | `c94bde4` | Imágenes de banco (Inicio) |
| Heroes | `92d1587` | Heroes 2 columnas consistentes (Sobre nosotros + Metodología) |

---

## A · GLOBALES

### A1 · Footer (`src/components/layout/Footer.tsx`)
- [x] 🔧 Logo más grande (`BrandLogo size="lg"`).
- [x] 🔧 Quitada la columna "ADN Urbano". Quedan FORMACIÓN + LEGAL.
- [x] ✏️ Texto bajo el logo → **"El espacio de referencia de los líderes locales."**
- [x] ✏️ Eliminado "San Rafael & Madrid".
- [x] ~~Enlaces en nueva pestaña~~ **DESCARTADO**: mala práctica de UX/accesibilidad para enlaces internos.

### A2 · Header (`src/components/layout/Header.tsx`)
- [x] 🔧 Logo más grande (`BrandLogo size="md"`). Se añadió prop `size` a `BrandLogo` (sm/md/lg).

### A3 · Imágenes de banco (PDF pág. 2)
- [x] 🎨 Imágenes de banco (Unsplash) **dentro de las secciones** (no bandas full-bleed). Ver Tanda 5 + Heroes. Decisión: banco, a criterio, preview antes de aplicar.

---

## B · INICIO (`src/app/(frontend)/page.tsx`)

### B1 · Hero
- [x] ✏️ Eyebrow → **"ADN Local · Formación"** (sin "Instituto").

### B2 · Teaser de programas (`ProgramasTeaser`)
- [x] ✏️ Eyebrow → **"·· Microcredenciales"**.
- [x] ✏️ Quitado "Curso 01 / Curso 02" del meta (solo "Edición julio/septiembre 2026").
- [x] 🔧 Subtítulo bajo cada curso (campo `subtitle` nuevo): "Prepara el último año de legislatura." / "Prepara la candidatura que tu municipio espera."

### B3 · Mover "¿Por qué ADN Local?" a la Home
- [x] 🔧 Home: `Cita` ("Impulsamos…") sustituida por `WhyAdn` completo (párrafos + cita), debajo de los cursos.
- [x] **Decisión:** se **movió** → quitado de Sobre nosotros (no duplicado).

### B4 · "Cada momento…" → newsletter (`NextStep`)
- [x] 🔧 Columna derecha → alta de email ("No te pierdas nada" + "Suscribirme" + "No compartimos tu información"). Reusa `LeadForm` con variante `onDark` nueva. Aplica en Inicio + Programas (en Metodología se sustituyó por el CTA de itinerario, ver D7).

### B5 · Backend: tipo de lead `newsletter`
- [x] 🗄️ `"newsletter"` añadido a `LEAD_TYPES`, a la colección `Leads` y a `/api/leads`.
- [x] 🗄️ **Migrado en Neon** (valor de enum, aditivo).
- [x] **Decisión:** **con email de confirmación** (`sendNewsletterConfirm`).

---

## C · PROGRAMAS (`src/app/(frontend)/programas/page.tsx`)

### C1 · Abiertos + Próximos (`Programs`)
- [x] 🔧 Catálogo dividido en **"Programas abiertos"** (cursos con edición comprable) y **"Próximos programas"** (Curso 03 "Gobernando con éxito" + 2 tarjetas placeholder con icono calendario).
- [x] 🔧 **Decisión:** "Quiero recibir información" del Curso 03 → **form inline** de lista de espera (municipio + email); no tiene ficha propia.

### C2 · Newsletter al final
- [x] Cubierto por B4 (Programas monta `NextStep`).

---

## D · METODOLOGÍA — rediseño (estilo limpio, **sin ilustraciones 3D**)
> Decisión del cliente: estructura del PDF pero con **iconos de línea** y el diseño limpio del sitio.
> Orden nuevo: MethodHero → Competencias → Method → AsiEsAprender → ComoFunciona → ConstruyeItinerario.

### D1 · Hero nuevo
- [x] 🆕 `MethodHero`: "Todo lo que necesitas saber sobre política local" + subtítulo. (Luego pasó a hero 2 columnas con imagen, ver Heroes.)

### D2 · "Aprende paso a paso"
- [x] 🆕 Bloque "El modelo / Aprende paso a paso" (texto microcredencial, 2 columnas). Sin ilustración puzzle (estilo limpio).

### D3 · 8 competencias
- [x] 🆕 `Competencias`: 8 tarjetas con icono de línea (Estrategia local, Comunicación política, Liderazgo, Gestión municipal, Participación ciudadana, Comercio local, Urbanismo, Campaña electoral) + banda "Construye tu itinerario, paso a paso." Se añadieron 12 iconos de línea a `ui/icons.tsx`.

### D4 · "Formación adaptada a tus necesidades" (3 pilares)
- [x] ✏️🔧 `Method` retitulado: eyebrow "·· La experiencia", heading "Formación adaptada a tus necesidades". 3 pilares 01/02/03 intactos.

### D5 · "Así es aprender en ADN Local"
- [x] 🆕 `AsiEsAprender`: 6 rasgos (Flexible · Práctica · Eficiente · Cercana · Especializada · Aplicada). **Decisión:** en **rejilla** limpia, no carrusel (más limpio, sin JS).

### D6 · "Todo lo que incluye" (`ComoFunciona`)
- [x] ✏️ Texto de "Soporte directo por WhatsApp" → "Acceso a nuestro contacto de Whatsapp de ADN Local para resolver dudas y acompañarte durante todo el programa."

### D7 · CTA "Construye tu propio itinerario"
- [x] 🆕 `ConstruyeItinerario`: CTA final → "Ver programas disponibles" (`/programas`). **Decisión:** **sustituye** al newsletter (`NextStep`) en Metodología.

### D8 · "Por qué tres semanas" (`TresSemanas`)
- [x] **Decisión:** **eliminado** de Metodología (no estaba en el diseño objetivo). El componente queda en el repo, sin montar.

---

## EXTRA · Heroes consistentes (`92d1587`) — no estaba en el PDF
- [x] 🔧🎨 Patrón de hero **2 columnas (texto + imagen)** unificado en **Inicio**, **Sobre nosotros** y **Metodología** (misma proporción/estilo). Programas se queda como catálogo. Imágenes en `public/img/`.

---

## E · EN ESPERA
- **Itinerario** (PDF pág. 10): "Gerardo va a pensar los cambios." → **no se ha tocado**.

---

## Pendiente FUERA de este PDF (de antes)
- 🔴 **Rotar la contraseña de Neon** (se expuso varias veces). Actualizar Vercel + `.env.local`.
- Variables Meta/LinkedIn en **Vercel (Production)** + redeploy (el píxel hoy solo dispara en local).
- Fase webinar: vídeo Bunny, PDF del programa, aprobar copy de emails, link de comunidad WhatsApp.
- Imágenes: hoy son de banco (Unsplash). Si el cliente aporta fotos propias, se sustituyen en `public/img/`.
