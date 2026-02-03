"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiaIncludes() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef(null);
  const bonusRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // Items stagger reveal
      const items = itemsRef.current.querySelectorAll(".include-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 75%",
          },
        },
      );

      // Bonus section
      gsap.fromTo(
        bonusRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bonusRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const includes = [
    { num: "01", title: "Guía del sistema", desc: "Por bloques de energía" },
    { num: "02", title: "Plantilla flexible", desc: "Adapta a tu vida" },
    { num: "03", title: "Ejemplos reales", desc: "De otras mamás" },
    { num: "04", title: "Método de prioridades", desc: "Qué importa ahora" },
    { num: "05", title: "Video explicativo", desc: "Paso a paso" },
    { num: "06", title: "Acceso de por vida", desc: "Siempre disponible" },
  ];

  const bonuses = [
    { title: "Agenda por bloques", desc: "Plantilla lista" },
    { title: "Checklist de descansos", desc: "Los que nadie te dice" },
    { title: "Bloques personalizados", desc: "Según tu etapa" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-[#231F20] text-[#F5F0EB] overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="px-6 md:px-12 lg:px-20 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
            }}
          >
            Qué
            <br />
            <span className="italic">incluye</span>
          </h2>
          <p className="text-lg md:text-xl text-[#F5F0EB]/60 max-w-md">
            Todo lo que necesitas para organizar tus días con intención
          </p>
        </div>
      </div>

      {/* Items Grid */}
      <div ref={itemsRef} className="px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-[#F5F0EB]/10">
          {includes.map((item, index) => (
            <div
              key={index}
              className="include-item py-10 md:py-14 px-0 md:px-8 border-b border-[#F5F0EB]/10 group cursor-default"
            >
              <div className="flex items-start gap-6">
                <span
                  className="text-[#B49788] font-light"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                >
                  {item.num}
                </span>
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-serif mb-2 group-hover:text-[#B49788] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base text-[#F5F0EB]/50">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bonuses */}
      <div ref={bonusRef} className="mt-24 md:mt-40 px-6 md:px-12 lg:px-20">
        <div className="bg-[#785D53] p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
            <h3
              className="font-serif italic"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              + Bonuses incluidos
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {bonuses.map((bonus, index) => (
              <div key={index} className="border-l-2 border-[#F5F0EB]/30 pl-6">
                <h4 className="text-lg md:text-xl font-serif mb-2">
                  {bonus.title}
                </h4>
                <p className="text-sm md:text-base text-[#F5F0EB]/60">
                  {bonus.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
