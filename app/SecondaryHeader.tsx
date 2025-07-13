
"use client";

import Link from "next/link";

export default function SecondaryHeader() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 text-neutral-700 flex justify-start bg-transparent shadow-none pointer-events-none transition-all duration-300"
    >
      <div className="pointer-events-auto flex items-center justify-start w-full max-w-full px-8 py-4">
        <Link href="/" className="flex items-center mr-6">
          <img src="/DDLogoGradient.svg" alt="DefiDolphin" width={50} height={50} className="mr-2 fill-neutral-700" />
          <span className="font-bold font-onest text-lg ml-2">DefiDolphin</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <a href="#section1" className="hover:bg-neutral-100 rounded-md px-4 py-2">Learn</a>
          <a href="#section2" className="hover:bg-neutral-100 rounded-md px-4 py-2">Support</a>
          <a href="#section3" className="hover:bg-neutral-100 rounded-md px-4 py-2">Docs</a>
        </nav>
      </div>
    </header>
  );
}