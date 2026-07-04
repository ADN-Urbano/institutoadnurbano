/**
 * Estructura del catálogo / itinerario (documento del cliente, jul-2026).
 * Contenido estático (Fase 1 = "el mapa"). Los 2 cursos vivos enlazan a su
 * ficha; el resto se muestra como "Próximamente".
 */

/* ---- Los 4 niveles ---- */
export const niveles = [
  { name: "Clave", desc: "La unidad básica: un tema concreto." },
  { name: "Módulo", desc: "Varias claves. Grabado, sin sesiones en directo." },
  { name: "Programa", desc: "Varios módulos, con sesiones en directo y cohorte." },
  { name: "Especialización", desc: "Varios programas de un área + 3 h de consultoría individual." },
];

/* ---- Área 1 · Estrategia y mandato (matriz 2×4) ---- */
export type MatrizCell = { title: string; desc: string; href?: string };

export const estrategia = {
  momentos: [
    "Inicio de legislatura",
    "Ecuador de legislatura",
    "Último año",
    "Campaña electoral",
  ],
  gobierno: [
    { title: "Arrancar el mandato", desc: "Primeros 100 días y plan de gobierno." },
    { title: "El giro de mitad de mandato", desc: "Balance y reajuste." },
    {
      title: "Hacia un nuevo mandato",
      desc: "Prepara el último año de legislatura.",
      href: "/curso/hacia-un-nuevo-mandato",
    },
    { title: "Gobernar la campaña", desc: "Ejecutar desde el poder." },
  ] as MatrizCell[],
  oposicion: [
    { title: "Organizar la oposición desde el primer día", desc: "Estructura y método desde el inicio." },
    { title: "Consolidar la alternativa", desc: "De reactivo a propositivo." },
    {
      title: "Construir la alternativa",
      desc: "Prepara la candidatura que tu municipio espera.",
      href: "/curso/construir-la-alternativa",
    },
    { title: "Ganar la calle", desc: "Ejecutar sin aparato institucional." },
  ] as MatrizCell[],
};

/* ---- Áreas 2-5 · Especializaciones ---- */
export type Area = {
  n: number;
  title: string;
  subtitle: string;
  grupos: { title?: string; items: string[] }[];
};

export const especializaciones: Area[] = [
  {
    n: 2,
    title: "Gestionar tu ayuntamiento",
    subtitle: "Especialización · la institución que diriges",
    grupos: [
      {
        title: "Programa · El Gobierno",
        items: [
          "Equipo de gobierno y gabinete",
          "Coordinación interna y departamentos",
          "Liderar equipos técnicos y funcionariales",
          "El Pleno y la relación con la oposición",
        ],
      },
      {
        title: "Programa · La Estructura de Gestión",
        items: [
          "Secretario, interventor y servicios jurídicos",
          "Gestión económica y financiación municipal",
          "Contratación pública",
        ],
      },
    ],
  },
  {
    n: 3,
    title: "Impulsar tu territorio",
    subtitle: "Especialización · el municipio que tienes a tu cargo",
    grupos: [
      {
        items: [
          "Estrategia de ciudad y proyectos motores",
          "Revitalización de barrios y pedanías",
          "Movilidad y espacio público",
          "Urbanismo y vivienda",
        ],
      },
    ],
  },
  {
    n: 4,
    title: "Liderar a tus vecinos",
    subtitle: "Especialización · las personas que viven en el territorio",
    grupos: [
      {
        items: [
          "La agenda pública del cargo electo",
          "Mapa de actores y tejido social",
          "Participación ciudadana que funciona",
          "Gestión de crisis: la decisión de gobierno",
        ],
      },
    ],
  },
  {
    n: 5,
    title: "Saber comunicarlo",
    subtitle: "Especialización · lo que haces con las tres anteriores",
    grupos: [
      {
        items: [
          "Comunicación pública para cargos electos",
          "Comunicación digital y redes institucionales",
          "Hablar en público",
          "Gestión de medios de comunicación",
          "Comunicación de crisis: el mensaje",
        ],
      },
    ],
  },
];

/* ---- Área 6 · Políticas sectoriales (8 módulos) ---- */
export const sectorial = {
  n: 6,
  title: "Gestión de políticas sectoriales",
  subtitle: "Ocho módulos independientes, pensados para crecer con la demanda.",
  modulos: [
    { title: "Turismo y marca ciudad", items: ["Turismo municipal", "Marca territorial y posicionamiento"] },
    {
      title: "Comercio, emprendimiento y empleo",
      items: ["Comercio local y dinamización", "Mercados municipales", "Apoyo al emprendimiento", "Empleo y desarrollo local"],
    },
    { title: "Cultura y festejos", items: ["Cultura y patrimonio", "Fiestas y festejos populares"] },
    {
      title: "Gestión de servicios públicos",
      items: ["Limpieza y residuos", "Alumbrado y eficiencia energética", "Parques y jardines", "Cementerios y servicios funerarios", "Protección animal"],
    },
    { title: "Gestión de obras e inversiones", items: ["Obras públicas y mantenimiento", "Polígonos industriales y suelo empresarial"] },
    {
      title: "Servicios sociales",
      items: ["Servicios sociales y dependencia", "Igualdad y diversidad", "Juventud", "Mayores y envejecimiento activo", "Relación con centros escolares"],
    },
    { title: "Seguridad ciudadana y emergencias", items: ["Seguridad ciudadana y policía local", "Protección civil y emergencias", "Convivencia ciudadana"] },
    { title: "Smart City y administración electrónica", items: ["Administración electrónica y trámites", "Ciudad inteligente y datos municipales"] },
  ],
};
