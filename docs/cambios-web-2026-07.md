# Cambios web ADN Local — lista de tareas (PDF "Cambios web ADN Local")

> Origen: PDF del cliente (16 págs). Estado del código mapeado el 30-jun-2026.
> Leyenda: ✏️ editar texto/dato · 🔧 cambio de componente · 🆕 construir nuevo · 🎨 necesita asset/diseño · 🗄️ toca backend/migración · ❓ decisión pendiente.
>
> **Nota clave:** casi todo el contenido estático vive en `src/data/formacion.ts`. Los componentes en `src/components/{layout,inicio,formacion,metodologia,sobre}/`.
> **Nota 2:** el PDF muestra para **Metodología** un diseño objetivo que **no existe aún** en el código (hero propio, 8 competencias, carrusel, CTA "Construye tu itinerario"). Eso es construcción nueva, no edición.

---

## A · GLOBALES

### A1 · Footer (`src/components/layout/Footer.tsx`) — afecta a todas las páginas
- [ ] 🔧 **Agrandar el logo** del footer (`BrandLogo tone="yellow"`, línea 41; hoy `h-9`).
- [ ] 🔧 **Quitar la columna "ADN Urbano"** (Sobre nosotros / Equipo / Servicios / Contacto) — array `columns` líneas 14-22. Quedan FORMACIÓN + LEGAL.
- [ ] ✏️ **Cambiar el texto bajo el logo** (líneas 43-46) por: **"El espacio de referencia de los líderes locales."**
- [ ] ✏️ **Eliminar "San Rafael & Madrid"** (línea 72).
- [ ] 🔧 **Todos los enlaces del footer → nueva pestaña** (`target="_blank" rel="noopener noreferrer"`), líneas 57-62. *(Nota: inusual para enlaces internos, pero es lo pedido.)*

### A2 · Header (`src/components/layout/Header.tsx`)
- [ ] 🔧 **Agrandar el logo** del header (`BrandLogo`, línea 56; hoy `h-9`). *(Logo en `src/components/ui/BrandLogo.tsx` → probablemente añadir prop de tamaño y usarla en header + footer.)*

### A3 · Soportes visuales entre secciones (PDF pág. 2) — 🎨❓
- [ ] 🎨 **Añadir imágenes/soportes visuales** en/entre secciones ("demasiado texto seguido"). Afecta a Inicio, Programas, Metodología.
- ❓ **Decisión:** ¿fotos propias o banco de imágenes? ¿qué secciones primero?
- ⚠️ Respeta la preferencia de diseño (rechazó las bandas "amontonadas"): **propondré ubicaciones y enseño preview antes de aplicar.**

---

## B · INICIO (`src/app/(frontend)/page.tsx`: LandingHero → ParaQuien → ProgramasTeaser → Cita → NextStep)

### B1 · Hero (`LandingHero` + `formacion.ts` hero, líneas 8-14)
- [ ] ✏️ **Quitar "Instituto"** del eyebrow: "Instituto ADN Local · Formación" → **"ADN Local · Formación"**.

### B2 · Teaser de programas (`src/components/inicio/ProgramasTeaser.tsx` + `formacion.ts` programs)
- [ ] ✏️ **Eyebrow "·· Programas" → "·· Microcredenciales"** (ProgramasTeaser línea 12).
- [ ] ✏️ **Quitar "Curso 01 / Curso 02"** del meta de cada tarjeta → dejar solo "Edición julio 2026" / "Edición septiembre 2026" (datos en `formacion.ts` ~105-139). *(Aplica también a la página Programas, mismo origen de datos.)*
- [ ] 🔧 **Añadir subtítulo bajo el título de cada curso** (nuevo campo en el dato + render en la tarjeta):
  - "Hacia un nuevo mandato" → **"Prepara el último año de legislatura."**
  - "Construir la alternativa" → **"Prepara la candidatura que tu municipio espera."**
  - Debajo del subtítulo, sigue el texto descriptivo actual.

