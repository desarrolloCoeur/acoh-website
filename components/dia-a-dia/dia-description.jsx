"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function DiaDescription() {
  const sectionRef = useRef(null);
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const imageRef = useRef(null);
  const resultsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Question reveal
      gsap.fromTo(
        questionRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: questionRef.current,
            start: "top 75%",
          },
        },
      );

      // Answer paragraphs
      gsap.fromTo(
        answerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: answerRef.current,
            start: "top 70%",
          },
        },
      );

      // Image parallax reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.2 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        },
      );

      // Results stagger
      const items = resultsRef.current.querySelectorAll(".result-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: resultsRef.current,
            start: "top 70%",
          },
        },
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const results = [
    "Dejar de sentir que todo es urgente",
    "Claridad en tus prioridades",
    "Tiempo para ti sin culpa",
    "Tranquilidad y control",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Full Width Question */}
      <div className="py-32 md:py-48 px-6 md:px-12 lg:px-20">
        <h2
          ref={questionRef}
          className="font-serif font-light text-primary max-w-5xl"
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            lineHeight: 1.1,
          }}
        >
          ¿Sientes que tus días se te van entre pendientes y tú siempre quedas
          al final?
        </h2>
      </div>

      {/* Asymmetric Layout */}
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Image - Takes 7 columns */}
        <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src="/images/dia-a-dia/product.jpg"
              alt="Tu Día a Día"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content - Takes 5 columns */}
        <div className="lg:col-span-5 bg-[#785D53] text-[#F5F0EB] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <p
            ref={answerRef}
            className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 opacity-90"
          >
            Tu Día a Día es un sistema práctico por bloques que te ayuda a
            estructurar tu día pensando en tu energía y tu realidad.
          </p>

          <div ref={resultsRef}>
            <p className="text-sm uppercase tracking-[0.3em] opacity-60 mb-6">
              Resultados
            </p>
            <div className="space-y-4">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="result-item opacity-0 flex items-center gap-4 py-3 border-b border-[#F5F0EB]/20"
                >
                  <span className="text-sm opacity-40">0{index + 1}</span>
                  <span className="text-base md:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={ctaRef} className="mt-12">
            <a
              href="#"
              className="inline-flex bg-background py-4 px-5 text-foreground items-center gap-4 group"
            >
              <span className="text-sm uppercase tracking-[0.2em]">
                Comenzar Ahora
              </span>
              <span className="w-12 h-[1px] bg-foreground/50 group-hover:w-20 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
