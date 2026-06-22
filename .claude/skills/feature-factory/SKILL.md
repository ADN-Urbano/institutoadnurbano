---
name: feature-factory
description: Orquesta la cadena de agentes de la fábrica (researcher → story → spec → builder) para una feature, con 3 checkpoints humanos obligatorios. Invócala con /feature-factory <descripción de la feature>. Solo el usuario la lanza.
disable-model-invocation: true
---

# Feature Factory

Encadena los 4 agentes de la fábrica en secuencia, pasando el output de cada uno al siguiente. La feature llega como argumento. **Hay 3 PAUSAS humanas obligatorias. No las saltes bajo ninguna circunstancia.**

Regla global: las decisiones de negocio y la aprobación las toma SIEMPRE el usuario, nunca tú. Si una pausa no está resuelta, DETENTE y espera.

## Paso 1 — Research
Lanza `adn-codebase-researcher` (Agent tool) con la descripción de la feature.
Muestra el briefing resultante al usuario. Continúa al paso 2.

## Paso 2 — Story
Lanza `adn-story-writer` pasándole el briefing del paso 1.
Muestra la user story completa: criterios de aceptación, edge cases, out-of-scope y **preguntas abiertas**.

⏸ **PAUSA 1 — OBLIGATORIA. DETENTE AQUÍ.**
- Presenta la story y todas sus preguntas abiertas.
- NO continúes hasta que el usuario (a) apruebe la story Y (b) responda cada pregunta abierta.
- Las preguntas de negocio las decide el usuario. No las respondas tú ni asumas defaults.

## Paso 3 — Spec
Lanza `adn-spec-writer` con: la story aprobada + las respuestas del usuario + el briefing del paso 1.
Muestra el brief técnico completo.

⏸ **PAUSA 2 — OBLIGATORIA. DETENTE AQUÍ.**
- Presenta el brief.
- Señala EXPLÍCITAMENTE cualquier punto que toque zona sensible (Stripe/pagos, sesión HMAC de alumnos, endpoints RGPD) para revisión.
- NO continúes hasta que el usuario apruebe el brief.

## Paso 4 — Guardar el brief
Tras la aprobación, guarda el brief en `docs/briefs/<nombre>.md` (slug corto derivado de la feature). Es el registro versionado que leerá el builder.

## Paso 5 — Build
Lanza `adn-brief-builder` apuntándole al brief de `docs/briefs/<nombre>.md`.
El builder implementa SOLO los archivos del scope del brief. (El hook de typecheck correrá al terminar el subagente.)
Muestra el resumen del builder.

⏸ **PAUSA 3 — OBLIGATORIA. DETENTE AQUÍ.**
- NO hagas commit. NUNCA. El commit lo hace el usuario.
- Muestra el resumen del builder y pide al usuario que revise el diff con `git diff` antes de aceptar.
- Tu trabajo termina aquí: entregas el cambio sin commitear.