### B3 · Mover "¿Por qué ADN Local?" a la Home (PDF pág. 5) — 🔧❓
- [ ] 🔧 **Sustituir la cita "Impulsamos…"** (`Cita`, datos `why.quote`) en la home por el **bloque completo "¿Por qué ADN Local?"** (`WhyAdn`, datos `why.paragraphs` + la cita), colocado **debajo de los cursos**.
- El mock (recuadro verde) muestra el texto largo de "¿Por qué ADN Local?" **+ la caja "Impulsamos…"** juntos → montar `WhyAdn` incluyendo la cita.
- ❓ **Decisión:** "Mover" = ¿se **quita** también de la página Sobre nosotros, o se deja en ambas?

### B4 · Sección "Cada momento exige una preparación diferente" → alta newsletter (PDF pág. 6)
- [ ] 🔧 **`NextStep` (`src/components/formacion/NextStep.tsx`)**: cambiar la **columna derecha** (hoy "Elige tu próximo paso" + 2 botones de curso) por un **formulario de email**:
  - Título **"No te pierdas nada"**
  - Texto **"Recibe nuevos programas, webinars y recursos para líderes locales."**
  - Input email + botón **"Suscribirme →"** + nota **"No compartimos tu información."**
  - La columna izquierda ("Cada momento exige una preparación diferente" + párrafo) se mantiene.
- ⚠️ `NextStep` se usa en **Inicio, Programas y Metodología** → el cambio impacta las 3 (ver D7/❓ para Metodología).
- 🗄️ **Depende de B5 (tipo de lead `newsletter`).**

### B5 · Backend: nuevo tipo de lead `newsletter` — 🗄️❓
- [ ] 🗄️ Añadir `"newsletter"` a `LEAD_TYPES` (`src/lib/leads.ts` línea 10), a las opciones del select en `src/collections/Leads.ts` (~82-91) y al manejo en `src/app/api/leads/route.ts`.
- [ ] 🔧 `LeadForm` con `type="newsletter"` (solo email) para B4.
- [ ] 🗄️ **Migración aditiva a Neon** (nuevo valor de enum) — como la de hoy: dev-contra-Neon, `create`.
- ❓ **Decisión:** ¿email de confirmación al suscribirse (Resend) o alta silenciosa?

---

## C · PROGRAMAS (`src/app/(frontend)/programas/page.tsx`: Programs → Webinar → NextStep)

### C1 · Dividir en "Programas abiertos" + "Próximos programas" (PDF págs. 7-8) — 🔧🆕
- [ ] 🔧 **`Programs` (`src/components/formacion/Programs.tsx`)**: partir el catálogo en dos bloques:
  - **"Programas abiertos"** (eyebrow "Catálogo", subtítulo "Formación disponible para que empieces hoy…") → los 2 cursos con edición comprable (los que tienen `href`/precio).
  - **"Próximos programas"** (subtítulo "Nuevas formaciones en desarrollo…") → el **Curso 03 "Gobernando con éxito"** (ya existe en `formacion.ts` ~140-152, `badgeTone:"soon"`, bloque `priority`) **+ 2 tarjetas placeholder "Próximo programa"** (icono calendario, vacías).
- [ ] 🔧 Botón **"Quiero recibir información"** del Curso 03 → captación **lista-espera** (ya existe el tipo). ❓ ¿formulario inline en la tarjeta o enlaza a la ficha del curso (que ya tiene el form de lista de espera)?

### C2 · Newsletter al final de Programas (PDF pág. 9)
- [ ] Cubierto por **B4** (Programas monta `NextStep`).

---

## D · METODOLOGÍA (`src/app/(frontend)/metodologia/page.tsx`: Method → TresSemanas → ComoFunciona → NextStep)
> ⚠️ Rediseño grande. El PDF define un **orden y bloques nuevos**. Mapeo objetivo → código:

### D1 · Hero nuevo (PDF pág. 11) — 🆕🎨
- [ ] 🆕 Crear **hero de Metodología**: título **"Todo lo que necesitas saber sobre política local"** + subtítulo "Un modelo de formación flexible, práctico y aplicado…". Hoy **no hay hero**; la página abre directo con `Method`.

