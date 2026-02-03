"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function DiaHeader() {
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

  return (
    <>
      <header
        ref={headerRef}
        className="py-5 md:py-6 top-0 left-0 right-0 z-50 transition-all duration-700"
      >
        <div className="w-[90%] md:w-[95%] mx-auto flex items-center justify-center">
          {/* Logo */}
          <Link href="/" className="relative z-[60]">
            <Image
              src="/images/logo.png"
              alt="Ana Cris Ormaza"
              width={220}
              height={88}
              className="brightness-0 invert"
              priority
            />
          </Link>
        </div>
      </header>
    </>
  );
}
