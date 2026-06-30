import { describe, it, expect } from "vitest";
import { createHash } from "crypto";
import {
  isLeadType,
  parseUtms,
  parseClickIds,
  offerDeadline,
  isOfferActive,
  normalizeEmail,
  hashEmail,
  isValidEmail,
  WEBINAR_OFFER_MS,
} from "@/lib/leads";

describe("isLeadType", () => {
  it("acepta los tipos válidos", () => {
    for (const t of ["webinar", "descarga-pdf", "contacto", "lista-espera"]) {
      expect(isLeadType(t)).toBe(true);
    }
  });
  it("rechaza valores inválidos", () => {
    expect(isLeadType("otro")).toBe(false);
    expect(isLeadType("")).toBe(false);
    expect(isLeadType(null)).toBe(false);
    expect(isLeadType(123)).toBe(false);
  });
});

describe("parseUtms", () => {
  const NOW = new Date("2026-06-30T10:00:00.000Z").getTime();

  it("mapea los utm_* presentes y fija la fecha", () => {
    const params = new URLSearchParams(
      "utm_source=instagram&utm_medium=paid&utm_campaign=webinar-2026-09&utm_content=video-a&utm_term=alcaldes",
    );
    const touch = parseUtms(params, { now: NOW });
    expect(touch.source).toBe("instagram");
    expect(touch.medium).toBe("paid");
    expect(touch.campaign).toBe("webinar-2026-09");
    expect(touch.content).toBe("video-a");
    expect(touch.term).toBe("alcaldes");
    expect(touch.date).toBe(new Date(NOW).toISOString());
  });

  it("omite las claves ausentes (no las pone vacías)", () => {
    const touch = parseUtms(new URLSearchParams("utm_source=google"), { now: NOW });
    expect(touch.source).toBe("google");
    expect("medium" in touch).toBe(false);
    expect("campaign" in touch).toBe(false);
  });

  it("recoge landingPage y referrer cuando se pasan", () => {
    const touch = parseUtms(new URLSearchParams(""), {
      landingPage: "/webinar",
      referrer: "https://google.com",
      now: NOW,
    });
    expect(touch.landingPage).toBe("/webinar");
    expect(touch.referrer).toBe("https://google.com");
  });

  it("recorta espacios en los valores", () => {
    const touch = parseUtms(new URLSearchParams("utm_source=%20instagram%20"), { now: NOW });
    expect(touch.source).toBe("instagram");
  });
});

describe("parseClickIds", () => {
  it("extrae los click IDs presentes", () => {
    const params = new URLSearchParams("fbclid=fb123&gclid=gc456&li_fat_id=li789");
    expect(parseClickIds(params)).toEqual({ fbclid: "fb123", gclid: "gc456", liFatId: "li789" });
  });
  it("omite los ausentes", () => {
    expect(parseClickIds(new URLSearchParams("fbclid=only"))).toEqual({ fbclid: "only" });
    expect(parseClickIds(new URLSearchParams(""))).toEqual({});
  });
});

describe("offerDeadline / isOfferActive", () => {
  const NOW = new Date("2026-06-30T10:00:00.000Z").getTime();

  it("el deadline es 72 h después del registro", () => {
    const iso = offerDeadline(NOW);
    expect(new Date(iso).getTime() - NOW).toBe(WEBINAR_OFFER_MS);
  });

  it("la oferta está activa antes del deadline y caducada después", () => {
    const iso = offerDeadline(NOW);
    expect(isOfferActive(iso, NOW)).toBe(true);
    expect(isOfferActive(iso, NOW + WEBINAR_OFFER_MS - 1000)).toBe(true);
    expect(isOfferActive(iso, NOW + WEBINAR_OFFER_MS + 1000)).toBe(false);
  });

  it("un deadline inválido se considera caducado", () => {
    expect(isOfferActive("no-es-una-fecha", NOW)).toBe(false);
  });
});

describe("normalizeEmail / hashEmail", () => {
  it("normaliza con trim + minúsculas", () => {
    expect(normalizeEmail("  Foo@Bar.COM ")).toBe("foo@bar.com");
  });

  it("hashea el email normalizado con SHA-256 hex", () => {
    const expected = createHash("sha256").update("foo@bar.com").digest("hex");
    expect(hashEmail("  Foo@Bar.COM ")).toBe(expected);
    expect(hashEmail("foo@bar.com")).toBe(expected);
  });
});

describe("isValidEmail", () => {
  it("acepta emails plausibles", () => {
    expect(isValidEmail("alguien@ayuntamiento.es")).toBe(true);
    expect(isValidEmail("  con.espacios@x.io  ")).toBe(true);
  });
  it("rechaza basura", () => {
    expect(isValidEmail("sin-arroba")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("a@b.c d@e.f")).toBe(false);
  });
});
