import { describe, it, expect } from "vitest";
import {
  toCourseDetail,
  toCatalogCard,
  toPriceTiers,
  resolvePurchasableEdition,
  isPurchasableEdition,
  nextLiveSession,
  courseMaterials,
  courseAnnouncements,
  computeAccessState,
  type CourseDoc,
  type EditionDoc,
} from "@/lib/courses";

// Doc mínimo válido (campos requeridos de CourseDoc); cada test lo extiende.
function baseDoc(overrides: Partial<CourseDoc> = {}): CourseDoc {
  return {
    slug: "comercio-local",
    title: "Comercio Local",
    summary: "Un curso.",
    ...overrides,
  };
}

// Edición mínima válida; cada test la extiende.
function baseEdition(overrides: Partial<EditionDoc> = {}): EditionDoc {
  return {
    status: "open",
    priceCents: 49900,
    startDate: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("computeAccessState", () => {
  const NOW = new Date("2026-06-13T12:00:00.000Z").getTime();

  it("fecha de inicio en el pasado → active", () => {
    expect(computeAccessState("2026-06-01T00:00:00.000Z", NOW)).toBe("active");
  });

  it("fecha de inicio en el futuro → pending", () => {
    expect(computeAccessState("2026-07-01T00:00:00.000Z", NOW)).toBe("pending");
  });

  it("fecha de inicio exactamente igual a now → active (comparación <=)", () => {
    expect(computeAccessState("2026-06-13T12:00:00.000Z", NOW)).toBe("active");
  });

  it("ISO inválida (NaN) → pending", () => {
    expect(computeAccessState("no-es-una-fecha", NOW)).toBe("pending");
  });
});

describe("toCourseDetail — modelo dual title/headline", () => {
  it("headline vacío cae a title; headlineAccent vacío cae a accent", () => {
    const d = toCourseDetail(baseDoc({ accent: "local", headline: "", headlineAccent: "" }));
    expect(d.headline).toBe("Comercio Local");
    expect(d.headlineAccent).toBe("local");
  });

  it("respeta headline/headlineAccent cuando vienen informados", () => {
    const d = toCourseDetail(
      baseDoc({ accent: "local", headline: "Reactiva tu comercio", headlineAccent: "comercio" }),
    );
    expect(d.headline).toBe("Reactiva tu comercio");
    expect(d.headlineAccent).toBe("comercio");
  });

  it("sin accent, headlineAccent termina en cadena vacía", () => {
    const d = toCourseDetail(baseDoc({ headline: "Algo" }));
    expect(d.headlineAccent).toBe("");
    expect(d.accent).toBe("");
  });
});

describe("toCourseDetail — edición: precio, etiqueta y accessState", () => {
  const NOW = new Date("2026-06-13T12:00:00.000Z").getTime();

  it("sin edición → sin precio, editionLabel vacío, pending, no comprable", () => {
    const d = toCourseDetail(baseDoc(), null, [], NOW);
    expect(d.price).toBe("");
    expect(d.editionLabel).toBe("");
    expect(d.startDate).toBeNull();
    expect(d.accessState).toBe("pending");
    expect(d.hasOpenEdition).toBe(false);
  });

  it("edición open con inicio pasado → active, hasOpenEdition, precio y etiqueta", () => {
    const d = toCourseDetail(
      baseDoc(),
      baseEdition({
        status: "open",
        editionLabel: "Edición Junio 2026",
        priceCents: 49900,
        startDate: "2026-06-01T00:00:00.000Z",
        statusLabel: "Inscripción abierta",
      }),
      [],
      NOW,
    );
    expect(d.accessState).toBe("active");
    expect(d.hasOpenEdition).toBe(true);
    expect(d.editionLabel).toBe("Edición Junio 2026");
    expect(d.price).toBe("499€");
    expect(d.statusLabel).toBe("Inscripción abierta");
    expect(d.startDate).toBe("2026-06-01T00:00:00.000Z");
  });

  it("edición con inicio futuro → pending; soon no es comprable", () => {
    const d = toCourseDetail(
      baseDoc(),
      baseEdition({ status: "soon", startDate: "2026-07-01T00:00:00.000Z" }),
      [],
      NOW,
    );
    expect(d.accessState).toBe("pending");
    expect(d.hasOpenEdition).toBe(false);
  });
});

describe("toCourseDetail — conversión de IDs de lección", () => {
  function lessonIdOf(doc: CourseDoc) {
    return toCourseDetail(doc).modules[0].lessons[0].id;
  }

  it("id numérico (entero de Postgres) se convierte a string", () => {
    expect(lessonIdOf(baseDoc({ modules: [{ name: "M1", lessons: [{ id: 5 as unknown as string, title: "L1" }] }] }))).toBe("5");
  });

  it("id que ya viene como string se conserva", () => {
    expect(lessonIdOf(baseDoc({ modules: [{ name: "M1", lessons: [{ id: "abc", title: "L1" }] }] }))).toBe("abc");
  });

  it("id ausente produce cadena vacía", () => {
    expect(lessonIdOf(baseDoc({ modules: [{ name: "M1", lessons: [{ title: "L1" }] }] }))).toBe("");
  });
});

describe("toCourseDetail — material y kind de lección", () => {
  it("material objeto con url expone materialUrl/materialName", () => {
    const d = toCourseDetail(
      baseDoc({
        modules: [
          {
            name: "M1",
            lessons: [{ title: "L1", material: { url: "/m/x.csv", filename: "plantilla.csv" } }],
          },
        ],
      }),
    );
    const l = d.modules[0].lessons[0];
    expect(l.materialUrl).toBe("/m/x.csv");
    expect(l.materialName).toBe("plantilla.csv");
  });

  it("material como string (id sin poblar) no expone url", () => {
    const d = toCourseDetail(
      baseDoc({ modules: [{ name: "M1", lessons: [{ title: "L1", material: "42" }] }] }),
    );
    expect(d.modules[0].lessons[0].materialUrl).toBeUndefined();
  });

  it("material objeto sin filename y kind ausente → 'archivo' implícito sólo si hay url; kind por defecto 'video'", () => {
    const d = toCourseDetail(
      baseDoc({ modules: [{ name: "M1", lessons: [{ title: "L1", material: { url: "/m/y" } }] }] }),
    );
    const l = d.modules[0].lessons[0];
    expect(l.materialName).toBeUndefined(); // filename ausente → undefined en el mapper
    expect(l.kind).toBe("video");
  });
});

describe("toCourseDetail — módulos, defaults de precio y notas", () => {
  it("curso sin módulos → modules vacío", () => {
    expect(toCourseDetail(baseDoc()).modules).toEqual([]);
  });

  it("módulo sin lecciones → info 'PRÓXIMAMENTE' y lessons vacío", () => {
    const d = toCourseDetail(baseDoc({ modules: [{ name: "M1" }] }));
    expect(d.modules[0].info).toBe("PRÓXIMAMENTE");
    expect(d.modules[0].lessons).toEqual([]);
  });

  it("moduleInfo: 1 lección → singular, varias → plural, infoLabel manda", () => {
    const una = toCourseDetail(baseDoc({ modules: [{ name: "M1", lessons: [{ title: "L1" }] }] }));
    expect(una.modules[0].info).toBe("1 LECCIÓN");

    const varias = toCourseDetail(
      baseDoc({ modules: [{ name: "M1", lessons: [{ title: "L1" }, { title: "L2" }] }] }),
    );
    expect(varias.modules[0].info).toBe("2 LECCIONES");

    const conLabel = toCourseDetail(
      baseDoc({ modules: [{ name: "M1", infoLabel: "5 LECCIONES · 1H", lessons: [{ title: "L1" }] }] }),
    );
    expect(conLabel.modules[0].info).toBe("5 LECCIONES · 1H");
  });

  it("priceNote ausente → 'IVA inc.'; oldPriceCents nulo/0 → oldPrice undefined", () => {
    const sinOld = toCourseDetail(baseDoc(), baseEdition({ oldPriceCents: null }));
    expect(sinOld.priceNote).toBe("IVA inc.");
    expect(sinOld.oldPrice).toBeUndefined();
    expect(toCourseDetail(baseDoc(), baseEdition({ oldPriceCents: 0 })).oldPrice).toBeUndefined();
  });

  it("oldPriceCents presente → oldPrice formateado", () => {
    expect(toCourseDetail(baseDoc(), baseEdition({ oldPriceCents: 59900 })).oldPrice).toBe("599€");
  });

  it("euros formatea céntimos a euros y redondea (precio de la edición)", () => {
    expect(toCourseDetail(baseDoc(), baseEdition({ priceCents: 49900 })).price).toBe("499€");
    // Math.round(499.5) → 500 (lógica de dominio, independiente del locale).
    expect(toCourseDetail(baseDoc(), baseEdition({ priceCents: 49950 })).price).toBe("500€");
    // El separador de miles depende de los datos ICU del runtime: Node con ICU
    // completa → "1.499€"; con ICU reducida (este Vitest) → "1499€". Toleramos ambos.
    expect(toCourseDetail(baseDoc(), baseEdition({ priceCents: 149900 })).price).toMatch(/^1[.\s]?499€$/);
  });

  it("mapea feats, forYes/forNo y faq", () => {
    const d = toCourseDetail(
      baseDoc({
        feats: [{ feature: "Acceso de por vida" }],
        forYes: { title: "Para ti si", items: [{ item: "Tienes comercio" }] },
        forNo: { title: "No si", items: [{ item: "Buscas teoría" }] },
        faq: [{ question: "¿Hay certificado?", answer: "Sí" }],
      }),
    );
    expect(d.feats).toEqual(["Acceso de por vida"]);
    expect(d.forYes).toEqual({ title: "Para ti si", items: ["Tienes comercio"] });
    expect(d.forNo).toEqual({ title: "No si", items: ["Buscas teoría"] });
    expect(d.faq).toEqual([{ q: "¿Hay certificado?", a: "Sí" }]);
  });
});

describe("toCatalogCard", () => {
  it("attrs combina edición (inicio/plazas) y curso (duración/nivel); '—' cuando faltan", () => {
    const c = toCatalogCard(baseDoc(), baseEdition());
    expect(c.attrs).toEqual([
      ["Inicio", "—"],
      ["Duración", "—"],
      ["Plazas", "—"],
      ["Nivel", "—"],
    ]);
  });

  it("attrs usa los labels presentes (inicio/plazas de la edición, duración/nivel del curso)", () => {
    const c = toCatalogCard(
      baseDoc({ durationLabel: "8 sem", levelLabel: "Inicial" }),
      baseEdition({ startLabel: "Oct", seatsLabel: "20" }),
    );
    expect(c.attrs).toEqual([
      ["Inicio", "Oct"],
      ["Duración", "8 sem"],
      ["Plazas", "20"],
      ["Nivel", "Inicial"],
    ]);
  });

  it("href deriva del slug; id viene de editionLabel; price de la edición; status normalizado", () => {
    const c = toCatalogCard(
      baseDoc(),
      baseEdition({ editionLabel: "2026-01", priceCents: 49900, status: "open" }),
    );
    expect(c.href).toBe("/curso/comercio-local");
    expect(c.id).toBe("2026-01");
    expect(c.price).toBe("499€");
    expect(c.status).toBe("open");
  });

  it("status 'soon'/'running'/'past' se normalizan a 'soon' salvo 'open'", () => {
    expect(toCatalogCard(baseDoc(), baseEdition({ status: "soon" })).status).toBe("soon");
    expect(toCatalogCard(baseDoc(), baseEdition({ status: "running" })).status).toBe("soon");
    expect(toCatalogCard(baseDoc(), baseEdition({ status: "past" })).status).toBe("soon");
  });

  it("id es cadena vacía cuando no hay editionLabel", () => {
    expect(toCatalogCard(baseDoc(), baseEdition()).id).toBe("");
  });
});

describe("nextLiveSession", () => {
  const NOW = new Date("2026-06-13T12:00:00.000Z").getTime();

  it("devuelve la sesión futura más cercana entre varias", () => {
    const edition = baseEdition({
      liveSessions: [
        { title: "Lejana", date: "2026-07-01T17:00:00.000Z" },
        { title: "Cercana", date: "2026-06-17T17:00:00.000Z", teamsLink: "https://teams/x" },
      ],
    });
    const s = nextLiveSession(edition, NOW);
    expect(s).toEqual({
      title: "Cercana",
      date: "2026-06-17T17:00:00.000Z",
      teamsLink: "https://teams/x",
    });
  });

  it("descarta sesiones pasadas", () => {
    const edition = baseEdition({
      liveSessions: [{ title: "Pasada", date: "2026-06-10T17:00:00.000Z" }],
    });
    expect(nextLiveSession(edition, NOW)).toBeNull();
  });

  it("incluye una sesión con date exactamente igual a now (filtro >=)", () => {
    const edition = baseEdition({
      liveSessions: [{ title: "Justo ahora", date: "2026-06-13T12:00:00.000Z" }],
    });
    expect(nextLiveSession(edition, NOW)?.title).toBe("Justo ahora");
  });

  it("ignora sesiones sin date", () => {
    const edition = baseEdition({
      liveSessions: [{ title: "Sin fecha", date: "" as unknown as string }],
    });
    expect(nextLiveSession(edition, NOW)).toBeNull();
  });

  it("edición nula o sin directos → null", () => {
    expect(nextLiveSession(null, NOW)).toBeNull();
    expect(nextLiveSession(baseEdition(), NOW)).toBeNull();
  });
});

describe("courseMaterials", () => {
  it("recoge sólo lecciones con material objeto y url; filename ausente → 'archivo'", () => {
    const doc = baseDoc({
      modules: [
        {
          name: "M1",
          lessons: [
            { title: "Con material", material: { url: "/m/a.csv", filename: "a.csv" } },
            { title: "Material sin nombre", material: { url: "/m/b" } },
            { title: "Material string", material: "99" },
            { title: "Material sin url", material: { filename: "c.csv" } },
            { title: "Sin material" },
          ],
        },
      ],
    });
    expect(courseMaterials(doc)).toEqual([
      { lessonTitle: "Con material", url: "/m/a.csv", filename: "a.csv" },
      { lessonTitle: "Material sin nombre", url: "/m/b", filename: "archivo" },
    ]);
  });

  it("curso sin módulos → []", () => {
    expect(courseMaterials(baseDoc())).toEqual([]);
  });
});

describe("toPriceTiers — roadmap de ediciones", () => {
  // NOW anterior a las startDate (2026-01-01) → todas las baseEdition son futuras
  // y, por tanto, comprables.
  const NOW = new Date("2025-12-01T00:00:00.000Z").getTime();

  it("asigna tono y etiqueta por posición (1ª turquoise, 2ª amber, 3ª+ ink)", () => {
    const tiers = toPriceTiers(
      [
        baseEdition({ editionLabel: "Ed 1", priceCents: 19800, oldPriceCents: 33000 }),
        baseEdition({ editionLabel: "Ed 2", priceCents: 26400, oldPriceCents: 33000 }),
        baseEdition({ editionLabel: "Ed 3", priceCents: 33000 }),
      ],
      NOW,
    );
    expect(tiers.map((t) => t.tone)).toEqual(["turquoise", "amber", "ink"]);
    expect(tiers.map((t) => t.label)).toEqual([
      "Primera edición",
      "Segunda edición",
      "A partir de la tercera edición",
    ]);
    expect(tiers.map((t) => t.editionLabel)).toEqual(["Ed 1", "Ed 2", "Ed 3"]);
  });

  it("calcula el descuento desde old/price cuando no hay discountLabel", () => {
    const [t1, t2, t3] = toPriceTiers(
      [
        baseEdition({ priceCents: 19800, oldPriceCents: 33000 }), // 40%
        baseEdition({ priceCents: 26400, oldPriceCents: 33000 }), // 20%
        baseEdition({ priceCents: 33000 }), // sin descuento
      ],
      NOW,
    );
    expect(t1.discount).toBe("-40%");
    expect(t2.discount).toBe("-20%");
    expect(t3.discount).toBeUndefined();
  });

  it("discountLabel explícito tiene prioridad sobre el cálculo", () => {
    const [t] = toPriceTiers(
      [baseEdition({ priceCents: 19800, oldPriceCents: 33000, discountLabel: "-50%" })],
      NOW,
    );
    expect(t.discount).toBe("-50%");
  });

  it("más de 3 ediciones: a partir de la 3ª todas son 'ink' / 'A partir de la tercera edición'", () => {
    const tiers = toPriceTiers(
      [
        baseEdition({ priceCents: 100 }),
        baseEdition({ priceCents: 200 }),
        baseEdition({ priceCents: 300 }),
        baseEdition({ priceCents: 400 }),
      ],
      NOW,
    );
    expect(tiers[3].tone).toBe("ink");
    expect(tiers[3].label).toBe("A partir de la tercera edición");
  });

  it("solo las ediciones comprables entran como tramos seleccionables (past fuera)", () => {
    const tiers = toPriceTiers(
      [
        baseEdition({ id: 1, status: "past", editionLabel: "Pasada", startDate: "2025-06-01T00:00:00.000Z" }),
        baseEdition({ id: 2, status: "open", editionLabel: "Abierta" }),
        baseEdition({ id: 3, status: "soon", editionLabel: "Próxima" }),
      ],
      NOW,
    );
    expect(tiers.map((t) => t.editionLabel)).toEqual(["Abierta", "Próxima"]);
    expect(tiers.every((t) => t.purchasable)).toBe(true);
  });

  it("incluye editionId y marca isDefault en la edición open", () => {
    const tiers = toPriceTiers(
      [
        baseEdition({ id: 10, status: "soon", editionLabel: "Próxima" }),
        baseEdition({ id: 20, status: "open", editionLabel: "Abierta" }),
      ],
      NOW,
    );
    expect(tiers.map((t) => t.editionId)).toEqual(["10", "20"]);
    const def = tiers.find((t) => t.isDefault);
    expect(def?.editionId).toBe("20"); // la open es la preseleccionada
    expect(tiers.filter((t) => t.isDefault)).toHaveLength(1);
  });

  it("sin open, isDefault recae en la comprable más próxima (primera por fecha)", () => {
    const tiers = toPriceTiers(
      [
        baseEdition({ id: 1, status: "soon", editionLabel: "Más próxima", startDate: "2026-01-01T00:00:00.000Z" }),
        baseEdition({ id: 2, status: "soon", editionLabel: "Más lejana", startDate: "2026-03-01T00:00:00.000Z" }),
      ],
      NOW,
    );
    const def = tiers.find((t) => t.isDefault);
    expect(def?.editionId).toBe("1");
  });

  it("toCourseDetail rellena priceTiers y defaultEditionId a partir de las ediciones", () => {
    const d = toCourseDetail(
      baseDoc(),
      baseEdition({ id: 1 }),
      [
        baseEdition({ id: 1, status: "soon", editionLabel: "Ed 1", priceCents: 19800 }),
        baseEdition({ id: 2, status: "open", editionLabel: "Ed 2", priceCents: 26400 }),
      ],
      NOW,
    );
    expect(d.priceTiers).toHaveLength(2);
    expect(d.priceTiers[0].editionLabel).toBe("Ed 1");
    expect(d.defaultEditionId).toBe("2"); // la open
  });

  it("sin ediciones comprables → priceTiers vacío y defaultEditionId null", () => {
    const d = toCourseDetail(
      baseDoc(),
      null,
      [baseEdition({ id: 1, status: "past", startDate: "2025-06-01T00:00:00.000Z" })],
      NOW,
    );
    expect(d.priceTiers).toEqual([]);
    expect(d.defaultEditionId).toBeNull();
  });
});

describe("isPurchasableEdition", () => {
  const NOW = new Date("2026-06-13T12:00:00.000Z").getTime();

  it("open con fecha futura y precio válido → comprable", () => {
    expect(isPurchasableEdition(baseEdition({ status: "open", startDate: "2026-07-01T00:00:00.000Z" }), NOW)).toBe(true);
  });

  it("soon con fecha futura y precio válido → comprable", () => {
    expect(isPurchasableEdition(baseEdition({ status: "soon", startDate: "2026-07-01T00:00:00.000Z" }), NOW)).toBe(true);
  });

  it("fecha en el pasado → no comprable (ya empezada)", () => {
    expect(isPurchasableEdition(baseEdition({ status: "open", startDate: "2026-06-01T00:00:00.000Z" }), NOW)).toBe(false);
  });

  it("running/past → no comprable aunque la fecha sea futura", () => {
    expect(isPurchasableEdition(baseEdition({ status: "running", startDate: "2026-07-01T00:00:00.000Z" }), NOW)).toBe(false);
    expect(isPurchasableEdition(baseEdition({ status: "past", startDate: "2026-07-01T00:00:00.000Z" }), NOW)).toBe(false);
  });

  it("precio por debajo del mínimo (< 50) → no comprable", () => {
    expect(isPurchasableEdition(baseEdition({ status: "open", startDate: "2026-07-01T00:00:00.000Z", priceCents: 49 }), NOW)).toBe(false);
  });
});

describe("resolvePurchasableEdition", () => {
  const NOW = new Date("2026-06-13T12:00:00.000Z").getTime();

  const open = baseEdition({ id: 1, status: "open", startDate: "2026-07-01T00:00:00.000Z" });
  const soon = baseEdition({ id: 2, status: "soon", startDate: "2026-09-01T00:00:00.000Z" });
  const past = baseEdition({ id: 3, status: "past", startDate: "2026-05-01T00:00:00.000Z" });

  it("sin editionId → la edición open por defecto", () => {
    const r = resolvePurchasableEdition([open, soon, past], undefined, NOW);
    expect(r.status).toBe("ok");
    expect(r.status === "ok" && r.edition.id).toBe(1);
  });

  it("sin open: sin editionId → la comprable más próxima por fecha", () => {
    const r = resolvePurchasableEdition([soon, past], undefined, NOW);
    expect(r.status).toBe("ok");
    expect(r.status === "ok" && r.edition.id).toBe(2);
  });

  it("con editionId válido y comprable → esa edición", () => {
    const r = resolvePurchasableEdition([open, soon, past], 2, NOW);
    expect(r.status).toBe("ok");
    expect(r.status === "ok" && r.edition.id).toBe(2);
  });

  it("editionId que no pertenece al curso → not-found (404)", () => {
    const r = resolvePurchasableEdition([open, soon], 999, NOW);
    expect(r.status).toBe("not-found");
  });

  it("editionId existente pero no comprable (past) → not-purchasable (409)", () => {
    const r = resolvePurchasableEdition([open, soon, past], 3, NOW);
    expect(r.status).toBe("not-purchasable");
  });

  it("sin ediciones comprables y sin editionId → none (409)", () => {
    const r = resolvePurchasableEdition([past], undefined, NOW);
    expect(r.status).toBe("none");
  });

  it("editionId como string también casa (boundary entero/string de Stripe)", () => {
    const r = resolvePurchasableEdition([open, soon], "1", NOW);
    expect(r.status).toBe("ok");
    expect(r.status === "ok" && r.edition.id).toBe(1);
  });
});

describe("courseAnnouncements", () => {
  it("ordena descendente por fecha", () => {
    const edition = baseEdition({
      announcements: [
        { date: "2026-01-01", title: "Vieja", body: "" },
        { date: "2026-06-01", title: "Nueva", body: "" },
        { date: "2026-03-01", title: "Media", body: "" },
      ],
    });
    expect(courseAnnouncements(edition).map((a) => a.title)).toEqual(["Nueva", "Media", "Vieja"]);
  });

  it("anuncio sin fecha va al final", () => {
    const edition = baseEdition({
      announcements: [
        { title: "Sin fecha", body: "" },
        { date: "2026-06-01", title: "Con fecha", body: "" },
      ],
    });
    expect(courseAnnouncements(edition).map((a) => a.title)).toEqual(["Con fecha", "Sin fecha"]);
  });

  it("edición nula → []", () => {
    expect(courseAnnouncements(null)).toEqual([]);
  });

  it("no muta el array original", () => {
    const edition = baseEdition({
      announcements: [
        { date: "2026-01-01", title: "A", body: "" },
        { date: "2026-06-01", title: "B", body: "" },
      ],
    });
    const original = edition.announcements!.map((a) => a.title);
    courseAnnouncements(edition);
    expect(edition.announcements!.map((a) => a.title)).toEqual(original);
  });
});
