# Brief técnico — Rediseño de la página de curso `/curso/[slug]`

> Estado: **pendiente de aprobación**. Construye SOBRE el modelo de ediciones ya implementado (`docs/brief-ediciones-fase1.md`).

## Decisiones cerradas
1. **Precios de la tarjeta = ediciones reales.** Cada curso tiene 3 ediciones (primera `open`, segunda y tercera `soon`). La tarjeta pinta el roadmap desde esas filas; el precio de compra = la edición `open`.
2. **Formularios presentacionales.** "Escríbenos", "Reservar webinar", "Reservar mi plaza", "Descargar programa PDF" se maquetan igual que el PDF pero **sin backend** (anclas/`#` o botones inertes). Se cablean en la Fase 2 (leads). NO tocar checkout ni webhook.
3. **Sembrar los 2 cursos del PDF** (`hacia-un-nuevo-mandato`, `construir-la-alternativa`) con el contenido exacto de abajo, cada uno con 3 ediciones. La home de Formación enlaza sus 2 primeras tarjetas a `/curso/[slug]`.

## Diseño
Mantener el sistema actual (tokens del brandbook, `font-display` uppercase para títulos, eyebrows mono coral, tarjetas redondeadas, bloques teal/coral, mobile-first `grid-cols-1` + `lg:`). Reutilizar patrones ya existentes (el mock de vídeo y la tarjeta coral del `components/formacion/Webinar.tsx`, el `SectionHead`, `AccentTitle`).

---

## 1. Cambios de esquema (Payload `Courses`) — ADITIVOS (no destructivos)

Añadir a `src/collections/Courses.ts` (auto-push en dev sin DROP):

- En `instructor` (group) añadir: `photo` (upload → media), `tagline` (text — la línea del bloque "Imparte" del hero), `longBio` (array de `{ paragraph: textarea }` — bio larga de "Quién te acompaña"), `experienceLabel` (text, ej. "Más de 10 años de experiencia"), `specialties` (array de `{ item: text }`).
- `videoIntro` (group): `title` (default "Descubre más sobre el programa"), `desc` (textarea), `label` (text, default "Vídeo presentación curso"). *(placeholder de vídeo, sin reproductor real)*
- En cada `modules[]` añadir `description` (textarea — el párrafo del acordeón). Los "Tema N…" se modelan como `lessons[]` (solo `title`, `kind:"text"`) para que `Curriculum` los liste como bullets.
- `outcomes` (array de `{ item: text }`) — "Al terminar el programa tendrás listo…".
- `programPdfLabel` (text, default "Descargar programa completo PDF") — enlace placeholder `#`.
- `webinar` (group): `desc` (textarea), `nextSessionLabel` (text), `durationLabel` (text, default "45 minutos"), `cta` (text, default "Reservar mi plaza en el webinar"). *(placeholder)*
- `finalCta` (group): `title` (text), `desc` (textarea), `seatsTitle` (text, default "Solo 30 plazas disponibles"), `seatsDesc` (textarea), `cta` (text, default "Reservar mi plaza"). *(botón inerte)*

Los feats, faq, forYes, forNo ya existen y se reutilizan.

---

## 2. Capa de datos (`src/lib/courses.ts`, `src/data/curso.ts`)

- **Roadmap de ediciones**: la `PurchaseCard` necesita TODAS las ediciones del curso (no solo la abierta). Añadir `getCourseEditions(courseId)` → lista de `EditionDoc` ordenada por `startDate`, o ampliar `getCourseWithEdition` para devolver también `editions: EditionDoc[]`. Mapear a un `priceTiers: PriceTier[]` en `CourseDetail` (label tipo "Primera edición"/"Segunda edición"/"A partir de la tercera edición", discount, oldPrice, price, editionLabel, tone turquoise/amber/ink — reutilizar el patrón de `Programs.tsx`/`src/data/formacion.ts`). La 1ª edición = tono turquoise, 2ª = amber, 3ª = ink. El descuento (-40%/-20%) se calcula desde `oldPriceCents`/`priceCents` o se guarda en la edición (añadir opcional `discountLabel` a `CourseEditions` si hace falta — additive).
- Extender `CourseDoc` y `CourseDetail` con los campos nuevos (instructor ampliado, videoIntro, outcomes, programPdfLabel, webinar, finalCta, modules[].description).
- Mantener el gate de acceso y todo lo de ediciones intacto.

