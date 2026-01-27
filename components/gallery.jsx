"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imagesRef = useRef([]);

  const images = [
    { src: "/images/gallery/gallery1.jpeg", alt: "gallery-1", size: "wide" },
    { src: "/images/gallery/gallery2.jpeg", alt: "gallery-2", size: "medium" },
    { src: "/images/gallery/gallery3.jpeg", alt: "gallery-3", size: "medium" },
    { src: "/images/gallery/gallery4.jpeg", alt: "gallery-4", size: "wide" },
    { src: "/images/gallery/gallery5.jpeg", alt: "gallery-5", size: "wide" },
    { src: "/images/gallery/gallery6.jpeg", alt: "gallery-6", size: "medium" },
    { src: "/images/gallery/gallery8.jpeg", alt: "gallery-7", size: "medium" },
    { src: "/images/gallery/gallery7.jpeg", alt: "gallery-8", size: "wide" },
  ];

  const sizeClasses = {
    large: "col-span-12 md:col-span-7 aspect-[3/4]",
    wide: "col-span-12 md:col-span-8 aspect-[21/9]",
    medium: "col-span-6 md:col-span-4 aspect-square",
    small: "col-span-6 md:col-span-3 aspect-square",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      imagesRef.current.forEach((img, i) => {
        if (!img) return;

        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.9, y: 80 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
            },
          },
        );

        const imgInner = img.querySelector(".gallery-img");
        if (imgInner) {
          gsap.to(imgInner, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="py-24 md:py-40 bg-foreground text-background overflow-hidden"
    >
      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <span className="block text-lg tracking-[0.5em] uppercase text-secondary mb-8 font-sans">
              Galería
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-light leading-tight">
              Este espacio celebra <br className="hidden md:block" />
              <em className="font-serif">la vida real,</em>
            </h2>
          </div>
          <p className="text-xl md:text-2xl font-serif italic text-background/60 max-w-sm">
            "No la perfección."
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => (imagesRef.current[i] = el)}
              className={`${sizeClasses[img.size]} relative overflow-hidden group`}
            >
              <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
