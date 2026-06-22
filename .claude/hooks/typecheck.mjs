#!/usr/bin/env node
// .claude/hooks/typecheck.mjs
// SubagentStop: cuando un subagente termina, corre `tsc --noEmit` y AVISA del
// resultado vía systemMessage. SIEMPRE exit 0 -> nunca bloquea ni fuerza
// continuación (verificado contra Claude Code 2.1.183).
import { execSync } from "node:child_process";

let raw = "";
process.stdin.setEncoding("utf8");
for await (const c of process.stdin) raw += c;

let data = {};
try { data = JSON.parse(raw); } catch { process.exit(0); }

// Guard anti-bucle: si ya estamos en una continuación provocada por un stop
// hook, devolver éxito sin hacer nada.
if (data.stop_hook_active) process.exit(0);

const cwd = process.env.CLAUDE_PROJECT_DIR || data.cwd || process.cwd();

let out = "", ok = true;
try {
  execSync("npx tsc --noEmit", { cwd, stdio: ["ignore", "pipe", "pipe"] });
} catch (e) {
  ok = false;
  out = ((e.stdout || "") + (e.stderr || "")).toString();
}

const errLines = out.split("\n").filter((l) => /error TS\d+/.test(l));
const summary = ok
  ? "✅ typecheck (tsc --noEmit): sin errores."
  : `⚠️ typecheck (tsc --noEmit): ${errLines.length} error(es).\n` +
    errLines.slice(0, 12).join("\n") +
    (errLines.length > 12 ? `\n… (+${errLines.length - 12} más)` : "") +
    "\n\nRecuerda: 4 errores TS2532 en src/lib/courses.test.ts son DEUDA " +
    "PREEXISTENTE. Revisa si esta tanda introdujo alguno NUEVO.";

// systemMessage = aviso al usuario, sin afectar al control de flujo.
process.stdout.write(JSON.stringify({ systemMessage: summary }));
process.exit(0);
