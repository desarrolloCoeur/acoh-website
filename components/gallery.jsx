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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
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
        if (img) {
          gsap.fromTo(
            img,
            {
              opacity: 0,
              scale: 0.8,
              y: 100,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
              },
            },
          );

          // Parallax on each image
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
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    { src: "/images/gallery/gallery1.jpeg", alt: "gallery-1", size: "large" },
    { src: "/images/gallery/gallery2.jpeg", alt: "gallery-2", size: "small" },
    { src: "/images/gallery/gallery3.jpeg", alt: "gallery-3", size: "small" },
    { src: "/images/gallery/gallery4.jpeg", alt: "gallery-4", size: "small" },
    { src: "/images/gallery/gallery5.jpeg", alt: "gallery-5", size: "small" },
    { src: "/images/gallery/gallery6.jpeg", alt: "gallery-6", size: "wide" },
    { src: "/images/gallery/gallery7.jpeg", alt: "gallery-7", size: "medium" },
    { src: "/images/gallery/gallery8.jpeg", alt: "gallery-8", size: "small" },
  ];

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="py-24 md:py-40 bg-foreground text-background overflow-hidden"
    >
      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto">
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

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large image */}
          <div
            ref={(el) => (imagesRef.current[0] = el)}
            className="col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/4] relative overflow-hidden group"
          >
            <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
              <Image
                src={images[0].src || "/placeholder.svg"}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-700" />
            <span className="absolute bottom-6 left-6 text-sm tracking-[0.3em] uppercase font-sans text-background/0 group-hover:text-background/80 transition-colors duration-700">
              {images[0].alt}
            </span>
          </div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4 md:gap-6">
            <div
              ref={(el) => (imagesRef.current[1] = el)}
              className="aspect-square relative overflow-hidden group"
            >
              <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src={images[1].src || "/placeholder.svg"}
                  alt={images[1].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-700" />
            </div>
            <div
              ref={(el) => (imagesRef.current[2] = el)}
              className="aspect-square relative overflow-hidden group"
            >
              <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src={images[2].src || "/placeholder.svg"}
                  alt={images[2].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-700" />
            </div>
          </div>

          {/* Bottom row */}
          <div
            ref={(el) => (imagesRef.current[3] = el)}
            className="col-span-12 md:col-span-8 aspect-[21/9] relative overflow-hidden group"
          >
            <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
              <Image
                src={images[3].src || "/placeholder.svg"}
                alt={images[3].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-700" />
          </div>

          <div className="col-span-6 md:col-span-4 grid grid-cols-2 gap-4 md:gap-6">
            <div
              ref={(el) => (imagesRef.current[4] = el)}
              className="aspect-square relative overflow-hidden group"
            >
              <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src={images[4].src || "/placeholder.svg"}
                  alt={images[4].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-700" />
            </div>
            <div
              ref={(el) => (imagesRef.current[5] = el)}
              className="aspect-square relative overflow-hidden group"
            >
              <div className="gallery-img absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src={images[5].src || "/placeholder.svg"}
                  alt={images[5].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
