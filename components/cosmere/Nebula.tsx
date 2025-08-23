import { useTransform, motion } from "motion/react";

import { DEFAULT_SYSTEM_ORDER } from "@/constants/cosmere";
import { useStarsLayerCtx } from "@/contexts/StarsLayerProvider";
import getNebulaColors from "@/utils/getNebulaColors";
import getScrollPointBySystems from "@/utils/getScrollPointBySystems";

const NEBULA_COLORS = getNebulaColors(DEFAULT_SYSTEM_ORDER);

const SCROLL_POINTS = getScrollPointBySystems(DEFAULT_SYSTEM_ORDER, 1000);

const Nebula = () => {
  const { scrollY } = useStarsLayerCtx();
  const primaryNebula = useTransform(scrollY, SCROLL_POINTS, NEBULA_COLORS.primary);
  const secondaryNebula = useTransform(scrollY, SCROLL_POINTS, NEBULA_COLORS.secondary);
  const tertiaryNebula = useTransform(scrollY, SCROLL_POINTS, NEBULA_COLORS.tertiary);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 nebula-alive"
      style={{
        ["--primaryNebula" as any]: primaryNebula,
        ["--secondaryNebula" as any]: secondaryNebula,
        ["--tertiaryNebula" as any]: tertiaryNebula,
        background:
          "radial-gradient(1000px 620px at 18% 12%, var(--primaryNebula), transparent 70%)," +
          "radial-gradient(800px 420px at 95% 65%, var(--secondaryNebula), transparent 70%)," +
          "radial-gradient(900px 480px at 60% 85%, var(--tertiaryNebula), transparent 80%)",
      }}
    />
  );
};

export default Nebula;
