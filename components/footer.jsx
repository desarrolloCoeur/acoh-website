"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const quoteRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.9, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
          },
        },
      )

      // Line expand
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto">
        <div ref={quoteRef} className="text-center mb-20 md:mb-32">
          <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-serif italic leading-relaxed max-w-5xl mx-auto">
            "No tienes que convertirte en alguien nueva. Solo recordar quién eras, y quién eres hoy, para reorganizar tu
            vida alrededor de eso."
          </p>
        </div>

        <div ref={lineRef} className="h-px bg-primary-foreground/20 origin-center mb-16" />

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12 items-center overflow-hidden max-w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Ana Cris Ormaza"
              width={150}
              height={60}
              className="brightness-0 invert opacity-80"
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {["Instagram", "Pinterest", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="inline-block overflow-hidden text-sm md:text-base tracking-[0.1em] uppercase font-sans text-primary-foreground/50 hover:text-secondary transition-colors duration-500 relative group"
              >
                {social}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs md:text-sm tracking-[0.1em] uppercase font-sans text-primary-foreground/40 md:text-right text-center flex-shrink-0 max-w-full whitespace-nowrap">
            © 2026 Ana Cris Ormaza
          </p>
        </div>
      </div>
    </footer>
  )
}
