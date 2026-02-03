"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const productsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        },
      );

      productsRef.current.forEach((product, i) => {
        if (product) {
          gsap.fromTo(
            product,
            {
              opacity: 0,
              y: 100,
              clipPath: "inset(100% 0 0 0)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              delay: i * 0.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: product,
                start: "top 85%",
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const products = [
    {
      num: "01",
      title: "Organiza tu Día a Día",
      desc: "Mi sistema por bloques para ordenar tus días sin olvidarte de ti.",
      price: "37 USD",
      originalPrice: "57 USD",
      cta: "Quiero organizar mis días",
      href: "/dia-a-dia",
      available: true,
      featured: true,
    },
    {
      num: "02",
      title: "Finanzas para Mamás",
      desc: "Un enfoque consciente para entender, ordenar y dirigir el dinero del hogar.",
      cta: "Próximamente",
      available: false,
    },
    {
      num: "03",
      title: "Slow Jobs para Mamás",
      desc: "Cómo crear ingresos alineados a tu etapa de vida, sin sacrificar tu salud.",
      cta: "Próximamente",
      available: false,
    },
    {
      num: "04",
      title: "Rebrand Yourself",
      desc: "Un programa de acompañamiento profundo para redescubrir quién eres hoy.",
      cta: "Por invitación",
      available: false,
      premium: true,
    },
  ];

  return (
    <section ref={sectionRef} id="productos" className="py-24 md:py-40">
      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-20 md:mb-32">
          <span className="block text-lg tracking-[0.5em] uppercase text-foreground mb-8 font-sans">
            Productos & Servicios
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light">
              Día a Día • Finanzas • Propósito
            </h2>
            <p className="text-xl md:text-2xl font-serif italic text-foreground/60 max-w-md">
              "Eres la misma, en una versión más alineada contigo."
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {products.map((product, i) => (
            <div
              key={product.title}
              ref={(el) => (productsRef.current[i] = el)}
              className={`group relative overflow-hidden transition-all duration-700 ${
                product.featured
                  ? "bg-primary text-primary-foreground"
                  : product.premium
                    ? "bg-foreground text-background"
                    : "bg-muted hover:bg-background"
              }`}
            >
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  {/* Left: Number and Title */}
                  <div className="flex items-start gap-8 lg:gap-12">
                    <span
                      className={`text-6xl md:text-7xl lg:text-8xl font-sans font-light ${
                        product.featured
                          ? "text-primary-foreground/20"
                          : product.premium
                            ? "text-background/20"
                            : "text-primary/20"
                      }`}
                    >
                      {product.num}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-light mb-4">
                        {product.title}
                      </h3>
                      <p
                        className={`font-serif text-lg md:text-xl leading-relaxed max-w-lg ${
                          product.featured
                            ? "text-primary-foreground/70"
                            : product.premium
                              ? "text-background/60"
                              : "text-foreground/60"
                        }`}
                      >
                        {product.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price and CTA */}
                  <div className="flex flex-col items-start lg:items-end gap-4 lg:pl-8">
                    {product.price && (
                      <div className="flex items-baseline gap-4">
                        <span className="text-4xl md:text-5xl font-sans font-light">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span
                            className={`text-lg font-serif line-through ${
                              product.featured
                                ? "text-primary-foreground/40"
                                : "text-foreground/40"
                            }`}
                          >
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                    <a
                      href={product.href}
                      className={`px-8 py-4 text-sm tracking-[0.3em] uppercase font-sans transition-all duration-500 ${
                        product.available
                          ? product.featured
                            ? "bg-background text-foreground hover:bg-secondary hover:text-background"
                            : "bg-primary text-primary-foreground hover:bg-secondary"
                          : product.premium
                            ? "border border-background/30 text-background/50 cursor-default"
                            : "border border-border text-foreground/40 cursor-default"
                      }`}
                      disabled={!product.available}
                    >
                      {product.cta}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ${
                  product.featured
                    ? "bg-background"
                    : product.premium
                      ? "bg-secondary"
                      : "bg-primary"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
