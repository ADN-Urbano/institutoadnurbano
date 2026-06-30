# Chuleta de UTMs — ADN Local

> Para saber **de qué anuncio viene cada lead** (y cada venta). Los UTMs se guardan
> en cada `Lead` (`firstTouch`/`lastTouch`) y el `Enrollment` hereda el origen.
> Esto es tu **fuente de verdad** (determinista, tuya, sin pérdidas por iOS/consentimiento).
> Los eventos de Meta (pixel/CAPI) son aparte: sirven para que el algoritmo **optimice**, no para que tú sepas el origen.

## 1. Los 5 parámetros

| Parámetro | Qué es | Valores que usamos |
|---|---|---|
| `utm_source` | **Plataforma** de donde viene | `instagram` · `facebook` · `linkedin` · `google` · `newsletter` · `referral` |
| `utm_medium` | **Tipo** de tráfico | `paid` (pago) · `organic` · `email` · `social` |
| `utm_campaign` | **Campaña** (objetivo + mes) | `webinar-2026-07` · `lista-espera-2026-09` |
| `utm_content` | **El anuncio/creatividad concreta** ← clave para A/B | `anuncio-a` · `anuncio-b` · `carrusel-alcaldes` |
| `utm_term` | (opcional) público/keyword | `alcaldes-pueblos` · `oposicion` |

**Regla de oro:** `utm_content` = el anuncio. Es lo que te dice "¿convierte más el A o el B?".

Convención de valores: **minúsculas, sin espacios ni acentos, guiones** (`anuncio-a`, no `Anuncio A`).

---

## 2. Meta (Instagram / Facebook) — plantilla dinámica ✅ recomendado

En el anuncio (Ads Manager) → sección **"Seguimiento" → "Parámetros de URL"**, pega esto **una vez** y Meta rellena el nombre real de cada campaña/conjunto/anuncio **solo**:

```
utm_source=instagram&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

> Si el anuncio es de Facebook (no IG), cambia `utm_source=instagram` por `utm_source=facebook`.
> Meta sustituye `{{campaign.name}}`, `{{ad.name}}`, `{{adset.name}}` automáticamente — **solo tienes que nombrar bien tus anuncios** en Meta (p. ej. nombra el anuncio `anuncio-a`).

Meta **ya añade `fbclid`** al enlace por su cuenta (no lo pongas tú) → eso alimenta el CAPI para la optimización.

### Si lo prefieres manual (sin plantilla)
Anuncio A:
```
https://www.adnlocal.es/webinar?utm_source=instagram&utm_medium=paid&utm_campaign=webinar-2026-07&utm_content=anuncio-a
```
Anuncio B (solo cambia el final):
```
https://www.adnlocal.es/webinar?utm_source=instagram&utm_medium=paid&utm_campaign=webinar-2026-07&utm_content=anuncio-b
```

---

## 3. LinkedIn — plantilla

LinkedIn **no** tiene macros dinámicas como Meta → pones la URL con UTMs fijos por anuncio. En el **"Destination URL"** del anuncio:

```
https://www.adnlocal.es/webinar?utm_source=linkedin&utm_medium=paid&utm_campaign=webinar-2026-07&utm_content=anuncio-a
```

Cambia `utm_content` por anuncio. LinkedIn añade `li_fat_id` por su cuenta (lo captura el motor).

---

## 4. Otros canales rápidos

- **Newsletter / email propio:** `?utm_source=newsletter&utm_medium=email&utm_campaign=webinar-2026-07`
- **Bio de Instagram (orgánico):** `?utm_source=instagram&utm_medium=organic&utm_campaign=bio`
- **WhatsApp / boca a boca:** `?utm_source=referral&utm_medium=social&utm_campaign=whatsapp`

---

## 5. Dónde lo ves después

`/admin` → **Marketing → Leads**. Columnas por defecto: **Source · Campaign · Content**.
- **Filtrar** (botón *Filters*): p. ej. `Firsttouch → Source` = `instagram` → solo leads de IG.
- **Comparar A/B:** filtra por `Firsttouch → Content` = `anuncio-a` vs `anuncio-b` y cuenta.
- **¿Llegó a venta?** el lead con la columna **Enrollment** rellena = ese origen acabó comprando.

> First touch = el **primer** anuncio que lo trajo (90 días). Last touch = el último antes de registrarse.
> Para "¿qué anuncio lo descubrió?" mira **first touch**; para "¿qué lo cerró?" mira **last touch**.

---

## 6. Checklist al lanzar una campaña nueva
1. Define `utm_campaign` = `{objetivo}-{aaaa-mm}` (p. ej. `webinar-2026-07`).
2. En Meta: pega la plantilla dinámica una vez en el conjunto/anuncio. En LinkedIn: URL con UTMs por anuncio.
3. Nombra los anuncios con identificadores limpios (`anuncio-a`, `carrusel-x`) → eso será tu `utm_content`.
4. A los pocos días, en *Leads* filtra por `Content` y mira cuál trae más leads **y** más Enrollments.
