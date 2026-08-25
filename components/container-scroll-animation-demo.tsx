"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScrollDemo() {
  return (
    <section 
      className="w-full flex flex-col items-center justify-center overflow-hidden py-12"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ContainerScroll
        titleComponent={
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", margin: "0 auto" }}>
            <h1 
              className="text-4xl md:text-5xl font-bold text-white text-center tracking-tight"
              style={{ textAlign: "center", color: "#ffffff", fontFamily: "var(--font-display, inherit)" }}
            >
              Unleash the power of <br />
              <span 
                className="text-4xl md:text-[5.5rem] font-extrabold mt-2 leading-none"
                style={{
                  background: "linear-gradient(135deg, #c084fc 0%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  paddingBottom: "8px"
                }}
              >
                Scroll Animations
              </span>
            </h1>
          </div>
        }
      >
        <img
          src="/linear.webp"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }}
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
