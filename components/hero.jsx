"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left text - simple fade in
      gsap.fromTo(
        leftTextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // Animate right text lines - simple fade in with stagger
      const rightLines = rightTextRef.current.querySelectorAll(".right-line");
      gsap.fromTo(
        rightLines,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.7,
        }
      );

      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out text on scroll - use fromTo so it reverses properly
      gsap.fromTo(
        leftTextRef.current,
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top",
            end: "50% top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        rightTextRef.current,
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top",
            end: "50% top",
            scrub: true,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="h-[100svh] relative overflow-hidden bg-[#C4B5A8]"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/imagev2.jpeg"
          alt="Ana Cris Ormaza"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left Text - "BECOME the woman" */}
        <div
          ref={leftTextRef}
          className="absolute left-6 md:left-12 lg:left-1/6 top-1/2 -translate-y-1/2"
        >
          <div className="flex items-baseline gap-3 md:gap-4">
            <span className="text-md lg:text-4xl tracking-[0.3em] uppercase text-white md:text-[#785D53] font-sans">
              BECOME
            </span>
            <span className="text-lg md:text-xl lg:text-2xl italic text-white font-serif">
              the woman
            </span>
          </div>
        </div>

        {/* Right Text - "YOU ARE MEANT TO BE" */}
        <div
          ref={rightTextRef}
          className="absolute right-6 md:right-12 lg:right-1/8 top-1/2 -translate-y-1/2 text-left"
        >
          <div className="font-serif font-light tracking-[0.1em] text-white md:text-[#9A7B6D] leading-[1.1] 
           text-2xl md:text-4xl lg:text-[4vw]">
            <div className="right-line">YOU</div>
            <div className="right-line">ARE</div>
            <div className="right-line">MEANT</div>
            <div className="right-line">TO BE</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#785D53]/50 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-[#785D53]/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