---

## 3. Plantilla — sección por sección

Orden y componentes (en `src/app/(frontend)/curso/[slug]/page.tsx`):

1. **Hero** (`CourseHero` restyle): breadcrumb `Inicio / Formación / {title}`; eyebrow pill = `editionLabel` de la edición abierta (ej. "Curso 01 · Edición julio 2026"); `headline` grande con `headlineAccent` en turquesa; `summary`; bloque "IMPARTE" (avatar turquesa + `instructor.name` + `instructor.tagline`). A la derecha la `PurchaseCard`.
2. **PurchaseCard** (rediseño): badge `INSCRIPCIÓN ABIERTA` (verde) si hay edición open; **3 tramos de precio** desde `priceTiers` (mismo patrón visual que `Programs.tsx`: old price tachado coral, precio grande con tono, `editionLabel` debajo, badge -40%/-20%); fila "Plazas limitadas" (UsersIcon) + "Garantía ADN Local" (ShieldIcon) con su copy; subtítulo coral "RESERVA TU PLAZA"; checklist de `feats` (CheckIcon verde); botón ink "Inscribirme al curso →" (usa `CheckoutButton`, que sigue enviando solo `{ slug }`); pie "PAGO SEGURO · STRIPE · FOLLETO EN PDF". Si NO hay edición open → estado "Próximamente" sin botón (ya resuelto en Fase 1, mantener).
3. **Vídeo presentación** (nuevo `components/curso/VideoIntro.tsx`): tarjeta coral (`bg-coral`) con `videoIntro.title` + `videoIntro.desc` a la izquierda y mock de reproductor oscuro a la derecha con `videoIntro.label`. Reutilizar el mock de `components/formacion/Webinar.tsx`.
4. **TeamsBox** (existe, restyle a caja negra `bg-ink`): "Las clases en directo se imparten por Microsoft Teams" + `teams.desc`.
5. **Programa** (`Curriculum` restyle): `SectionHead` eyebrow "·· Programa", título "Tres **semanas**, paso a paso", enlace lateral `programPdfLabel` (href `#`). Acordeón de `modules`: número (01/02/03) turquesa, `name` en negrita, `description`, y los temas (`lessons[].title`) como bullets. Mantener acordeón abrible.
6. **Es / No es para ti** (`ForYou` restyle): 2 tarjetas — verde (`bg-green`) "·· ES PARA TI SI…" + `forYes.title` (display) + items con check; negra (`bg-ink`) "·· NO ES PARA TI SI…" + `forNo.title` + items con ✕.
7. **Al terminar tendrás listo** (nuevo `components/curso/Outcomes.tsx`): título "Al **terminar** el programa tendrás listo…" + lista `outcomes` con ✓ (2 columnas en `lg`, 1 en móvil).
8. **Quién te acompaña** (nuevo `components/curso/Instructor.tsx`): título "**Quién** te acompaña"; `instructor.name`; foto (`instructor.photo`) a la izquierda + `instructor.longBio` (párrafos) a la derecha; `instructor.experienceLabel` + lista `specialties` con bullets.
9. **FAQ** (`Faq` existe, restyle): `SectionHead` "·· FAQ" / "Preguntas **frecuentes**", Q&A en 2 columnas.
10. **¿Necesitas más información?** (nuevo `components/curso/InfoContact.tsx`): título "¿Necesitas más información?" + `programPdfLabel` (botón turquoise-soft) + subtítulo "Escríbenos" + **formulario presentacional** (Nombre y apellidos, Email, Cargo [select inerte], Teléfono, Municipio, País, Mensaje). Sin envío real (`<form>` sin action / botón inerte). Inputs con estilo del proyecto (borde turquesa suave, rounded).
11. **Webinar gratuito** (reutilizar/component nuevo a partir de `components/formacion/Webinar.tsx`): tarjeta coral con `webinar.desc`, "Próxima sesión: {nextSessionLabel}", "Duración: {durationLabel}", "Participación: gratuita", botón `webinar.cta` (inerte) + mock de vídeo "Vídeo Webinar".
12. **CTA final** (nuevo `components/curso/CourseCta.tsx`): bloque teal (`bg-turquoise`) con `finalCta.title` (display uppercase) + `finalCta.desc` a la izquierda; a la derecha `finalCta.seatsTitle` + `finalCta.seatsDesc` + botón ink `finalCta.cta` (inerte). Reutilizar el patrón de `components/formacion/NextStep.tsx`.

