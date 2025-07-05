"use client"

import { createSwapy } from 'swapy'
import { useEffect, useRef } from 'react'
import Header from '../MainHeader'

import LeverageSlider from '../components/LeverageSlider'
import PositionTypeSlider from '../components/PositionTypeSlider'
import CollateralEditor from '../components/CollateralEditor'
import BorrowRatioEditor from '../components/BorrowRatioEditor'

export default function Optimize() {
  const swapy = useRef<any | null>(null)
  const swapyArea = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Only initialize Swapy on the center containers (A and B)
    if (swapyArea.current) {
      swapy.current = createSwapy(swapyArea.current)
      swapy.current.onSwap((event: any) => {
        console.log('swap', event);
      })
    }
    return () => {
      swapy.current?.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen h-screen bg-slate-50 flex flex-col">
    <Header />
    <div className="min-h-screen h-screen bg-slate-50 flex flex-col pt-12">
      {/* Header */}
      {/* Main Content Layout */}
      <div className="flex flex-1 w-full h-0 min-h-0 box-border overflow-hidden">
        {/* Left Sidebar (about 1/5 width) */}
        <div className="flex flex-col gap-2 items-center flex-[1_1_0%] px-2 py-8 h-full">
            <div className="border-2 border-neutral-300 bg-neutral-50 rounded-xl w-full h-full text-center flex flex-col items-center gap-6">
                <div className="w-full py-2">
                    <div className="text-neutral-600 font-semibold text-m">Configure Position</div>
                </div>
                <div className="w-full py-2">
                    <CollateralEditor baseSymbol="SOL" quoteSymbol="USDC" baseImg="/sol.png" quoteImg="/usdc.png" baseAmount={1000} quoteAmount={1000} onBaseAmountChange={() => {}} onQuoteAmountChange={() => {}} />
                </div>
                <div className="w-full py-2">
                    <PositionTypeSlider value={0.4} token="SOL" />
                </div>
                <div className="w-full py-2">
                    <LeverageSlider value={1} onChange={() => {}} min={1} max={5} step={0.1} />
                </div>
                <div className="w-full py-2">
                    <BorrowRatioEditor baseAmount={1000} quoteAmount={1000} baseQuoteRatio={50} basePrice={100} baseImg="/sol.png" baseSymbol="SOL" quoteImg="/usdc.png" quoteSymbol="USDC" baseIR={0.01} quoteIR={0.01} onRatioChange={() => {}} />
                </div>
            </div>
        </div>
        {/* Swapy Area (center only) */}
        <div ref={swapyArea} className="flex flex-[2_2_0%] gap-2 justify-center items-stretch px-0 py-8 h-full min-h-0">
          {/* Center: two stacked swapy slots */}
          <div className="flex flex-col gap-2 flex-1 h-full min-h-0">
            <div data-swapy-slot="a" className="bg-orange-50 border-2 border-orange-300 rounded-2xl flex-1 flex flex-col items-center justify-center text-2xl font-bold shadow-md min-h-0 w-full">
              <div data-swapy-item="a" className="bg-white rounded-xl w-full text-center h-full flex items-center justify-center">
                <div>A</div>
              </div>
            </div>
            <div data-swapy-slot="b" className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex-1 flex flex-col items-center justify-center text-2xl font-bold shadow-md min-h-0 w-full">
              <div data-swapy-item="b" className="bg-white  rounded-xl w-full text-center h-full flex items-center justify-center">
                <div>B</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Bar (not swappable) */}
        <div className="flex flex-col flex-[1_1_0%] justify-center h-full min-h-0 px-2 py-8">
          <div className="bg-pink-50 border-2 border-pink-300 rounded-2xl flex-1 flex flex-col items-center justify-center text-2xl font-bold shadow-md min-h-0 w-full">
            <div className="bg-white rounded-xl w-full text-center h-full flex items-center justify-center">
              <div>C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}