"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-neutral-700 flex justify-center pointer-events-none transition-all duration-300 ${
        scrolled ? "bg-transparent" : "bg-transparent"
      }`}
      style={{ height: scrolled ? undefined : undefined }}
    >
      <div
        className={`pointer-events-auto transition-all duration-300 flex items-center justify-between w-full
          ${scrolled
            ? "max-w-4xl mt-4 mx-4 rounded-2xl shadow-2xl bg-white/80 dark:bg-black/70 backdrop-blur-lg px-8 py-3"
            : "max-w-5xl mx-auto px-4 py-4 bg-transparent shadow-none rounded-none mt-0"
          }
        `}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/DDLogoGradient.svg" alt="DefiDolphin" width={50} height={50} className="mr-2 fill-neutral-700" />
            <span className={`font-bold font-onest text-lg transition-all duration-300 ${scrolled ? "ml-2" : "ml-0"}`}>DefiDolphin</span>
          </Link>
        </div>
        <nav className={`space-x-4 transition-all duration-300`}>
          <a href="#section1" className="hover:bg-neutral-100 rounded-md px-4 py-2">Learn</a>
          <a href="#section2" className="hover:bg-neutral-100 rounded-md px-4 py-2">Support</a>
          <a href="#section3" className="hover:bg-neutral-100 rounded-md px-4 py-2">Docs</a>
        </nav>
        <div className={`transition-all duration-300 ${scrolled ? "mr-2" : "mr-0"}`}>
          <Button variant="outline" asChild>
            <Link href="/optimize">Start Optimizing</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}