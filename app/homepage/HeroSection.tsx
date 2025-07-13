import Link from "next/link";
import WaveAnimation from "../components/WaveAnimation";

export default function HeroSection() {
  return (
    <div>
        <h1 className="text-4xl sm:text-5xl text-neutral-600 font-bold mb-4 text-center hero-animate">Don't get eaten by the</h1>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent hero-animate"
            style={{
                backgroundImage: 'linear-gradient(to right, #7eb1d7, #6dc7b6)',
            }}
        >Sharks</h1>
        <p className="max-w-2xl text-center text-lg text-neutral-500 mb-2 hero-animate">Get the most out of your <Link href="https://defituna.com/" target="_blank" className="text-neutral-500 hover:text-neutral-400 font-semibold">DefiTuna</Link> positions.</p>
        {/* Insert animated waves at the bottom of the hero section */}
        <div className="flex w-full h-80 pointer-events-none select-none justify-center items-center">
            <WaveAnimation />
        </div>
    </div>
  )
}