"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out",
          delay: 0.3,
        }
      );



      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: 30,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "20% top",
          end: "60% top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ perspective: "1000px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="h-[100svh] relative overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/image.jpeg"
          alt="Ana Cris Ormaza"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Darker overlay for better text contrast against the light/gray image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#231F20]/70 via-[#231F20]/40 to-[#231F20]/80" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 lg:p-20">
        <div className="flex-1 flex items-center justify-center">
          <div ref={titleRef} className="text-center">
            <p className="text-base md:text-lg tracking-[0.5em] uppercase text-[#B49788] mb-6 font-sans">
              Become the woman
            </p>
            <h1 className="font-sans font-light leading-[0.85] tracking-[-0.02em]">
              <span className="block text-[15vw] md:text-[12vw] lg:text-[10vw] text-white">
                {splitText("YOU ARE")}
              </span>
              <span className="block text-[15vw] md:text-[12vw] lg:text-[10vw] text-white">
                {splitText("MEANT")}
              </span>
              <span className="block text-[15vw] md:text-[12vw] lg:text-[10vw] text-white">
                {splitText("TO BE")}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
