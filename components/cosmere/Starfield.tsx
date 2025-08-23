"use client";

import StarsLayerProvider from "@/contexts/StarsLayerProvider";
import StarsLayer from "./StarsLayer";
import Nebula from "./Nebula";

export default function StarParallax() {
  return (
    <div
      className="fixed inset-0 isolate -z-10 overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black"
      aria-label="Parallax starfield"
      role="img"
    >
      <StarsLayerProvider
        maxMouseShift={64}
        springOption={{ stiffness: 90, damping: 22, mass: 0.35 }}
      >
        <Nebula />
        <StarsLayer
          mouseFactor={0.35}
          scrollFactor={-0.2}
          density={280}
          blur={0}
          opacity={0.75}
          starsClassName="h-[1px] w-[1px]"
        />
        <StarsLayer
          mouseFactor={0.6}
          scrollFactor={-0.35}
          density={320}
          blur={1}
          opacity={0.85}
          starsClassName="h-[1.5px] w-[1.5px] drop-shadow-[0_0_1px_rgba(255,255,255,0.2)]"
        />
        <StarsLayer
          mouseFactor={1}
          scrollFactor={-0.5}
          density={380}
          blur={2}
          opacity={0.95}
          starsClassName="h-[2px] w-[2px] drop-shadow-[0_0_2px_rgba(255,255,255,0.35)]"
        />
        <StarsLayer
          mouseFactor={1}
          scrollFactor={-0.5}
          density={180}
          blur={3}
          opacity={0.9}
          starsClassName="twinkle h-[2px] w-[2px] drop-shadow-[0_0_2px_rgba(255,255,255,0.35)]"
        />
      </StarsLayerProvider>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30" />
      
    </div>
  );
}
