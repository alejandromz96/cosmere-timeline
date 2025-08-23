import { createContext, type PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { type SpringOptions, useMotionValue, type MotionValue, useSpring } from "motion/react";

type StarsLayerCtxType = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
};
const StarsLayerContext = createContext<StarsLayerCtxType | null>(null);

export const useStarsLayerCtx = () => {
  const context = useContext(StarsLayerContext);
  if (!context) throw new Error("useStarsLayerCtx must be used within StarsLayerProvider");
  return context;
};

type StarsLayerProviderProps = PropsWithChildren<{
  springOption: SpringOptions;
  maxMouseShift: number;
}>;
const StarsLayerProvider = ({ children, springOption, maxMouseShift }: StarsLayerProviderProps) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, springOption);
  const mouseY = useSpring(rawY, springOption);

  const scrollY = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dxn = (e.clientX - centerX) / centerX;
      const dyn = (e.clientY - centerY) / centerY;
      rawX.set(dxn * maxMouseShift);
      rawY.set(dyn * maxMouseShift);
    };
    const leave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("mousemove", handle);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("mouseleave", leave);
    };
  }, [rawX, rawY]);

  const value = useMemo<StarsLayerCtxType>(() => ({ mouseX, mouseY, scrollY }), []);

  return <StarsLayerContext.Provider value={value}>{children}</StarsLayerContext.Provider>;
};

export default StarsLayerProvider;
