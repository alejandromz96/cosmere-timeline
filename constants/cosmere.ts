import type { SolarSystem, SystemPaletteType } from "@/types/cosmere";

export const SYSTEM_PALETTES: Record<SolarSystem, SystemPaletteType> = {
  SCADRIAL: {
    key: "SCADRIAL",
    name: "Scadrial",
    primary: "rgba(200,200,200,0.2)", // silver mist
    secondary: "rgba(128,128,128,0.18)", // steel grey
    tertiary: "rgba(64,64,64,0.3)", // soot
    accent: "#9ca3af", // gray-400
  },
  ROSHAR: {
    key: "ROSHAR",
    name: "Roshar",
    primary: "rgba(96,165,250,0.2)", // stormlight blue
    secondary: "rgba(34,197,94,0.16)", // emerald spren
    tertiary: "rgba(59,130,246,0.16)", // azure
    accent: "#60a5fa", // blue-400
  },
  NALTHIS: {
    key: "NALTHIS",
    name: "Nalthis",
    primary: "rgba(244,114,182,0.2)", // vibrant magenta
    secondary: "rgba(168,85,247,0.16)", // royal violet
    tertiary: "rgba(236,72,153,0.16)", // warm pink
    accent: "#e879f9", // fuchsia-400
  },
  SEL: {
    key: "SEL",
    name: "Sel",
    primary: "rgba(251,191,36,0.10)", // golden aons
    secondary: "rgba(251,146,60,0.08)", // orange sigils
    tertiary: "rgba(252,211,77,0.08)", // soft amber
    accent: "#f59e0b", // amber-500
  },
  TALDAIN: {
    key: "TALDAIN",
    name: "Taldain (Sand)",
    primary: "rgba(253,224,171,0.2)", // sun-baked sand
    secondary: "rgba(250,250,250,0.16)", // dazzling white
    tertiary: "rgba(234,179,8,0.16)", // solar yellow
    accent: "#fde68a", // amber-200
  },
  LUMAR: {
    key: "LUMAR",
    name: "Lumar (Emerald Sea)",
    primary: "rgba(16,185,129,0.2)", // emerald
    secondary: "rgba(5,150,105,0.16)", // deep teal
    tertiary: "rgba(236,72,153,0.16)", // pink spores accent
    accent: "#10b981", // emerald-500
  },
  UTOL: {
    key: "UTOL",
    name: "UTol",
    primary: "rgba(139,92,246,0.2)", // ethereal violet
    secondary: "rgba(59,130,246,0.16)", // midnight blue
    tertiary: "rgba(2,132,199,0.16)", // sky cyan hint
    accent: "#a78bfa", // violet-400
  },
  CANTICLE: {
    key: "CANTICLE",
    name: "Canticle (Sunlit)",
    primary: "rgba(251,146,60,0.18)", // intense sun orange
    secondary: "rgba(253,224,71,0.14)", // bright yellow
    tertiary: "rgba(255,255,255,0.12)", // white flare
    accent: "#fb923c", // orange-400
  },
  THRENODY: {
    key: "THRENODY",
    name: "Threnody",
    primary: "rgba(99,102,241,0.22)", // indigo ghostlight
    secondary: "rgba(2,6,23,0.3)", // near-black mists
    tertiary: "rgba(59,130,246,0.16)", // cold blue
    accent: "#64748b", // slate-500
  },
  DROMINAD: {
    key: "DROMINAD",
    name: "Drominad",
    primary: "rgba(16,185,129,0.2)", // tropical teal
    secondary: "rgba(34,197,94,0.12)", // jungle green
    tertiary: "rgba(251,146,60,0.16)", // dusk orange
    accent: "#14b8a6", // teal-500
  },
};

export const DEFAULT_SYSTEM_ORDER: SolarSystem[] = [
"SCADRIAL",
"ROSHAR",
"NALTHIS",
"SEL",
"TALDAIN",
"LUMAR",
"UTOL",
"CANTICLE",
"THRENODY",
"DROMINAD",
];
