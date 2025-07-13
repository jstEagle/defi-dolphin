"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import MainHeader from "./MainHeader";
import Footer from "./Footer";
import HeroSection from "./homepage/HeroSection";
import InfoSection from "./homepage/InfoSection";
import SupportSection from "./homepage/SupportSection";
import AboutSection from "./homepage/AboutSection";

gsap.registerPlugin(useGSAP);

export default function Home() {
	const heroRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Animate hero text
		if (heroRef.current) {
			gsap.fromTo(
				heroRef.current.querySelectorAll(".hero-animate"),
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
			);
		}
		// Animate cards
		if (cardsRef.current) {
			gsap.fromTo(
				cardsRef.current.querySelectorAll(".card-animate"),
				{ opacity: 0, y: 60 },
				{ opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: "power3.out" }
			);
		}
	}, []);

	return (
		<div className="flex flex-col min-h-screen pt-6 gap-8 sm:pt-20 font-[family-name:var(--font-geist-sans)] items-center">
			<MainHeader />
			{/* Hero Section */}
			<section ref={heroRef} className="w-full font-inter flex flex-col justify-center items-center bg-neutral-100 rounded-4xl mt-12 px-6 py-6 sm:py-16 max-w-5xl relative overflow-hidden">
				<HeroSection />
			</section>
			<main ref={cardsRef} className="flex flex-col gap-[32px] items-center sm:items-start w-full max-w-5xl mx-auto flex-1">
				{/* Scrollable Sections */}
				<section id="section1" className="w-full min-h-[80vh] font-inter flex flex-col pt-24 items-center bg-gradient-to-b from-neutral-900  to-sky-900 rounded-4xl mb-12 card-animate">
					<InfoSection />
				</section>
				<section id="section2" className="w-full min-h-[80vh] flex flex-col pt-12 items-center bg-neutral-100 rounded-4xl mb-12 card-animate">
					<SupportSection />
				</section>
				<section id="section3" className="w-full min-h-[80vh] flex flex-col pt-12 items-center bg-neutral-100 rounded-4xl mb-12 card-animate">
					<AboutSection />
				</section>
			</main>
			<Footer className="w-full py-6 rounded-lg text-center text-gray-600" />
		</div>
	);
}
