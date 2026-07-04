# Catálogo / Itinerario ADN Local — estructura + plan de implementación

> Fuente: `260701_Catalogo de cursos_ADN_Local.docx` (estructura provisional del cliente).
> Estado: **plan** (pendiente de aprobar). Fecha: 4-jul-2026.

## 1. Taxonomía (4 niveles)
De menor a mayor:
1. **Clave** — unidad básica de contenido (= un "Tema").
2. **Módulo** — varias Claves. **Grabado, sin directos.**
3. **Programa** — varios Módulos. **Con sesiones en directo + cohorte.**
4. **Especialización** — varios Programas de una misma área + **3 h de consultoría individual** incluidas.

## 2. Áreas del catálogo (= "categoría" de cara al público)
| # | Área | Especialización | Formato |
|---|------|-----------------|---------|
| 1 | **Estrategia y mandato** | ❌ (depende del momento del mandato, no de temática) | 8 Programas (2 líneas × 4 momentos) |
| 2 | **Gestionar tu ayuntamiento** | ✅ "la institución que diriges" | Programas |
| 3 | **Impulsar tu territorio** | ✅ "el municipio a tu cargo" | Programas |
| 4 | **Liderar a tus vecinos** | ✅ "las personas del territorio" | Programas |
| 5 | **Saber comunicarlo** | ✅ "lo que haces con las tres anteriores" | ❓ Programas o Módulos (pendiente) |
| 6 | **Gestión de políticas sectoriales** | ❌ | 8 Módulos sueltos (sin Programa) |

### Área 1 · Estrategia y mandato (matriz 2×4 = 8 Programas)
| Momento | Gobierno | Oposición / candidatura |
|---|---|---|
| 1 · Inicio de legislatura | Arrancar el mandato (100 días + plan de gobierno) | Organizar la oposición desde el primer día |
| 2 · Ecuador de legislatura | El giro de mitad de mandato | Consolidar la alternativa (de reactivo a propositivo) |
| 3 · Último año | **Hacia un nuevo mandato** ✅ ya construido | **Construir la alternativa** ✅ ya construido |
| 4 · Campaña electoral | Gobernar la campaña (desde el poder) | Ganar la calle (sin aparato institucional) |

→ **Los 2 cursos vivos son el Momento 3 (Último año)** de esta matriz. Su **categoría = "Estrategia y mandato"**.

### Área 2 · Gestionar tu ayuntamiento
- **Programa: El Gobierno** — 4 módulos (equipo de gobierno/gabinete · coordinación interna · liderar equipos técnicos/funcionariales · el Pleno y la oposición). *Basado en el TFM de Gerardo + caso Santa Eulalia.* ❓ pendiente: 4 módulos vs el estándar de 3 (¿fusionar o aceptar 4 semanas?).
- **Programa: La Estructura de Gestión** — secretario/interventor/jurídicos · gestión económica y financiación (presupuestos, fondos EU, subvenciones) · contratación pública.

### Área 3 · Impulsar tu territorio
Estrategia de ciudad · revitalización de barrios/pedanías · movilidad y espacio público · urbanismo y vivienda.

### Área 4 · Liderar a tus vecinos
Agenda pública del cargo · mapa de actores/tejido social · participación ciudadana · gestión de crisis (la decisión de gobierno).

### Área 5 · Saber comunicarlo (❓ Programas o Módulos)
Comunicación pública (base) · comunicación digital/redes institucionales · hablar en público · gestión de medios · comunicación de crisis (el mensaje).

### Área 6 · Gestión de políticas sectoriales (8 Módulos)
Turismo y marca ciudad · Comercio, emprendimiento y empleo · Cultura y festejos · Gestión de servicios públicos · Gestión de obras e inversiones · Servicios sociales · Seguridad ciudadana y emergencias · Smart City y administración electrónica.

### Pendiente de ubicar
Deporte · Agricultura y sector primario · Sostenibilidad y transición ecológica (¿9º módulo sectorial o transversal?).

## 3. Decisiones abiertas (del propio documento)
1. Área 5 (comunicación): ¿5 Programas independientes o Módulos de 1-2 Programas mayores?
2. Área 2 "El Gobierno": ¿4 módulos o se fusiona a 3?
3. Ubicar Deporte / Agricultura / Sostenibilidad.
4. En varios bloques, decidir si cada pieza se vende como **Programa** o como **Módulo**.

## 4. Plan de implementación (por fases)

### Fase 0 — AHORA (esta tanda): categoría en las tarjetas
- Añadir `categoria` (área) a cada curso. Los 2 vivos → **"Estrategia y mandato"**.
- Tarjetas (catálogo `/programas` + teaser Inicio): **quitar la edición del meta y mostrar la categoría** (el título ya es el `h3`). *(Cierra T12: "quitar Curso 01 · Edición → título + categoría".)*
- Sin migración: es dato estático en `formacion.ts`.

### Fase 1 — Modelar el catálogo en Payload
- Ampliar `Courses` (o nueva estructura) con: `area` (las 6), `tipo` (Clave/Módulo/Programa/Especialización), y para el área 1 `linea` (gobierno/oposición) + `momento` (1-4).
- Página **/itinerario** (hoy en espera) = **esta** vista: el catálogo agrupado por área, con la matriz 2×4 del área 1 y las especializaciones. Es el "mapa" que el alumno recorre.
- Estados: `disponible` / `próximamente` por pieza.

### Fase 2 — Contenido real y venta por nivel
- Módulos (grabados) y Claves como contenido; Especializaciones con las 3 h de consultoría.
- Checkout por Módulo / Programa / Especialización (packs).
- Es, de facto, la **Fase 2 del producto** (catálogo completo); build grande, se prioriza con el cliente.

## 5. Nota sobre "categoría" en la ficha/tarjeta
- Valor mostrado = **área** ("Estrategia y mandato"). Limpio y con significado.
- Opción de enriquecer luego: "Estrategia y mandato · Gobierno" / "· Oposición", o el momento ("Último año"). De momento solo el área.

---

## Anexo · Campos del checkout (Stripe) — plan aparte (T10)
Objetivo: recoger datos del participante al comprar → **Nombre, Apellidos, Municipio, País, Cargo** (+ recomendado **Teléfono**).

**Restricción real de Stripe Checkout:** de serie recoge email, **nombre** (un solo campo), **teléfono** (opcional) y **dirección de facturación** (país validado, ciudad, etc.). Además admite **máximo 3 "campos personalizados"** (texto / desplegable / numérico).

**Mapeo propuesto:**
- **Email** → nativo.
- **Nombre y apellidos** → nombre nativo (1 campo). *(Si se quieren separados de verdad, gasta 2 de los 3 custom fields.)*
- **País** → dirección de facturación nativa (país validado).
- **Teléfono** → nativo (opcional).
- **Custom fields (≤3):** `Municipio` (texto) · `Cargo` (desplegable: gobierno/oposición/candidato/técnico/otro) · 1 libre (p. ej. "Entidad/Ayuntamiento" o NIF para factura).

**Implica:** el webhook de Stripe debe leer `customer_details` + `custom_fields` y guardarlos en el `Enrollment` (nuevos campos → migración). Toca el flujo de pago → **se implementa tras confirmar el mapeo** (es sensible).