---

## 4. Componentes

**Nuevos** (`src/components/curso/`): `VideoIntro.tsx`, `Outcomes.tsx`, `Instructor.tsx`, `InfoContact.tsx`, `CourseCta.tsx`, `WebinarCurso.tsx` (o reutilizar el de formacion parametrizado).
**Restyle**: `CourseHero.tsx`, `PurchaseCard.tsx`, `Curriculum.tsx`, `ForYou.tsx`, `TeamsBox.tsx`, `Faq.tsx`.
**Página**: `src/app/(frontend)/curso/[slug]/page.tsx` ensambla todo en orden.

---

## 5. Seed — contenido completo

Añadir a `src/data/courses-seed.ts` los 2 cursos nuevos (además de los 4 actuales) y sus ediciones en `editionsSeed`. Sembrar en `src/app/api/seed/route.ts`.

### Compartido por ambos cursos

**Instructor** — name: "Gerardo Sánchez Romero" · tagline (hero "Imparte"): "Director de ADN Local, con más de 10 años acompañando a gobiernos municipales en momentos estratégicos." · experienceLabel: "Más de 10 años de experiencia" · longBio (4 párrafos):
1. "Director de ADN Local y consultor especializado en estrategia municipal, liderazgo político y comunicación pública."
2. "Durante más de diez años ha trabajado junto a ayuntamientos, alcaldes, concejales y equipos políticos, acompañándolos en procesos de planificación estratégica, gestión pública, participación ciudadana y preparación electoral."
3. "Su experiencia combina el conocimiento de la realidad municipal con el diseño de proyectos, campañas y estrategias adaptadas a municipios medianos y pequeños, donde cada decisión cuenta y cada elección se gana desde el trabajo previo."
4. "A través de ADN Local, comparte una metodología práctica orientada a un objetivo claro: ayudar a responsables públicos y candidatos a afrontar con mayor claridad, organización y estrategia el año más importante de una legislatura."
· specialties: ["Estrategia municipal", "Liderazgo y campañas electorales", "Trabajo directo con ayuntamientos y equipos políticos", "Especializado en municipios de 5.000 a 50.000 habitantes"]. *(La foto no la tenemos: usar placeholder; el admin la sube luego.)*

**videoIntro** — title "Descubre más sobre el programa" · desc "Conoce cómo está estructurado, qué trabajarás durante las tres semanas de formación y qué resultados obtendrás al finalizar." · label "Vídeo presentación curso".

**teams** — title "Las clases en directo se imparten por Microsoft Teams" · desc "Todos los miércoles a las 19:00 (CET) durante las 3 semanas. Si no puedes asistir, las sesiones se graban y se publican en tu área en menos de 24 horas."

**feats** (tarjeta de compra): ["Formación online compatible con tu tiempo.", "Vídeos de formación (5–15 min) y test de fijación", "3 sesiones prácticas en directo aplicadas a tu caso", "Saldrás con una estrategia lista para aplicar en tu municipio", "Acceso a Campus Virtual y comunidad", "Certificado de finalización", "Acceso a todos los materiales y grabaciones durante 6 meses"].

**Garantía / plazas** (texto en la tarjeta): "Máximo 30 participantes por edición" · "Nos reservamos el derecho de cancelar el curso si no se alcanza el mínimo."

