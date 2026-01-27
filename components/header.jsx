"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { getSmoother } from "./smooth-scroll";

export default function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        duration: 0.8,
        ease: "power4.inOut",
      });

      menuItemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.3 + i * 0.1,
              ease: "power3.out",
            },
          );
        }
      });
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Misión", href: "#mision" },
    { label: "Productos", href: "#productos" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      const smoother = getSmoother();
      if (smoother) {
        smoother.scrollTo(href, true, "top top");
      } else {
        const el = document.querySelector(href);
        if (el) {
          window.scrollTo({
            top: el.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }, 600);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isOpen
            ? "py-5 md:py-6 bg-transparent"
            : isScrolled
              ? "py-3 bg-background/90 backdrop-blur-md shadow-sm"
              : "py-5 md:py-6"
        }`}
      >
        <div className="w-[90%] md:w-[95%] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, "#inicio")}
            className="relative z-[60]"
          >
            <Image
              src="/images/logo.png"
              alt="Ana Cris Ormaza"
              width={isScrolled && !isOpen ? 140 : 220}
              height={isScrolled && !isOpen ? 56 : 88}
              className={`transition-all duration-500 ${isOpen || !isScrolled ? "brightness-0 invert opacity-0" : ""}`}
              priority
            />
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[60] w-12 h-12 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-4">
              <span
                className={`absolute left-0 w-full h-[1.5px] transition-all duration-500 ease-out ${
                  isOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45 bg-white"
                    : isScrolled
                      ? "top-0 bg-primary"
                      : "top-0 bg-white"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] transition-all duration-300 ${
                  isOpen
                    ? "opacity-0 scale-x-0 bg-white"
                    : isScrolled
                      ? "opacity-100 bg-primary"
                      : "opacity-100 bg-white"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[1.5px] transition-all duration-500 ease-out ${
                  isOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45 bg-white"
                    : isScrolled
                      ? "bottom-0 bg-primary"
                      : "bottom-0 bg-white"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <nav
        ref={menuRef}
        className="fixed inset-0 z-40 bg-primary flex items-center justify-center"
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        <ul className="flex flex-col items-center gap-0 md:gap-1">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              className="overflow-hidden"
              style={{ opacity: 0 }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative block text-4xl lg:text-5xl font-serif text-white uppercase tracking-tight overflow-hidden"
                style={{ lineHeight: 1.1, height: "1.1em" }}
              >
                <span
                  className="relative inline-block transition-transform duration-500 group-hover:-translate-y-full"
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1em" }}
                >
                  {item.label}
                </span>
                <span
                  className="absolute left-0 inline-block transition-transform duration-500 group-hover:-translate-y-full text-white/50"
                  style={{ top: "100%" }}
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Menu footer */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 w-[90%] md:w-[95%] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm md:text-base">
          <span className="tracking-widest uppercase font-sans text-base md:text-lg">
            Selfcare & Motherhood
          </span>
          <div className="flex gap-8 font-sans text-sm md:text-base">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              className="hover:text-white transition-colors"
            >
              Contacto
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
