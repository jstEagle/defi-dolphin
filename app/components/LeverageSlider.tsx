"use client"

import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react";
import React from "react";

type LeverageSliderProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
}

const LeverageSlider = ({ value, onChange, min, max, step }: LeverageSliderProps) => {
    const [sliderValue, setSliderValue] = useState(value);

    useEffect(() => {
        setSliderValue(value);
    }, [value]);

    useEffect(() => {
        onChange(sliderValue);
    }, [sliderValue]);

    // Show only 5 evenly spaced marks: min, 1/4, 1/2, 3/4, max
    const markCount = 5;
    const marks = Array.from({ length: markCount }, (_, i) => {
        if (i === 0) return min;
        if (i === markCount - 1) return max;
        return min + ((max - min) * i) / (markCount - 1);
    });

    function formatMark(val: number) {
        // Show no decimals if integer, else one decimal
        return Number.isInteger(val) ? val.toString() : val.toFixed(1);
    }

    return (
        <div className="flex items-center gap-4 w-full px-4 font-inter">
            <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2">
                    <span className="text-muted-foreground font-medium text-base">Leverage: </span>
                    <span className="text-neutral-600 font-semibold text-m ml-1">{sliderValue.toFixed(1)}x</span>
                    <span className="ml-2 text-muted-foreground text-sm cursor-pointer" title="Leverage multiplies your exposure.">
                    </span>
                </div>
                <div className="w-full">
                    <Slider
                        value={[sliderValue]}
                        onValueChange={(value) => setSliderValue(value[0])}
                        min={min}
                        max={max}
                        step={step}
                        className="w-full"
                    />
                </div>
                <div className="flex justify-between mt-2 w-full overflow-x-hidden">
                    {marks.map((mark, idx) => (
                        <span
                            key={idx}
                            className={
                                (mark <= sliderValue
                                    ? "text-neutral-600 font-bold"
                                    : "text-muted-foreground font-medium") +
                                " text-base min-w-[24px] text-center truncate"
                            }
                        >
                            {formatMark(mark)}x
                        </span>
                    ))}
                </div>
            </div>
            <div className="ml-2 flex items-center">
                <div className="relative w-16">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={sliderValue}
                        onChange={e => {
                            let val = Number(e.target.value);
                            if (isNaN(val)) val = min;
                            if (val < min) val = min;
                            if (val > max) val = max;
                            setSliderValue(val);
                        }}
                        className="w-16 px-2 py-1 pr-5 rounded-lg border-none bg-sky-400 text-neutral-100 font-semibold text-lg text-center focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-100 font-semibold text-lg pointer-events-none select-none">x</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(LeverageSlider);