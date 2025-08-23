export type SolarSystem = 
| "SCADRIAL"
| "ROSHAR"
| "NALTHIS"
| "SEL"
| "TALDAIN"
| "LUMAR"
| "UTOL"
| "CANTICLE"
| "THRENODY"
| "DROMINAD";

export type ColorRGBA = `rgba(${number},${number},${number},${number})`;

export type SystemPaletteType = {
key: SolarSystem;
name: string;
primary: ColorRGBA;
secondary: ColorRGBA;
tertiary: ColorRGBA;
accent?: `#${string}`;
};

export type Location =
  | "Yolen"
  | "Roshar"
  | "Scadrial"
  | "Sel"
  | "Nalthis"
  | "Taldain"
  | "Threnody"
  | "Drominad";

export type CosmereEvent = {
  id: string;
  title: string;
  date: string;
  location: Location;
  description: string;
  color: string;
};
