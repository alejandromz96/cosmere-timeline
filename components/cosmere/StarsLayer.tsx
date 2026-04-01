import { useEffect, useMemo, useState } from "react";
import { motion, useTransform } from "motion/react";
import clsx from "clsx/lite";

import { useStarsLayerCtx } from "@/contexts/StarsLayerProvider";
import makeBoxShadowStars from "@/utils/makeBoxShadowStars";

type StarsLayerProps = {
  mouseFactor: number;
  scrollFactor: number;
  density: number;
  blur?: number;
  opacity?: number;
  starsClassName?: string;
};

const StarsLayer = ({
  mouseFactor,
  scrollFactor,
  density,
  blur,
  opacity,
  starsClassName = "",
}: StarsLayerProps) => {
  const [ready, setReady] = useState(false);
  const { mouseX, mouseY, scrollY } = useStarsLayerCtx();

  useEffect(() => setReady(true), []);

  const translateX = useTransform(mouseX, (v) => v * mouseFactor);
  const translateY = useTransform<number, number>(
    [mouseY, scrollY],
    ([my, sy]) => my * mouseFactor + sy * scrollFactor
  );

  const stars = useMemo(() => {
    if (!ready) return undefined;
    return makeBoxShadowStars(density, { x: 2000, y: 6000 }, blur, opacity);
  }, [ready, density, blur, opacity]);

  if(!ready) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ translateX, translateY }}
    >
      <div
        className={clsx(
          starsClassName,
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        )}
        style={{ boxShadow: stars }}
      />
    </motion.div>
  );
};

export default StarsLayer;
