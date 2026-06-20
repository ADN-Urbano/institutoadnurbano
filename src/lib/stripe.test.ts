import { describe, it, expect } from "vitest";
import { isFullRefund } from "@/lib/stripe";

describe("isFullRefund", () => {
  it("reembolso completo → true", () => {
    expect(isFullRefund({ amount_captured: 14990, amount_refunded: 14990 })).toBe(true);
  });

  it("reembolso parcial → false", () => {
    expect(isFullRefund({ amount_captured: 14990, amount_refunded: 5000 })).toBe(false);
  });

  it("sin reembolso → false", () => {
    expect(isFullRefund({ amount_captured: 14990, amount_refunded: 0 })).toBe(false);
  });

  it("sin captura (ambos 0) → false", () => {
    expect(isFullRefund({ amount_captured: 0, amount_refunded: 0 })).toBe(false);
  });

  it("reembolso supera la captura → false", () => {
    expect(isFullRefund({ amount_captured: 14990, amount_refunded: 15000 })).toBe(false);
  });
});
