# Checklist /admin — cambios de contenido (Payload) en producción

Estos cambios son **contenido de Payload** (viven en la base de datos de Neon, no
en el código). El código y el **seed** ya están actualizados, pero en producción
la base de datos ya sembrada **no se actualiza sola**: hay que editarlos a mano en
`/admin`. (En dev se reflejan reseeding con `GET /api/seed?secret=…`.)

## Colección **Courses**

### Programa "Construir la alternativa"
- [ ] **Headline (título grande del hero)** → `Conviértete en la alternativa real de gobierno`
      _(el subtítulo/summary se queda como está)._
- [ ] **FAQ** (ver bloque común más abajo).
- [ ] **Feats / checklist** (ver bloque común más abajo).

### Programa "Hacia un nuevo mandato"
- [ ] **Módulos** (nombres): quitar las coletillas →
  - `Gestionar: El QUÉ.`  → **`Gestionar`**
  - `Dirigir: El QUIÉN.`   → **`Dirigir`**
  - `Comunicar: El CÓMO.`  → **`Comunicar`**
- [ ] **"¿Es para ti?" (forYes), primer punto**: cambiar el trato a "tú":
      `…que se siente "ahogado por la gestión" … necesita recuperar el control de su tiempo y su mensaje`
      → `…y te sientes "ahogado por la gestión" … necesitas recuperar el control de tu tiempo y tu mensaje`
- [ ] **FAQ** y **Feats**: ver bloque común.

### Bloque común a los dos programas

**Feats (checklist de la tarjeta de compra):**
- [ ] `Vídeos de formación (5–15 min) y test de fijación` → `… y tests de fijación de conocimientos`
- [ ] Añadir un ítem nuevo: **`Soporte directo por WhatsApp`**
- [ ] `Acceso a Campus Virtual y comunidad` → **`Acceso a Campus Virtual`** (quitar "y comunidad")

**FAQ:**
- [ ] "¿Y si no puedo asistir a un directo?": `…a través del foro de la comunidad.`
      → `…por el canal de soporte del programa.`
- [ ] "¿Cuánto tiempo tendré acceso…?": `…desde la finalización del curso…` → `…del programa…`
- [ ] "¿Cuándo y cómo son las sesiones…?": quitar `(3 en total)` →
      `Se realiza una sesión en directo por módulo centrada en…`
- [ ] "¿Cómo se imparte el contenido teórico?":
      `El programa consta de lecturas estructuradas … y un test de fijación de conocimientos`
      → `El programa consta de módulos con lecturas estructuradas … y tests de fijación de conocimientos`

## Colección **CourseEditions** — "Construir la alternativa"

Poner las **fechas reales** y limpiar la etiqueta (quitar el prefijo "Curso 02 · "):

| Edición | editionLabel | startDate | startLabel |
|---|---|---|---|
| 1 (abierta) | `Edición septiembre 2026` | **3 sept 2026** | `3 sept` |
| 2 (reserva) | `Edición octubre 2026`   | **8 oct 2026**  | `8 oct`  |
| 3 (reserva) | `Edición noviembre 2026` | **5 nov 2026**  | `5 nov`  |

---

## Pendientes / a confirmar (no son Payload)

- **WhatsApp**: el tick "Soporte directo por WhatsApp" y las menciones de soporte
  **no tienen enlace todavía** (falta el enlace del grupo). Cuando lo tengáis, se
  cablea igual que se hará con el resto.
- **Páginas legales** (`/aviso-legal`, `/privacidad`, `/condiciones`): siguen
  diciendo "cursos" ("cursos de formación", "compra de cursos"…). Se dejaron
  intactas a propósito por ser texto legal; decidid si se cambian a "programas".
