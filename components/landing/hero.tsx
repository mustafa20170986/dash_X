"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import Link from "next/link";

export default function LandingHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
        >
          Next-Generation <br /> 
          <span className="text-primary">Dashboard Ecosystem</span>
        </h1>
        <p 
          ref={descRef}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Explore a suite of high-performance, responsive, and beautifully animated dashboards built with the latest modern tech stack.
        </p>
        <div ref={btnRef} className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="rounded-full text-lg px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="rounded-full text-lg px-8">
            View Components
          </Button>
        </div>
      </div>
    </section>
  );
}
