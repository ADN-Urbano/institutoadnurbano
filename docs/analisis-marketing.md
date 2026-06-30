# Análisis de marketing — ADN Local (venta de cursos)

> Análisis estratégico del sitio actual + plan y decisiones. Complementa
> `docs/plan-pagina-completa.md` (que es más técnico/operativo).

## TL;DR — la tesis
El sitio está montado como **venta directa** (entra → mira el curso → paga 198-330 €). Pero:
- La **marca es nueva en formación** (sin track record, sin testimonios).
- El **público es de alta consideración** (cargos públicos que no compran por impulso y desconfían del "marketing").
- El **mercado es pequeño** (nº finito de municipios/cargos) → no puedes quemar tráfico frío.

Conclusión: vender en frío a 198 € a alguien que no te conoce y sin pruebas **convierte poco**. Lo que pide este negocio es un **embudo de captación + confianza con el WEBINAR como motor**: regalas valor en directo, capturas el dato, nutres, y vendes a quien ya confía. Y de paso construyes **una base de datos de cargos locales** que es, probablemente, tu mayor activo (la reutilizas para cada curso futuro del itinerario).

---

## 1. Diagnóstico del embudo actual

| Pieza | Estado | Problema de marketing |
|---|---|---|
| Captación de leads | **Decorativa** (formularios y "reservar webinar" no envían) | **El agujero #1.** No capturas a nadie que no compre hoy. |
| Webinar | Una tarjeta con vídeo mock | El activo más potente, infrautilizado. |
| Confianza / prueba social | Solo ADN Urbano + Gerardo | Suficiente para "interés", insuficiente para "pago en frío". Faltan testimonios (lógico: aún no hay alumnos). |
| CTA del Inicio | No hay un CTA primario claro (ni de webinar ni de lead magnet) | El visitante frío no tiene un "siguiente paso" de bajo compromiso. |
| Urgencia | "30 plazas", -40%/-20% (bien) | Falta la urgencia **auténtica**: el **calendario electoral**. |
| Segmentación | Gobierno vs oposición (muy bien) | Bien pensada; explótala más (recomendador, webinars distintos). |

**El salto que falta:** hoy vas de *"visitante frío" → "pago 198 €"* de un brinco. Hay que meter en medio: *"webinar gratis" → "lead nutrido" → "compra"*.

---

## 2. La estrategia recomendada: embudo liderado por webinar

```
TRÁFICO (LinkedIn/ads/partners/outreach)
        ↓
WEBINAR GRATUITO  ← lead magnet principal (captura el dato)
        ↓ (email + WhatsApp)
NUTRICIÓN / CONFIANZA  (secuencia + comunidad)
        ↓
COMPRA DEL CURSO  (oferta con deadline)
        ↓
ALUMNO → testimonio/caso → más prueba social → más ventas
```

Por qué encaja: marca nueva (necesita demostrar antes de cobrar) + audiencia que decide con cabeza (necesita ver/oír al experto) + mercado pequeño (cada lead cuenta, hay que nutrirlo, no quemarlo).

---

## 3. El WEBINAR como motor de captación (el detalle)

**Objetivo doble:** (a) capturar datos de interesados, (b) vender el curso por confianza.

### Cómo consigue los datos
**Registro** (página/modal de "Reserva tu plaza"), pidiendo lo justo pero valioso:
- Nombre · **Email** · **Teléfono (WhatsApp)** · **Municipio** · **¿Gobiernas o estás en la oposición?**

Ese último campo **segmenta el oro**: sabes a quién venderle *Hacia un nuevo mandato* vs *Construir la alternativa*, y tienes una **lista de cargos locales por municipio y situación** reutilizable para siempre.

### Mecánica completa
1. **Registro** → guarda Lead (Payload) + email de confirmación (Resend) + alta opcional en WhatsApp.
2. **Recordatorios**: email D-1 y 1 h antes; **WhatsApp 10 min antes** (apertura altísima).
3. **El directo** (Teams/Zoom, 40-50 min): valor real ("las claves para afrontar el último año antes de las municipales") → posiciona a Gerardo como autoridad → cierre con **oferta exclusiva para asistentes** (bonus o el -40% de lanzamiento) **con deadline 48-72 h** = urgencia.
4. **Post-webinar**:
   - No asistieron → email con **grabación** + secuencia.
   - Asistieron y no compraron → secuencia email/WhatsApp (objeciones, prueba social, recordatorio del deadline).
5. **Evergreen (fase 2)**: una vez funcione en directo, automatiza una versión grabada "siempre disponible" para captar 24/7 sin depender de fechas.

