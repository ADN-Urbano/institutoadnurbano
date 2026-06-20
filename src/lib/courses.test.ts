import { describe, it, expect } from "vitest";
import {
  toCourseDetail,
  toCatalogCard,
  nextLiveSession,
  courseMaterials,
  courseAnnouncements,
  type CourseDoc,
} from "@/lib/courses";

// Doc mínimo válido (campos requeridos de CourseDoc); cada test lo extiende.
function baseDoc(overrides: Partial<CourseDoc> = {}): CourseDoc {
  return {
    slug: "comercio-local",
    title: "Comercio Local",
    summary: "Un curso.",
    priceCents: 49900,
    status: "open",
    ...overrides,
  };
}

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
    const sinOld = toCourseDetail(baseDoc({ oldPriceCents: null }));
    expect(sinOld.priceNote).toBe("IVA inc.");
    expect(sinOld.oldPrice).toBeUndefined();
    expect(toCourseDetail(baseDoc({ oldPriceCents: 0 })).oldPrice).toBeUndefined();
  });

  it("oldPriceCents presente → oldPrice formateado", () => {
    expect(toCourseDetail(baseDoc({ oldPriceCents: 59900 })).oldPrice).toBe("599€");
  });

  it("euros formatea céntimos a euros y redondea", () => {
    expect(toCourseDetail(baseDoc({ priceCents: 49900 })).price).toBe("499€");
    // Math.round(499.5) → 500 (lógica de dominio, independiente del locale).
    expect(toCourseDetail(baseDoc({ priceCents: 49950 })).price).toBe("500€");
    // El separador de miles depende de los datos ICU del runtime: Node con ICU
    // completa → "1.499€"; con ICU reducida (este Vitest) → "1499€". Toleramos ambos.
    expect(toCourseDetail(baseDoc({ priceCents: 149900 })).price).toMatch(/^1[.\s]?499€$/);
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
  it("attrs rellena '—' cuando faltan los labels", () => {
    const c = toCatalogCard(baseDoc());
    expect(c.attrs).toEqual([
      ["Inicio", "—"],
      ["Duración", "—"],
      ["Plazas", "—"],
      ["Nivel", "—"],
    ]);
  });

  it("attrs usa los labels presentes", () => {
    const c = toCatalogCard(
      baseDoc({ startLabel: "Oct", durationLabel: "8 sem", seatsLabel: "20", levelLabel: "Inicial" }),
    );
    expect(c.attrs).toEqual([
      ["Inicio", "Oct"],
      ["Duración", "8 sem"],
      ["Plazas", "20"],
      ["Nivel", "Inicial"],
    ]);
  });

  it("href deriva del slug; id viene de edition; price formateado", () => {
    const c = toCatalogCard(baseDoc({ edition: "2026-01", priceCents: 49900 }));
    expect(c.href).toBe("/curso/comercio-local");
    expect(c.id).toBe("2026-01");
    expect(c.price).toBe("499€");
  });

  it("id es cadena vacía cuando no hay edition", () => {
    expect(toCatalogCard(baseDoc()).id).toBe("");
  });
});

describe("nextLiveSession", () => {
  const NOW = new Date("2026-06-13T12:00:00.000Z").getTime();

  function withSessions(lessons: CourseDoc["modules"]): CourseDoc {
    return baseDoc({ modules: lessons });
  }

  it("devuelve la sesión futura más cercana entre varias", () => {
    const doc = withSessions([
      {
        name: "M1",
        lessons: [
          { title: "Lejana", kind: "live", liveDate: "2026-07-01T17:00:00.000Z" },
          { title: "Cercana", kind: "live", liveDate: "2026-06-17T17:00:00.000Z", teamsLink: "https://teams/x" },
        ],
      },
    ]);
    const s = nextLiveSession(doc, NOW);
    expect(s).toEqual({
      title: "Cercana",
      date: "2026-06-17T17:00:00.000Z",
      teamsLink: "https://teams/x",
    });
  });

  it("descarta sesiones pasadas", () => {
    const doc = withSessions([
      { name: "M1", lessons: [{ title: "Pasada", kind: "live", liveDate: "2026-06-10T17:00:00.000Z" }] },
    ]);
    expect(nextLiveSession(doc, NOW)).toBeNull();
  });

  it("incluye una sesión con date exactamente igual a now (filtro >=)", () => {
    const doc = withSessions([
      { name: "M1", lessons: [{ title: "Justo ahora", kind: "live", liveDate: "2026-06-13T12:00:00.000Z" }] },
    ]);
    const s = nextLiveSession(doc, NOW);
    expect(s?.title).toBe("Justo ahora");
  });

  it("ignora lecciones no-live y live sin liveDate", () => {
    const doc = withSessions([
      {
        name: "M1",
        lessons: [
          { title: "Vídeo futuro", kind: "video", liveDate: "2026-07-01T17:00:00.000Z" },
          { title: "Live sin fecha", kind: "live" },
        ],
      },
    ]);
    expect(nextLiveSession(doc, NOW)).toBeNull();
  });

  it("curso sin módulos → null", () => {
    expect(nextLiveSession(baseDoc(), NOW)).toBeNull();
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

describe("courseAnnouncements", () => {
  it("ordena descendente por fecha", () => {
    const doc = baseDoc({
      announcements: [
        { date: "2026-01-01", title: "Vieja", body: "" },
        { date: "2026-06-01", title: "Nueva", body: "" },
        { date: "2026-03-01", title: "Media", body: "" },
      ],
    });
    expect(courseAnnouncements(doc).map((a) => a.title)).toEqual(["Nueva", "Media", "Vieja"]);
  });

  it("anuncio sin fecha va al final", () => {
    const doc = baseDoc({
      announcements: [
        { title: "Sin fecha", body: "" },
        { date: "2026-06-01", title: "Con fecha", body: "" },
      ],
    });
    expect(courseAnnouncements(doc).map((a) => a.title)).toEqual(["Con fecha", "Sin fecha"]);
  });

  it("no muta el array original", () => {
    const doc = baseDoc({
      announcements: [
        { date: "2026-01-01", title: "A", body: "" },
        { date: "2026-06-01", title: "B", body: "" },
      ],
    });
    const original = doc.announcements!.map((a) => a.title);
    courseAnnouncements(doc);
    expect(doc.announcements!.map((a) => a.title)).toEqual(original);
  });
});