**faq** (5): 
1. "¿Y si no puedo asistir a un directo?" → "No hay problema. Las tres sesiones magistrales de resolución de casos se graban y se suben al campus en menos de 24 horas. Podrás verlas cuando quieras y plantear tus dudas a través del foro de la comunidad."
2. "¿Cuánto tiempo tendré acceso a los materiales?" → "Tendrás acceso total al campus virtual durante tres meses (el mes de formación y dos meses adicionales de consulta)."
3. "¿Cuándo y cómo son las sesiones en directo?" → "Se realiza una sesión en directo por módulo (3 en total) centrada en la resolución de casos prácticos. Las sesiones se realizan a través de videoconferencia y tienen una duración aproximada de dos horas."
4. "¿Necesito instalar algún software especial?" → "No. Puedes acceder al campus y a las sesiones en directo directamente desde tu navegador web (Chrome, Safari, etc.) con el enlace que recibirás cada semana. La plataforma es compatible con dispositivos móviles, tablets y ordenadores."
5. "¿Cómo se imparte el contenido teórico?" → "Todo el material está alojado en un Campus Virtual (LMS). Cada tema consta de lecturas estructuradas, vídeos cortos de entre 5 y 15 minutos y un test de fijación de conocimientos para asegurar que asimilas los conceptos clave de forma ágil."

**webinar.durationLabel** "45 minutos" · cta "Reservar mi plaza en el webinar" · desc "Te invitamos a participar en una sesión online gratuita donde compartiremos algunas de las claves para afrontar con éxito el último año antes de las elecciones municipales."

**finalCta** seatsTitle "Solo 30 plazas disponibles" · seatsDesc "Un grupo reducido para garantizar el trabajo sobre la realidad de cada municipio." · cta "Reservar mi plaza".

### CURSO 01 — `hacia-un-nuevo-mandato`
- title "Hacia un nuevo mandato" · accent "mandato"
- headline "Cómo liderar el último año de legislatura para asegurar tu reelección" · headlineAccent "reelección"
- summary "Tres semanas para ordenar tu relato de mandato, alinear a tu equipo y diseñar el proyecto de futuro que tus vecinos votarán. Sin improvisación: saldrás con tu estrategia lista para ejecutar."
- **modules**:
  1. name "Gestionar: El QUÉ." · description "De la lista de logros al hilo conductor. Aprenderás a construir un diagnóstico integrado del mandato (interno + territorial) que no sea un simple catálogo de obras, sino un relato con sentido." · temas: ["Tema 1. Análisis interno del mandato: unir los puntos", "Tema 2. Análisis externo: el municipio por sectores y por territorio"]
  2. name "Dirigir: El QUIÉN." · description "El diseño del equipo de campaña y el mapa de actores. Definirás tu núcleo de confianza y el plan de acercamiento a los colectivos clave del municipio para que ningún contacto sea fruto de la improvisación." · temas: ["Tema 3. El equipo de campaña: núcleo duro y círculos de confianza", "Tema 4. Mapa de actores del municipio y plan de acercamiento"]
  3. name "Comunicar: El CÓMO." · description "Proyecto de legislatura y mensaje marco. Transformarás el diagnóstico en una visión de futuro, definiendo tu eslogan de precampaña y un calendario de acciones visibles que generen confianza." · temas: ["Tema 5. Del diagnóstico al proyecto de legislatura y el mensaje marco", "Tema 6. Eslogan de precampaña, acciones visibles y proceso de participación"]
