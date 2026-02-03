"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function DiaHero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal with clip path
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0 0 0)", y: 60 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.3,
        },
      );

      // Subtitle fade
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      );

      // Decorative number
      gsap.fromTo(
        decorRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.06,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
      );

      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out on scroll
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "15% top",
            end: "55% top",
            scrub: true,
          },
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-[100svh] relative overflow-hidden bg-[#E8DDD3]"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/dia-a-dia/hero.jpg"
          alt="Tu Día a Día"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Decorative Large Number */}
      <div
        ref={decorRef}
        className="absolute z-0 font-serif text-background select-none pointer-events-none"
        style={{
          fontSize: "clamp(20rem, 50vw, 60rem)",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          lineHeight: 0.8,
          opacity: 0,
        }}
      >
        24
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl">
          {/* Small Label */}
          <p className="text-lg text-background uppercase tracking-[0.3em] mb-6">
            Producto Digital
          </p>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-serif font-light text-background overflow-hidden"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 12rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
            }}
          >
            Tu Día
            <br />
            <span className="italic font-normal">a Día</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-8 md:mt-12 max-w-xl text-lg md:text-xl lg:text-2xl text-background/90 leading-relaxed font-light"
          >
            Sistema por bloques para organizar tu vida sin olvidarte de ti
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 py-6 flex justify-between items-center border-t border-primary/10">
        <span className="text-sm text-primary/50 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <span className="text-sm text-primary/50">MMXXVI</span>
      </div>
    </section>
  );
}
