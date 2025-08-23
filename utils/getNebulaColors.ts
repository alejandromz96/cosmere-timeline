import { SYSTEM_PALETTES } from "@/constants/cosmere";
import type { ColorRGBA, SolarSystem } from "@/types/cosmere";

const getNebulaColors = (systems: SolarSystem[]) => {
  const primary: ColorRGBA[] = [];
  const secondary: ColorRGBA[] = [];
  const tertiary: ColorRGBA[] = [];
  systems.forEach((system) => {
    const palette = SYSTEM_PALETTES[system];
    primary.push(palette.primary);
    secondary.push(palette.secondary);
    tertiary.push(palette.tertiary);
  });
  return { primary, secondary, tertiary };
};

export default getNebulaColors;