- **forYes** title "Quieres que tu gestión se convierta en votos" · items: ["Eres alcalde o concejal que se siente \"ahogado por la gestión\" diaria y necesita recuperar el control de su tiempo y su mensaje", "Sientes que has hecho mucho, pero te falta un hilo conductor que dé sentido a tus logros ante los vecinos.", "Necesitas alinear a tu equipo bajo una estrategia única para evitar la improvisación electoral.", "Quieres pasar de la intuición a una metodología con datos para ganar votos en cada barrio."]
- **forNo** title "Vas a dejar tu reelección al azar" · items: ["Crees que la victoria se consigue improvisando en los últimos meses de legislatura", "Buscas teoría abstracta y no quieres trabajar sobre la realidad de tu municipio", "Prefieres reaccionar a la oposición en lugar de marcar tú la agenda del año electoral"]
- **outcomes**: ["El relato que explica lo que has hecho y hacia dónde quieres llevar el municipio.", "El mapa de prioridades de cada barrio y sector de población.", "El equipo con el que afrontarás el último año de legislatura.", "Los contactos y colectivos clave con los que debes trabajar.", "El proyecto que presentarás para la próxima legislatura.", "El mensaje que guiará toda tu comunicación política.", "Las acciones que debes activar para generar confianza y visibilidad.", "Un plan de trabajo para llegar preparado al inicio de la campaña electoral."]
- **webinar.nextSessionLabel** "1 de julio 2026 a las 20:00 h"
- **finalCta** title "Si gobiernas, este año no se improvisa" · desc "Si quieres llegar al próximo proceso electoral con una estrategia clara, un equipo alineado y un proyecto de futuro definido, este programa está diseñado para ti."
- **ediciones**: 
  1. "Curso 01 · Edición julio 2026", status `open`, priceCents 19800, oldPriceCents 33000, startDate jul 2026, statusLabel "Inscripción abierta".
  2. "Curso 01 · Edición agosto 2026", status `soon`, priceCents 26400, oldPriceCents 33000, startDate ago 2026.
  3. "Curso 01 · Edición septiembre 2026", status `soon`, priceCents 33000, startDate sep 2026.

### CURSO 02 — `construir-la-alternativa`
- title "Construir la alternativa" · accent "alternativa"
- headline "Deja de ser \"la oposición\" para convertirte en la alternativa real de gobierno" · headlineAccent "alternativa real"
- summary "Las elecciones no se ganan en campaña; se ganan ahora. Tres semanas para analizar las vulnerabilidades del gobierno, construir tu equipo y prefigurar el cambio que el municipio necesita."
- **modules**:
  1. name "Analizar: ¿Por qué el cambio?" · description "Aprenderás a identificar las vulnerabilidades reales del gobierno (no solo las aparentes) y a realizar un balance honesto de tu grupo para encontrar tus ejes de contraste." · temas: ["Tema 1. Análisis de la gestión del gobierno: vulnerabilidades reales y ejes de contraste", "Tema 2. Análisis del municipio y del propio grupo de oposición"]
  2. name "Dirigir: El equipo y la calle." · description "Diseñarás tu equipo de campaña con recursos limitados, ordenarás la relación con el partido y crearás un mapa de actores para acercarte al municipio sin la \"palanca\" de la institución." · temas: ["Tema 3. Candidato, equipo de campaña y relación con el partido", "Tema 4. Mapa de actores y plan de acercamiento desde la oposición"]
  3. name "Comunicar: Hacer visible la alternativa." · description "Del mensaje marco al eslogan de precampaña. Diseñarás formatos de encuentro ciudadano y acciones de prefiguración para que los vecinos te visualicen ya como el futuro alcalde/sa." · temas: ["Tema 5. De los ejes de contraste al proyecto de alternativa y el mensaje marco", "Tema 6. Eslogan, formatos de encuentro ciudadano y acciones de precampaña"]
