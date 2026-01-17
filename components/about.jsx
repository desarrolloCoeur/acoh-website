"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const quoteRef = useRef(null)  

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      )

      // Text reveal with stagger
      const textElements = textRef.current.querySelectorAll(".reveal-text")
      gsap.fromTo(
        textElements,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
          },
        },
      )

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 70%",
          },
        },
      )

      // Parallax on image
      gsap.to(imageRef.current.querySelector("img"), {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sobre-mi" className="relative">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left: Content */}
        <div ref={textRef} className="flex flex-col justify-center p-8 md:p-16 lg:p-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <span className="reveal-text block text-md tracking-[0.5em] uppercase text-secondary mb-12 font-sans">
              Sobre Mí
            </span>

            <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-light leading-[1.1] mb-12">
              No soy una marca que te diga <em className="font-serif">qué hacer.</em>
            </h2>

            <div className="space-y-8 text-foreground/60 font-serif text-lg md:text-xl leading-relaxed">
              <p className="reveal-text">
                Soy una mujer, mamá y emprendedora que, después de sentirse cansada, confundida y sobreestimulada,
                decidió crear un sistema más humano para vivir, trabajar y maternar.
              </p>

              <p className="reveal-text">
                Hasta que entendí algo importante: mis sueños no se apagaron, se transformaron. Hoy acompaño a mujeres
                que ya no encajan en la versión anterior de su vida y quieren construir una nueva.
              </p>
            </div>            
          </div>
        </div>

        {/* Right: Image */}
        <div ref={imageRef} className="relative min-h-[60vh] lg:min-h-screen overflow-hidden order-1 lg:order-2">
          <Image
            src="/images/about.jpg"
            alt="Ana Cris Ormaza"
            fill
            className="object-cover"
          />
          <div
            ref={quoteRef}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-foreground/80 to-transparent"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-serif italic text-background/90 max-w-md leading-relaxed">
              "Hubo un momento en el que me sentí invisible. Como si mis sueños se hicieran pequeños."
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary py-16 md:py-24">
        <div className="w-[90%] max-w-6xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-light text-primary-foreground leading-relaxed">
            Aquí no creemos en hacerlo todo. <br className="hidden md:block" />
            <span className="font-serif italic">Creemos en hacerlo con intención.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