### Build vs buy (decisión)
- **Recomendado: construir el registro + nutrición en casa** (ya tienes Payload, Resend, Stripe y hasta un endpoint ICS). Te quedas con el dato y se integra con el funnel de compra. El **directo** lo das en Teams/Zoom.
- Comprar una plataforma de webinars (Zoom Webinars/EverWebinar) acelera, pero el dato vive fuera y se integra peor. Déjalo para el evergreen si hace falta.

---

## 4. Mejoras por página (concretas)

**Inicio**
- **CTA primario = webinar** ("Reserva tu plaza · webinar gratuito") arriba, visible. "Ver programas" como CTA secundario. Hoy el hero no tiene un siguiente paso de bajo compromiso.
- Añadir el webinar/lead-magnet aquí (ahora solo vive en /programas).
- Anclar urgencia al **calendario electoral** ("Quedan X meses para las municipales de 2027").

**Programas**
- Mantener catálogo, pero para el tráfico frío ofrecer **primero el webinar** (banda/CTA), y la compra para el ya-convencido.
- En cada ficha: **garantía visible**, **prueba social** (cuando exista), y el folleto PDF como **captura de email** (no descarga directa anónima).

**Metodología / Itinerario / Sobre nosotros**
- Bien para confianza. Rematar con un CTA al webinar al final de cada una (no dejar al lector sin siguiente paso).

**Fichas de curso (/curso/...)**
- El "Escríbenos" y "Descargar programa PDF" → **capturar lead** (hoy decorativos).
- Botón "Inscribirme" perfecto para el lead caliente; para el frío, empujar webinar.

---

## 5. De dónde sale el tráfico (top-of-funnel para este nicho)
- **LinkedIn orgánico**: Gerardo publicando = autoridad. El canal natural de cargos/técnicos.
- **Ads geo + rol**: Meta/LinkedIn segmentando por ubicación e intereses políticos (el rol "concejal" es difícil de targetear fino → apoyarse en geo + lookalikes de la lista de leads).
- **Partnerships**: asociaciones de municipios, FEMP, federaciones, escuelas de formación de partidos.
- **Outreach directo**: con la lista de municipios (datos públicos), email/LinkedIn a cargos.
- **SEO/contenido**: artículos sobre gestión municipal/electoral (largo plazo).
- **Referidos**: cada alumno conoce a otros cargos.

El webinar es el **punto de conversión** de cualquiera de estos canales.

---

## 6. Prueba social (el déficit a resolver pronto)
No hay testimonios porque no hay alumnos aún. Plan:
- **Primera edición como "edición fundadora"**: precio/condición especial a cambio de **testimonio + caso documentado**.
- Pedir **valoración estructurada** al terminar (para sacar números: "9,4/10", "X% lo recomienda").
- Convertir cada caso en contenido (vídeo corto, cita, mini-caso) → alimenta toda la web y los ads.

---

## 7. Pricing y oferta
- El **-40%/-20% de lanzamiento** funciona, pero enmárcalo como **beneficio exclusivo** (de asistentes al webinar / edición fundadora), no como descuento genérico (un descuento permanente pierde fuerza y abarata la marca).
- **Deadline real** en cada oferta (cierre de inscripción de la edición) → urgencia.
- Considerar un **escalón de entrada** más adelante (mini-curso/guía de pago bajo) si el salto a 198 € frena.

---

## 8. Decisiones a tomar (con mi recomendación)

| # | Decisión | Mi recomendación |
|---|---|---|
| 1 | ¿Venta directa o embudo con webinar? | **Embudo liderado por webinar.** |
| 2 | Webinar ¿en directo o evergreen? | **Directo** primero (urgencia/confianza); evergreen en fase 2 para escalar. |
| 3 | Registro ¿build o buy? | **Build** (Payload + Resend); directo en Teams/Zoom. |
| 4 | Canal de nutrición | **Email + WhatsApp** (WhatsApp es altísima conversión en este público). |
| 5 | Encuadre del descuento | **Bonus exclusivo** con deadline, no descuento permanente. |
| 6 | Urgencia | **Calendario electoral** + cierre de edición. |
| 7 | Lead magnets | Webinar (principal) + folleto PDF (captura email) + quiz gobierno/oposición. |
| 8 | Retargeting | **Pixel Meta/Google** para reimpactar a registrantes que no compran. |
| 9 | Prueba social inicial | **Edición fundadora** a cambio de testimonio/caso. |
| 10 | Activo de datos | Tratar la **lista de leads (cargos por municipio/situación)** como el activo central; cuidarlo (RGPD) y reutilizarlo en todo el itinerario. |

---

## 9. KPIs a medir
- Registros al webinar · **tasa de asistencia** · **registro→venta** · CAC por canal · tasa de finalización del curso (para testimonios) · valor de vida (cursos del itinerario por alumno).

---