- **forYes** title "Quieres ser la alternativa real de gobierno" · items: ["Necesitas que el municipio deje de verte como \"el que critica\" y empiece a reconocerte como el futuro alcalde o alcaldesa", "Quieres basar tu victoria en un proyecto de futuro para el municipio y no solo en el desgaste o la crítica al gobierno actual", "Buscas diseñar un equipo de campaña profesional y eficiente, incluso si cuentas con recursos y personal limitado", "Quieres identificar las vulnerabilidades reales del gobierno actual para construir ejes de contraste que movilicen el voto de cambio"]
- **forNo** title "Crees que criticarlo todo es una estrategia" · items: ["Piensas que la crítica sistemática es suficiente para ganar la confianza de tus vecinos sin ofrecer una alternativa creíble", "No estás dispuesto a realizar un balance honesto de los errores y aciertos de tu propio grupo municipal durante esta legislatura", "Buscas marketing genérico o teoría abstracta en lugar de una guía técnica y práctica específica para política municipal"]
- **outcomes**: ["Un diagnóstico claro de las debilidades y oportunidades del gobierno actual.", "Los ejes de contraste que diferenciarán tu candidatura.", "El equipo con el que afrontarás el último año antes de las elecciones.", "Los contactos y colectivos clave con los que debes construir alianzas.", "El proyecto de alternativa que presentarás a tus vecinos.", "El mensaje marco que dará coherencia a toda tu candidatura.", "Las acciones y encuentros que te ayudarán a ganar visibilidad y confianza.", "Un plan de trabajo para llegar preparado al inicio de la campaña electoral."]
- **webinar.nextSessionLabel** "1 de septiembre a las 20:00 h"
- **finalCta** title "Si te presentas, este año no se improvisa" · desc "Si quieres dejar de ser percibido como oposición y empezar a ser visto como una opción real de gobierno, este programa está diseñado para ti."
- **ediciones**:
  1. "Curso 02 · Edición septiembre 2026", status `open`, priceCents 19800, oldPriceCents 33000, startDate sep 2026, statusLabel "Inscripción abierta".
  2. "Curso 02 · Edición octubre 2026", status `soon`, priceCents 26400, oldPriceCents 33000, startDate oct 2026.
  3. "Curso 02 · Edición noviembre 2026", status `soon`, priceCents 33000, startDate nov 2026.

> Nota fechas: usar las del seed actual como referencia (offsets relativos a "ahora" para que la 1ª edición de cada curso tenga `startDate` coherente con su `status:open`). Para que la home pueda comprar, basta que la 1ª esté `open`. El alumno de prueba puede seguir en su curso actual.

---

## 6. Home Formación → enlazar a `/curso/[slug]`
En `src/components/formacion/Programs.tsx` / `src/data/formacion.ts`: las tarjetas "Hacia un nuevo mandato" y "Construir la alternativa" enlazan a `/curso/hacia-un-nuevo-mandato` y `/curso/construir-la-alternativa`. "Gobernando con éxito" se queda como está (sin landing en este PDF). El `NextStep` puede seguir con anclas o apuntar a esas 2 páginas.

---

## 7. Reseed (ADITIVO — sin DROP)
El esquema solo añade campos/colección-ya-existente → auto-push en dev sin recrear. Pasos para el usuario:
1. Reiniciar dev (para que Payload empuje los campos nuevos).
2. Re-ejecutar `GET /api/seed?secret=…` (recrea cursos + ediciones, ahora con los 2 nuevos).
*(No hace falta `DROP SCHEMA`.)*

---

## 8. Files that will change
**Nuevos:** `src/components/curso/VideoIntro.tsx`, `Outcomes.tsx`, `Instructor.tsx`, `InfoContact.tsx`, `CourseCta.tsx`, `WebinarCurso.tsx`.
**Modificados:** `src/collections/Courses.ts`, `src/collections/CourseEditions.ts` (opcional `discountLabel`), `src/lib/courses.ts`, `src/data/curso.ts`, `src/data/courses-seed.ts`, `src/app/api/seed/route.ts`, `src/app/(frontend)/curso/[slug]/page.tsx`, `src/components/curso/CourseHero.tsx`, `PurchaseCard.tsx`, `Curriculum.tsx`, `ForYou.tsx`, `TeamsBox.tsx`, `Faq.tsx`, `src/components/formacion/Programs.tsx`, `src/data/formacion.ts`.

## 9. Fuera de alcance
- Backend de formularios/leads (Fase 2). Botones/forms presentacionales.
- Checkout/webhook: NO se tocan (la compra sigue resolviendo la edición `open` por slug).
- Vídeos reales (Bunny) y subida de la foto del profesor: placeholders.

## 10. Verificación
`tsc` + `lint` + `vitest` sin errores nuevos sobre baseline. Ampliar tests de la capa de datos si cambian firmas (`toCourseDetail` con priceTiers). NO `npm run build`. NO tocar BD (lo hace el usuario en el reseed).
