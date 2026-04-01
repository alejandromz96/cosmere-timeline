const makeBoxShadowStars = (count: number, area: {x: number, y: number}, blur = 0, opacity = 1) => {
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * area.x - area.x / 2;
    const y = Math.random() * area.y - area.y / 2;
    const o = Math.max(0.5, Math.min(1, opacity + (Math.random() - 0.5) * 0.4));
    const tint = Math.random();
    const color =
      tint < 0.1
        ? `rgba(150, 190, 255, ${o})`
        : tint > 0.9
          ? `rgba(255, 230, 200, ${o})`
          : `rgba(255, 255, 255, ${o})`;
    stars.push(`${x}px ${y}px ${blur}px ${color}`);
  }
  return stars.join(", ");
}

export default makeBoxShadowStars;