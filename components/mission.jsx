"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const valuesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              x: i % 2 === 0 ? -100 : 100,
              opacity: 0,
              rotateY: i % 2 === 0 ? -15 : 15,
            },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            },
          );
        }
      });

      if (valuesRef.current) {
        const valueItems = valuesRef.current.querySelectorAll(".value-item");
        gsap.fromTo(
          valueItems,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      num: "01",
      title: "Flexibilidad",
      desc: "Tu vida cambia, tu sistema también",
    },
    { num: "02", title: "Humanidad", desc: "No somos robots productivos" },
    { num: "03", title: "Claridad", desc: "Menos ruido, más enfoque" },
    {
      num: "04",
      title: "Sostenibilidad",
      desc: "Solo lo que puedes sostener hoy  puede repetirse mañana",
    },
    {
      num: "05",
      title: "Respeto",
      desc: "Sistemas que respetan la etapa en la que estás hoy",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="mision"
      className="py-24 md:py-40 bg-muted relative overflow-hidden"
    >
      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto">
        <div
          ref={titleRef}
          className="mb-24 md:mb-40 grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* TEXT */}
          <div className="lg:col-span-7">
            <span className="block text-lg tracking-[0.5em] uppercase text-foreground mb-8 font-sans">
              Rebrand Yourself
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-light leading-[1.05]">
              Este no es un lugar <br className="hidden lg:block" />
              para exigirte más.
            </h2>
            <p className="mt-8 text-2xl md:text-3xl lg:text-4xl font-serif italic text-foreground/60">
              Es un lugar para empezar distinto.
            </p>
          </div>
          {/* IMAGE */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[3/4] bg-border/40 flex items-center justify-center text-foreground/40 font-sans">
              <Image
                src="/images/magnolias.jpg"
                alt="Ana Cris Ormaza"
                fill
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mb-32">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="lg:col-span-7 p-10 md:p-16 bg-background relative group"
            style={{ perspective: "1000px" }}
          >
            <span className="absolute top-6 right-6 text-8xl md:text-9xl font-sans font-light text-primary/10">
              M
            </span>
            <span className="text-sm tracking-[0.5em] uppercase text-foreground font-sans">
              Misión
            </span>
            <p className="mt-8 text-2xl md:text-3xl lg:text-4xl font-serif text-foreground/80 leading-relaxed relative z-10">
              Acompañar a mujeres a reorganizar su vida, su energía y sus
              hábitos, mientras reconectan con su identidad y construyen su
              nueva versión.
            </p>
            <div className="mt-12 w-20 h-px bg-primary group-hover:w-40 transition-all duration-700" />
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="lg:col-span-5 lg:mt-24 p-10 md:p-16 bg-foreground text-background relative group"
            style={{ perspective: "1000px" }}
          >
            <span className="absolute top-6 right-6 text-8xl md:text-9xl font-sans font-light text-background/10">
              V
            </span>
            <span className="text-sm tracking-[0.5em] uppercase text-secondary font-sans">
              Visión
            </span>
            <p className="mt-8 text-xl md:text-2xl lg:text-3xl font-serif text-background/80 leading-relaxed relative z-10">
              Crear una comunidad de mujeres conscientes, enfocadas y libres,
              que diseñan su vida desde la claridad y no desde el caos.
            </p>
            <div className="mt-12 w-20 h-px bg-secondary group-hover:w-40 transition-all duration-700" />
          </div>
        </div>

        <div ref={valuesRef}>
          <span className="block text-lg tracking-[0.5em] uppercase text-foreground mb-12 font-sans">
            Nuestros Valores
          </span>
          <div className="grid md:grid-cols-5 gap-px bg-border">
            {values.map((value) => (
              <div
                key={value.title}
                className="value-item bg-muted p-8 md:p-10 group hover:bg-background transition-colors duration-500"
              >
                <span className="block text-4xl md:text-5xl font-sans font-light text-primary/30 mb-6 group-hover:text-primary transition-colors duration-500">
                  {value.num}
                </span>
                <h4 className="text-xl md:text-2xl font-sans mb-3">
                  {value.title}
                </h4>
                <p className="text-base font-serif text-foreground/50 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
