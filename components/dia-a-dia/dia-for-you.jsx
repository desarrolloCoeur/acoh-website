"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiaForYou() {
  const sectionRef = useRef(null);
  const yesRef = useRef(null);
  const noRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Yes column animation
      gsap.fromTo(
        yesRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );

      // No column animation
      gsap.fromTo(
        noRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const forYou = [
    "Tus días se van en mil cosas y tú quedas al final",
    "Las agendas no se adaptan a tu vida real",
    "Quieres tiempo para ti sin culpa",
    "Buscas estructura, no rigidez",
    "Lista para organizar con intención",
  ];

  const notForYou = [
    "Buscas horarios estrictos",
    "Quieres soluciones mágicas",
    "Sin tiempo para organizarte",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Split Screen */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* YES Column */}
        <div
          ref={yesRef}
          className="bg-[#F5F0EB] p-8 md:p-12 lg:p-20 flex flex-col justify-center relative"
        >
          {/* Large decorative text */}
          <span
            className="absolute top-8 left-8 md:left-12 text-primary/5 font-serif select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 20vw, 20rem)", lineHeight: 0.8 }}
          >
            Sí
          </span>

          <div className="relative z-10">
            <p className="text-lg uppercase tracking-[0.3em] text-primary/50 mb-8">
              Es para ti si
            </p>
            <div className="space-y-6">
              {forYou.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <span className="w-8 h-[1px] bg-[#B49788] mt-3 group-hover:w-12 transition-all duration-300" />
                  <p className="text-lg md:text-xl text-primary/80 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NO Column */}
        <div
          ref={noRef}
          className="bg-[#E8DDD3] p-8 md:p-12 lg:p-20 flex flex-col justify-center relative"
        >
          {/* Large decorative text */}
          <span
            className="absolute top-8 right-8 md:right-12 text-primary/5 font-serif select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 20vw, 20rem)", lineHeight: 0.8 }}
          >
            No
          </span>

          <div className="relative z-10">
            <p className="text-lg uppercase tracking-[0.3em] text-primary/50 mb-8">
              No es para ti si
            </p>
            <div className="space-y-6">
              {notForYou.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <span className="w-8 h-[1px] bg-primary/30 mt-3 group-hover:w-12 transition-all duration-300" />
                  <p className="text-lg md:text-xl text-primary/60 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="w-full">
        <div
          ref={ctaRef}
          className="bg-background 
          py-32 md:py-48  transition-all duration-300"
        >
          <div className="flex  justify-center text-center">
            <a
              href="#"
              className="inline-flex bg-primary py-4 px-5 text-background items-center gap-4 group"
            >
              <span className="uppercase text-2xl md:text-4xl uppercase tracking-[0.2em]">
                Comenzar ahora
              </span>
              <span className="w-12 h-[1px] bg-background/50 group-hover:w-20 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
