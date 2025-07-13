"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SupportSection() {
	const [usdc, setUsdc] = useState(1000);
	const [sol, setSol] = useState(10 * (99.8 / 100));
	const usdcRef = useRef<HTMLParagraphElement>(null);
	const solRef = useRef<HTMLParagraphElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Animate number transitions after state changes
	useEffect(() => {
		if (usdcRef.current && solRef.current) {
			const currentUsdc = parseInt(usdcRef.current.innerText) || 0;
			const currentSol = parseFloat(solRef.current.innerText) || 0;
			gsap.to(usdcRef.current, {
				innerText: usdc,
				startAt: { innerText: currentUsdc },
				duration: 0.8,
				snap: { innerText: 1 },
				ease: "power2.out",
				format: (v: any) => Math.round(v),
				onUpdate: function () {
					usdcRef.current!.innerText = Math.round(Number((this as any).targets()[0].innerText)).toString();
				},
			});
			gsap.to(solRef.current, {
				innerText: sol,
				startAt: { innerText: currentSol },
				duration: 0.8,
				snap: { innerText: 0.01 },
				ease: "power2.out",
				format: (v: any) => v.toFixed(2),
				onUpdate: function () {
					solRef.current!.innerText = (Number((this as any).targets()[0].innerText)).toFixed(2);
				},
			});
		}
	}, [usdc, sol]);

	// Randomize values while keeping 100:1 ratio
	const randomize = () => {
		const newSol = Math.floor(Math.random() * 90 + 1); // 1 to 90
		const newUsdc = newSol * 100;
		setUsdc(newUsdc);
		setSol(newSol * (99.8 / 100));
	};

	return (
		<div ref={containerRef} className="flex flex-col items-center justify-center gap-8 py-8 w-full h-full">
			<div className="flex flex-col items-center">
				<h2 className="text-4xl text-neutral-600 font-bold mb-4">Support Swap</h2>
				<p className="max-w-xl text-center text-neutral-400 font-semibold">This is how you can support DefiDolphin if you like the product.</p>
			</div>

			{/* Support Swap Mockup */}
			<div className="flex flex-col items-center w-full max-w-md mx-auto bg-neutral-200 px-4 py-8 mt-10 justify-center rounded-2xl gap-4 shadow-xl">
				<Image className="mb-4" src="/DDLogoGradient.svg" alt="Support Swap" width={50} height={50} />
				{/* USDC TOKEN */}
				<div className="flex w-full p-4 rounded-xl flex-row bg-neutral-300 items-center justify-between cursor-pointer hover:bg-neutral-400 transition-colors" onClick={randomize}>
					<div className="flex bg-neutral-200 p-2 rounded-lg items-center gap-4">
						<Image className="rounded-full" src="/usdc.png" alt="USDC" width={28} height={28} />
						<p className="text-neutral-500 font-semibold">USDC</p>
					</div>
					<p ref={usdcRef} className="text-neutral-500 text-2xl font-bold" />
				</div>
				<div className="flex flex-col bg-neutral-400 rounded-full p-2 items-center">
					<Image src="/swap.svg" className="rotate-90" alt="Swap" width={20} height={20} />
				</div>
				{/* SOL TOKEN */}
				<div className="flex flex-row w-full p-4 rounded-xl bg-neutral-300 items-center justify-between cursor-pointer hover:bg-neutral-400 transition-colors" onClick={randomize}>
					<div className="flex bg-neutral-200 p-2 rounded-lg items-center gap-4">
						<Image className="rounded-full" src="/sol.png" alt="SOL" width={28} height={28} />
						<p className="text-neutral-500 font-semibold pr-3">SOL</p>
					</div>
					<p ref={solRef} className="text-neutral-500 text-2xl font-bold" />
				</div>
				<div className="flex flex-col items-end w-full px-2">
					<p className="text-neutral-400 text-sm font-semibold">0.2% fee</p>
				</div>
			</div>

			{/* Link to swap */}
			<div className="flex flex-col items-center mt-8">
				<Link href="/swap" className="w-full">
					<Button variant="outline" size="lg" className="w-full h-14 bg-neutral-100 hover:bg-neutral-200 hover:text-neutral-500 text-lg font-bold text-neutral-600">
						Support Now
					</Button>
				</Link>
			</div>
		</div>
	);
}