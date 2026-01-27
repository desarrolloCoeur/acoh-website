"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
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

      const formElements = formRef.current.querySelectorAll(".form-field");
      gsap.fromTo(
        formElements,
        { opacity: 0, y: 60, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="py-24 md:py-40 relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[30vw] font-sans font-light text-primary/5 whitespace-nowrap">
          HOLA
        </span>
      </div>

      <div className="w-[90%] md:w-[85%] max-w-5xl mx-auto relative z-10">
        <div ref={headerRef} className="mb-16 md:mb-24">
          <span className="block text-lg tracking-[0.5em] uppercase text-foreground mb-8 font-sans">
            Contacto
          </span>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-light leading-tight">
              ¿Lista para <em className="font-serif">empezar?</em>
            </h2>
            <div className="flex flex-col justify-end">
              <p className="font-serif text-foreground/60 text-xl md:text-2xl leading-relaxed">
                Si este espacio resuena contigo, déjanos tu mensaje y te
                responderemos con calma y claridad.
              </p>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-0"
          style={{ perspective: "1000px" }}
        >
          <div className="grid lg:grid-cols-2 border-t border-border">
            <div className="form-field p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border">
              <label className="block text-sm tracking-[0.4em] uppercase text-foreground/40 mb-4 font-sans">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent font-serif text-2xl md:text-3xl focus:outline-none placeholder:text-foreground/20"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="form-field p-8 md:p-12 border-b border-border">
              <label className="block text-sm tracking-[0.4em] uppercase text-foreground/40 mb-4 font-sans">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent font-serif text-2xl md:text-3xl focus:outline-none placeholder:text-foreground/20"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-field p-8 md:p-12 border-b border-border">
            <label className="block text-sm tracking-[0.4em] uppercase text-foreground/40 mb-4 font-sans">
              Mensaje
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
              className="w-full bg-transparent font-serif text-2xl md:text-3xl focus:outline-none resize-none placeholder:text-foreground/20"
              placeholder="¿En qué podemos ayudarte?"
              required
            />
          </div>

          <div className="form-field p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <a
              href="mailto:anacris@acoh.mx"
              className="text-xl md:text-2xl font-serif text-foreground/50 hover:text-primary transition-colors duration-500 group"
            >
              anacris@acoh.mx
              <span className="block h-px w-0 group-hover:w-full bg-primary transition-all duration-500" />
            </a>
            <button
              type="submit"
              className="px-12 py-5 bg-foreground text-background text-sm tracking-[0.3em] uppercase font-sans hover:bg-primary transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10">Enviar mensaje</span>
              <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
