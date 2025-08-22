import Starfield from "@/components/cosmere/Starfield";
import StarParallax from "@/components/cosmere/StarParallax";
import { type PropsWithChildren } from "react";

const CosmereLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Starfield /> */}
      <StarParallax />
      <main className="relative z-10">{children}</main>
    </>
  );
};

export default CosmereLayout;
