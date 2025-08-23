import type { SolarSystem } from "@/types/cosmere";

const getScrollPointBySystems = (systems: SolarSystem[], systemHeight: number) => {
  const points: number[] = [];
  const systemsLength = systems.length;
  for (let i = 0; i < systemsLength; i++) points.push(i * systemHeight);
  return points;
};

export default getScrollPointBySystems;
