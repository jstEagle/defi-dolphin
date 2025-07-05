import React from "react";

const socialLinks = [
  {
    href: "https://github.com/", // Replace with your GitHub
    label: "GitHub",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/", // Replace with your LinkedIn
    label: "LinkedIn",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://discord.com/", // Replace with your Discord
    label: "Discord",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform">
        <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 0 0-.073.035c-.211.375-.444.864-.608 1.249a18.524 18.524 0 0 0-5.487 0 12.51 12.51 0 0 0-.617-1.249.07.07 0 0 0-.073-.035A19.736 19.736 0 0 0 3.677 4.369a.064.064 0 0 0-.03.027C.533 9.09-.32 13.604.099 18.057a.08.08 0 0 0 .028.056c2.052 1.507 4.042 2.422 5.993 3.029a.07.07 0 0 0 .076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 0 0-.038-.098c-.652-.247-1.27-.548-1.872-.892a.07.07 0 0 1-.007-.117c.126-.094.252-.192.372-.291a.07.07 0 0 1 .073-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 0 1 .074.009c.12.099.246.197.372.291a.07.07 0 0 1-.006.117 12.298 12.298 0 0 1-1.873.892.07.07 0 0 0-.037.099c.36.699.772 1.364 1.225 1.994a.07.07 0 0 0 .076.028c1.961-.607 3.951-1.522 6.003-3.029a.07.07 0 0 0 .028-.055c.5-5.177-.838-9.653-3.548-13.661a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://x.com/", // Replace with your X/Twitter
    label: "X",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform">
        <path d="M17.53 2.47a.75.75 0 0 1 1.06 1.06l-5.47 5.47 5.47 5.47a.75.75 0 0 1-1.06 1.06l-5.47-5.47-5.47 5.47a.75.75 0 0 1-1.06-1.06l5.47-5.47-5.47-5.47A.75.75 0 0 1 6.59 2.47l5.47 5.47 5.47-5.47z" fill="currentColor"/>
      </svg>
    ),
  },
];

// Accept className as a prop
export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`w-full z-40 text-neutral-700 flex flex-col items-center pointer-events-none transition-all duration-300 select-none overflow-hidden relative ${className}`} style={{height: '180px'}}>
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 select-none pointer-events-none w-full flex justify-center items-end" style={{height: '180px', overflow: 'hidden'}}>
        <span
          className="hidden md:block absolute left-1/2 -z-10 -translate-x-1/2 translate-y-1/4 text-center text-[180px] font-bold leading-none before:bg-gradient-to-b before:from-neutral-200 before:to-neutral-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['DefiDolphin'] after:absolute after:inset-0 after:bg-neutral-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['DefiDolphin'] after:[text-shadow:0_1px_0_white] font-onest pointer-events-none select-none"
          aria-hidden="true"
        ></span>
      </div>
    </footer>
  );
}
