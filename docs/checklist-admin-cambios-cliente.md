# Guía /admin — cambios de contenido (Payload), campo por campo

Estos cambios son **contenido de Payload** (BD de Neon en producción). El código y
el seed ya están, pero la BD de producción **no se actualiza sola**: hay que
editar a mano en `/admin`. Al terminar cada ficha, pulsa **Save/Guardar**.

> ⚠️ **feats (Incluye) y FAQ son por programa**: cada programa tiene su propia
> copia aunque el texto sea idéntico → hay que editarlos en **los DOS** programas.

---

## A) Courses → "Construir la alternativa"

`/admin` → grupo **Contenido** → **Courses** → abre **Construir la alternativa**.

1. **Headline** (campo "Titular largo del hero de la landing", el ancho, arriba):
   - Actual: `Deja de ser "la oposición" para convertirte en la alternativa real de gobierno`
   - Nuevo: **`Conviértete en la alternativa real de gobierno`**
   - **headlineAccent** (campo estrecho a la derecha): dejar **`alternativa real`** (es lo que se pinta en turquesa). El **summary** (subtítulo) NO se toca.

2. **Incluye (tarjeta de compra)** — array de "Puntos":
   - `Vídeos de formación (5–15 min) y test de fijación` → `Vídeos de formación (5–15 min) y tests de fijación de conocimientos`
   - `Acceso a Campus Virtual y comunidad` → `Acceso a Campus Virtual`
   - Botón **"Add Punto"** → escribe **`Soporte directo por WhatsApp`** (colócalo, p. ej., tras "Saldrás con una estrategia…").

3. **Preguntas frecuentes** — array FAQ (ver los 4 cambios en el bloque **FAQ común** de abajo).

---

## B) Courses → "Hacia un nuevo mandato"

`/admin` → **Contenido** → **Courses** → abre **Hacia un nuevo mandato**.

1. **Programa (módulos)** — despliega cada módulo y edita el campo **name**:
   - Módulo 01: `Gestionar: El QUÉ.` → **`Gestionar`**
   - Módulo 02: `Dirigir: El QUIÉN.` → **`Dirigir`**
   - Módulo 03: `Comunicar: El CÓMO.` → **`Comunicar`**

2. **Para quién (es / no es)** (sección plegable) → **Es para ti si…** → primer punto:
   - Actual: `Eres alcalde o concejal que se siente "ahogado por la gestión" diaria y necesita recuperar el control de su tiempo y su mensaje`
   - Nuevo: **`Eres alcalde o concejal y te sientes "ahogado por la gestión" diaria, y necesitas recuperar el control de tu tiempo y tu mensaje`**

3. **Incluye (tarjeta de compra)**: mismos 3 cambios que en A.2.

4. **Preguntas frecuentes**: mismos cambios que el bloque FAQ común.

---

## FAQ común (editar en LOS DOS programas)

En el array **Preguntas frecuentes**, en la respuesta (answer) de cada una:

- **"¿Y si no puedo asistir a un directo?"**: `…a través del foro de la comunidad.`
  → `…por el canal de soporte del programa.`
- **"¿Cuánto tiempo tendré acceso…?"**: `…desde la finalización del curso…`
  → `…desde la finalización del programa…`
- **"¿Cuándo y cómo son las sesiones…?"**: quitar `(3 en total)` →
  `Se realiza una sesión en directo por módulo centrada en la resolución de casos…`
- **"¿Cómo se imparte el contenido teórico?"**:
  `El programa consta de lecturas estructuradas … y un test de fijación de conocimientos`
  → `El programa consta de módulos con lecturas estructuradas … y tests de fijación de conocimientos`

---

## C) CourseEditions → 3 ediciones de "Construir la alternativa"

`/admin` → **Contenido** → **CourseEditions**. Abre las 3 filas cuyo **course** =
"Construir la alternativa" y en cada una edita:

| Fila | editionLabel (quitar "Curso 02 · ") | startDate (sección "Fechas y atributos") | startLabel |
|---|---|---|---|
| Septiembre | `Edición septiembre 2026` | **03/09/2026** | `3 sept` |
| Octubre | `Edición octubre 2026` | **08/10/2026** | `8 oct` |
| Noviembre | `Edición noviembre 2026` | **05/11/2026** | `5 nov` |

(El `status` se queda: septiembre = "Inscripción abierta"; octubre y noviembre = "Próximamente".)

---

## Pendiente aparte (no es /admin)

- **Bizum**: activarlo en el dashboard de Stripe.
- **WhatsApp**: el tick no tiene enlace todavía (falta el grupo).
- **Páginas legales**: siguen diciendo "cursos" (decisión pendiente).