## 10. Plan por fases (marketing)
- **Fase 1 — Motor de captación:** cablear webinar (registro + recordatorios email/WhatsApp + grabación) · CTA de webinar en Inicio · urgencia de calendario electoral · pixel. → *empieza a entrar gente al embudo.*
- **Fase 2 — Conversión y confianza:** secuencias de nutrición · edición fundadora + primeros testimonios · checkout con datos + IVA · garantía visible.
- **Fase 3 — Escala:** webinar evergreen · ads + partnerships · contenido/LinkedIn sistemático · retargeting afinado.
- **Fase 4 — LTV:** lanzar siguientes cursos del itinerario a la base ya captada (donde está el verdadero margen).

---

## 11. Atribución — saber de dónde viene cada lead (Instagram, LinkedIn, ads…)

Vais a meter pasta en ads (Instagram, LinkedIn…). Sin atribución, gastáis a ciegas. La clave: **tu base de datos de leads es la fuente de verdad**, no lo que diga cada plataforma (Meta y LinkedIn se cuelgan medallas que no son suyas y, con iOS/adblockers, pierden datos). Como el público es pequeño y de alto valor, puedes atribuir **lead a lead** (sabrás qué anuncio te trajo a qué concejal).

### Cómo funciona (sobre el motor que ya recomendamos construir)
1. **UTMs en todos los enlaces de ads.** Cada anuncio/post lleva parámetros:
   `?utm_source=instagram&utm_medium=paid&utm_campaign=webinar-sep&utm_content=video-a`
   - `utm_source`: instagram · linkedin · facebook · google · newsletter · whatsapp…
   - `utm_medium`: paid · organic · email · social · referral
   - `utm_campaign`: la campaña (p. ej. `webinar-2026-09`)
   - `utm_content`: la creatividad/variante (`video-a`, `carrusel-b`) → para saber qué anuncio convierte
   - **Hace falta un esquema de nombres documentado y disciplinado**, o el dato sale sucio.
2. **Captura en primera visita (first-party):** un script guarda UTMs + `referrer` + página de aterrizaje en una **cookie propia** (90 días). Así no se pierde aunque el lead registre días después.
3. **Se adjunta al Lead** al registrarse (webinar/formulario): el `Lead` en Payload guarda **first-touch** (primera vez que te encontró) y **last-touch** (el clic que convirtió), + `fbclid`/`gclid`/`li_fat_id` (IDs de clic para casar con las plataformas) + un campo **"¿cómo nos conociste?"** (autoreportado, red de seguridad para tráfico "oscuro" / WhatsApp / boca a boca).
4. **Se arrastra hasta la venta:** el `Enrollment` hereda/enlaza el origen del Lead → puedes medir **ingresos por canal y campaña**, no solo leads.
5. **Píxeles + servidor:**
   - **Meta Pixel** (IG/FB) + **Conversions API (CAPI) server-side** (disparas el evento de registro/compra desde el servidor con el `fbclid` + email hasheado → fiable pese a iOS/adblock).
   - **LinkedIn Insight Tag** + conversions.
   - Esto sirve para que **las plataformas optimicen** la entrega hacia "registros"/"compras" y te den coste por resultado. Pero para "de dónde vino ESTE lead", manda **tu DB**.
6. **RGPD:** los píxeles de terceros necesitan **consentimiento** (ya tienes CookieBanner). La captura de UTMs en cookie propia es de bajo riesgo, pero documéntala en la política.

### Lo que podrás medir (por canal y campaña)
Leads · **coste por lead** · tasa de asistencia al webinar · **registro→venta** · **CAC** · **ingresos y ROAS por canal/campaña/creatividad** · y, lead a lead, "este concejal vino del carrusel B de Instagram de la campaña X".

### Casos especiales
- **WhatsApp/teléfono/offline:** usa **enlaces `wa.me` distintos por canal** y/o el campo "¿cómo nos conociste?". Para tráfico pequeño, el autoreportado tapa bastante.
- **Dark social** (te reenvían el enlace sin UTM): el campo autoreportado + el `referrer` ayudan.

### Decisiones de atribución (recomendación)
| # | Decisión | Recomendación |
|---|---|---|
| A | Fuente de verdad | **Tu DB de leads (UTMs en el Lead)**, las plataformas solo para optimizar. |
| B | Modelo | Guardar **first-touch + last-touch** (reportar ambos). |
| C | Píxeles | **Meta Pixel + CAPI** y **LinkedIn Insight Tag**, server-side donde se pueda. |
| D | Esquema UTM | **Convención documentada** y obligatoria en cada enlace de ads. |
| E | Backup | Campo **"¿cómo nos conociste?"** en los formularios. |
| F | Reporting | Empezar con **vista/exportación en Payload** (o Google Sheet); dashboard cuando haya volumen. |

> Esto encaja en la **Fase 1** (el motor del webinar): se construye a la vez que el registro de leads, porque la atribución vive en el mismo `Lead`.
