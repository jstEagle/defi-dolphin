"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export type PositionTypeSliderProps = {
  value: number // 0 to 1
  token?: string // e.g. "SOL"
}

// Helper to interpolate between two colors (red to green)
function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ] as [number, number, number]
}

function rgbToString(rgb: [number, number, number]): string {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

const PositionTypeSlider = ({ value, token = "X" }: PositionTypeSliderProps) => {
  // Clamp value between 0 and 1
  const clamped = Math.max(0, Math.min(1, value))
  // Red (0) to Green (1)
  const color = rgbToString(lerpColor([153, 69, 255], [20, 241, 149], clamped))
  const percent = Math.max(20, Math.min(80, clamped * 100))

  // Determine position type label
  let positionLabel = "Neutral"
  if (clamped >= 0.9) {
    positionLabel = "Full Long"
  } else if (clamped > 0.6) {
    positionLabel = "Semi-Long"
  } else if (clamped <= 0.1) {
    positionLabel = "Full Short"
  } else if (clamped < 0.4) {
    positionLabel = "Semi-Short"
  }

  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        xPercent: percent - 50, // since left is percent, and we use translate(-50%, -50%)
        backgroundColor: color,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)" // springy snap effect
      })
    }
  }, [percent, color])

  return (
    <div>
        <div className="flex justify-center items-center">
            <span className="text-l text-neutral-400 mb-2">Position Type</span>
        </div>
        <div className="flex items-center w-full gap-4 px-4 font-inter">
        {/* 0 label on left */}
        <span className="text-muted-foreground font-medium text-base min-w-[2.5rem] text-left select-none">0</span>
        {/* Bar with moving pill */}
        <div className="relative flex-1 min-w-0 h-8 flex items-center">
            {/* Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full" />
            {/* Pill */}
            <div
            className="absolute w-fit top-1/2 z-10"
            style={{
                left: `calc(${percent}%)`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                width: "auto"
            }}
            >
            <div
                ref={pillRef}
                className={cn(
                "flex items-center px-2 py-1 rounded-full shadow font-semibold text-white text-base border border-white select-none transition-colors",
                )}
                style={{ background: color }}
            >
                <span className="mr-2 w-fit truncate">{`${token} ${positionLabel}`}</span>
                <span className="font-semibold text-m rounded-full px-2 bg-neutral-100 text-neutral-600">{clamped.toFixed(2)}</span>
            </div>
            </div>
        </div>
        {/* 1.0 label on right */}
        <span className="text-muted-foreground font-medium text-base min-w-[2.5rem] text-right select-none">1.0</span>
        </div>
    </div>
  )
}

export default React.memo(PositionTypeSlider);
