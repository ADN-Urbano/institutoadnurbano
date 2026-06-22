# Brief técnico: reemplazar `<a>` raw por `<Link>` en Header.tsx

> Estado: APROBADO por el usuario (2026-06-22). Generado vía feature-factory.

## 1. Overview

Se reemplazan los dos elementos `<a href="/api/auth/logout">` en `src/components/layout/Header.tsx` por `<Link prefetch={false} href="/api/auth/logout">` de Next.js, eliminando los 4 reportes de la regla `@next/next/no-html-link-for-pages` que este archivo genera. No se cambia ningún diseño, texto ni comportamiento visible. El route handler `/api/auth/logout` no se toca.

## 2. Data model changes

Ninguno. Cambio puramente de marcado en un componente cliente. No hay colecciones, campos ni migraciones.

## 3. Process / background flow

No cambia ningún flujo de datos. El navegador seguirá haciendo GET a `/api/auth/logout` al pulsar el enlace; el route handler borrará la cookie `adn_session` y redirigirá igual que hoy. El único cambio: Next.js gestiona el enlace en vez del navegador nativo, con `prefetch={false}` para que no pre-cargue ese endpoint de API.

No hay cruces de ID entero/string, Stripe, HMAC ni RGPD modificados en este cambio.

## 4. API changes

Ninguna. `/api/auth/logout` no se modifica.

## 5. Frontend changes

### Archivo único: `src/components/layout/Header.tsx`

El import de `Link` ya existe en la línea 4. No se añade nada nuevo.

**Cambio 1 — escritorio (líneas ~91-97 actuales)**

Sustituir:
```tsx
<a
  href="/api/auth/logout"
  className="px-2.5 py-2 text-sm font-medium text-ink-muted rounded-lg transition-all hover:text-ink hover:bg-bg-soft max-md:hidden"
>
  Salir
</a>
```
Por:
```tsx
<Link
  prefetch={false}
  href="/api/auth/logout"
  className="px-2.5 py-2 text-sm font-medium text-ink-muted rounded-lg transition-all hover:text-ink hover:bg-bg-soft max-md:hidden"
>
  Salir
</Link>
```
Sin `onClick`. Texto literal preservado: `Salir`.

**Cambio 2 — móvil (líneas ~168-174 actuales)**

Sustituir:
```tsx
<a
  href="/api/auth/logout"
  className="px-3.5 py-2.5 text-[15px] font-medium text-ink-muted rounded-lg text-center"
>
  Cerrar sesión
</a>
```
Por:
```tsx
<Link
  prefetch={false}
  href="/api/auth/logout"
  onClick={() => setOpen(false)}
  className="px-3.5 py-2.5 text-[15px] font-medium text-ink-muted rounded-lg text-center"
>
  Cerrar sesión
</Link>
```
Con `onClick={() => setOpen(false)}` para cerrar el panel móvil, igual que los demás `<Link>` del panel. Texto literal preservado: `Cerrar sesión`.

Ambos cambios respetan mobile-first: `max-md:hidden` del elemento de escritorio y la posición dentro del panel `{open && (...)}` del elemento móvil permanecen idénticas.

## 6. Tests requeridos

No hay tests de componente en el proyecto (scope = funciones puras únicamente, según CLAUDE.md). No se crean tests nuevos.

**Verificación tras el cambio:**

| Verificación | Comando | Resultado esperado |
|---|---|---|
| Lint | `npm run lint` | Bajar de 9 a 7 problemas. Header.tsx sin reportes de `no-html-link-for-pages`. Quedan 2 reportes vivos en `NextSession.tsx` (fuera de scope, aceptado). |
| Tests existentes | `npm test` | 31+ tests pasan sin regresión. |
| Typecheck | `npx tsc --noEmit` | Sin errores nuevos sobre el baseline conocido (4× TS2532 en `courses.test.ts`). |
| Build (opcional) | `npm run build` | Compila sin error. |
| Funcional manual | Iniciar sesión como alumno, pulsar "Salir" (escritorio) y "Cerrar sesión" (móvil) | Cookie `adn_session` borrada, redirección correcta, panel móvil se cierra al pulsar. |

## 7. Risks & open questions

**Zona sensible — sesión HMAC:** el destino `/api/auth/logout` borra la cookie `adn_session` del sistema de sesión HMAC custom. El cambio no modifica ese handler ni la lógica de sesión; riesgo nulo.

**`prefetch={false}` es OBLIGATORIO:** sin él, Next.js intentaría pre-cargar `/api/auth/logout` en background al montar el componente, destruyendo la sesión de forma silenciosa cuando el usuario simplemente carga una página con el header visible. Este atributo no es opcional.

**Nota de documentación:** tras este cambio, la referencia en CLAUDE.md a "6× `@next/next/no-html-link-for-pages` en Header.tsx" queda desactualizada (serán 0 en Header y 2 en NextSession). Actualizar CLAUDE.md está fuera del scope de esta story.

No quedan preguntas abiertas. Decisiones del usuario: scope solo Header.tsx · enfoque `<Link prefetch={false}>` · `onClick` solo en el móvil.

## 8. Files that will change

| Archivo | Acción | Razón |
|---|---|---|
| `src/components/layout/Header.tsx` | MODIFICAR | Reemplazar los 2 `<a href="/api/auth/logout">` (líneas ~91 y ~168) por `<Link prefetch={false}>`, añadiendo `onClick={() => setOpen(false)}` solo al elemento móvil. |

Este es el único archivo en scope. Ningún otro archivo se toca.
