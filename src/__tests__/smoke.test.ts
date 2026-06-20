import { describe, it, expect } from "vitest";

// Test de humo: verifica que el runner (Vitest) está bien cableado.
// NO prueba lógica de negocio — eso vendrá en tests dedicados por módulo.
describe("smoke", () => {
  it("el runner de tests funciona", () => {
    expect(1 + 1).toBe(2);
  });
});
