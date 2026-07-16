"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Dashboard {
  id: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  href: string;
  image: string;
}

export default function DashboardShowcaseSection({ 
  dashboard, 
  reverse 
}: { 
  dashboard: Dashboard; 
  reverse?: boolean 
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: reverse ? 100 : -100, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        },
      }
    );
  }, [reverse]);

  return (
    <section 
      ref={containerRef}
      className={cn(
        "container mx-auto px-4 flex flex-col items-center gap-12 lg:gap-20",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div 
        ref={imageRef}
        className="w-full lg:w-1/2 relative group"
      >
        <div className={cn(
          "absolute -inset-4 rounded-2xl blur-2xl opacity-20 transition-opacity group-hover:opacity-40 bg-gradient-to-r",
          dashboard.color
        )} />
        <div className="relative overflow-hidden rounded-2xl border shadow-2xl bg-muted">
          <img 
            src={dashboard.image} 
            alt={dashboard.title}
            className="w-full h-auto object-cover aspect-video"
          />
        </div>
      </div>

      <div 
        ref={contentRef}
        className="w-full lg:w-1/2 space-y-6"
      >
        <div className={cn(
          "inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r",
          dashboard.color
        )}>
          {dashboard.title}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">{dashboard.title} Dashboard</h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {dashboard.description}
        </p>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dashboard.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="pt-6">
          <Link href={dashboard.href}>
            <Button size="lg" className="rounded-full gap-2 group">
              Explore Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
