"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent?: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Silky-smooth spring physics for 3D unfolding rotation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.001,
  });

  const scaleDimensions = () => {
    return isMobile ? [0.84, 0.96] : [1.06, 1];
  };

  const rotate = useTransform(smoothProgress, [0.1, 0.62], [22, 0]);
  const scale = useTransform(smoothProgress, [0.1, 0.62], scaleDimensions());
  const translate = useTransform(smoothProgress, [0.1, 0.62], [20, -15]);

  return (
    <div
      className="w-full flex items-center justify-center relative py-8 md:py-16"
      ref={containerRef}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="w-full relative max-w-6xl mx-auto flex flex-col items-center justify-center px-4 md:px-8"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {titleComponent && <Header translate={translate} titleComponent={titleComponent} />}
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: "0 auto 2rem auto",
      }}
      className="max-w-5xl mx-auto text-center w-full flex flex-col items-center justify-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate?: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        width: "100%",
        maxWidth: "1160px",
        margin: "0 auto",
        outline: "1px solid transparent",
        boxShadow:
          "0 0 60px rgba(168, 85, 247, 0.22), 0 30px 90px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.18)",
      }}
      className="w-full h-[28rem] sm:h-[34rem] md:h-[44rem] rounded-[28px] p-2 sm:p-3 md:p-4 bg-[#10121c] border border-white/15"
    >
      <div className="h-full w-full overflow-hidden rounded-[22px] bg-[#07080c] relative flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};