### D2 · "Aprende paso a paso" (PDF pág. 11) — 🆕🎨
- [ ] 🆕 Bloque "El modelo / Aprende paso a paso" (texto microcredencial) + **ilustración tipo puzzle** (🎨 asset).

### D3 · 8 competencias (PDF pág. 12) — 🆕🎨
- [ ] 🆕 Grid de **8 tarjetas**: Estrategia local · Comunicación política · Liderazgo · Gestión municipal · Participación ciudadana · Comercio local · Urbanismo · Campaña electoral. + banda "Construye tu itinerario, paso a paso." (🎨 iconos por tarjeta).

### D4 · "Formación adaptada a tus necesidades" / 3 pilares (PDF pág. 13) — ✏️🔧
- [ ] ✏️🔧 **Reusar `Method`** (ya tiene los 3 pilares 01/02/03 "Teoría a tu ritmo / Casos reales en directo / Todo listo para actuar"). Cambios: eyebrow → **"·· La experiencia"**, heading → **"Formación adaptada a tus necesidades"**, subtítulo "Tres pilares que combinan teoría flexible…". Reubicar en el nuevo orden.

### D5 · Carrusel "Así es aprender en ADN Local" (PDF pág. 14) — 🆕
- [ ] 🆕 **Carrusel** "Lo que nos define / Así es aprender en ADN Local": 6 rasgos (Flexible · Práctica · Eficiente · Cercana · Especializada · Aplicada) con icono + descripción. No existe.

### D6 · "Todo lo que incluye" (PDF pág. 15) — ✏️
- [ ] ✏️ **`ComoFunciona`** (ya existe, 6 tarjetas). Único cambio: en **"Soporte directo por WhatsApp"** (`formacion.ts` comoFunciona ~286-289), texto inferior → **"Acceso a nuestro contacto de Whatsapp de ADN Local para resolver dudas y acompañarte durante todo el programa."**

### D7 · CTA final "Construye tu propio itinerario" (PDF pág. 16) — 🆕❓
- [ ] 🆕 CTA "Construye tu propio itinerario / Empieza ahora / **Ver programas disponibles →**".
- ❓ **Decisión:** en Metodología, ¿este CTA **sustituye** al `NextStep` (newsletter de B4) al final, o van los dos? (El PDF cierra Metodología con este CTA, no con el newsletter.)

### D8 · ¿Qué pasa con "Por qué tres semanas" (`TresSemanas`)? — ❓
- ❓ El diseño objetivo de Metodología **no incluye** el bloque actual "Por qué tres semanas" (`TresSemanas`). **Decisión:** ¿se elimina de Metodología o se mantiene en algún punto?

---

## E · EN ESPERA / NO ENTRAN
- **Itinerario** (PDF pág. 10): "Gerardo va a pensar los cambios, todavía no son definitivos." → **no se toca** por ahora.

---

## DECISIONES PENDIENTES (resumen para el cliente)
1. **A3 imágenes:** ¿propias o banco? ¿qué secciones primero? (enseño preview antes de aplicar).
2. **B3:** "¿Por qué ADN Local?" — ¿se quita de Sobre nosotros o se queda en las dos?
3. **B5 newsletter:** ¿email de confirmación o alta silenciosa?
4. **C1:** "Quiero recibir información" del Curso 03 — ¿form inline o enlaza a la ficha?
5. **D7:** Metodología — ¿el CTA "Construye tu itinerario" sustituye al newsletter o van ambos?
6. **D8:** ¿se elimina "Por qué tres semanas" de Metodología?
7. **Metodología (D1-D5):** confirmar que vamos a por el rediseño completo del PDF (bloques nuevos + assets), respetando el sistema de diseño limpio.

## ASSETS QUE HAY QUE APORTAR
- Imágenes para A3 (entre secciones).
- Ilustración puzzle (D2) e iconos de las 8 competencias (D3) y de los 6 rasgos del carrusel (D5).
- (De la fase webinar, aún pendientes: vídeo Bunny, PDF programa, copy emails, link WhatsApp comunidad.)
