"use client";

import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { usePosition } from "@/lib/context/PositionContext";

const LeverageSlider = () => {
    const { state, setLeverage } = usePosition();
    const min = 1;
    const max = 5;
    const step = 0.1;

    const [sliderValue, setSliderValue] = useState(state.leverage);
    const [inputText, setInputText] = useState<string>(
        state.leverage.toString()
    );

    useEffect(() => {
        setSliderValue(state.leverage);
        setInputText(state.leverage.toString());
    }, [state.leverage]);

    useEffect(() => {
        setLeverage(sliderValue);
    }, [sliderValue, setLeverage]);

    const markCount = 5;
    const marks = Array.from({ length: markCount }, (_, i) => {
        if (i === 0) return min;
        if (i === markCount - 1) return max;
        return min + ((max - min) * i) / (markCount - 1);
    });

    function formatMark(val: number) {
        return Number.isInteger(val) ? val.toString() : val.toFixed(1);
    }

    return (
        <div className="flex items-center gap-4 w-full px-4 font-inter">
            <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2">
                    <span className="text-muted-foreground font-medium text-base">
                        Leverage:{" "}
                    </span>
                    <span className="text-neutral-600 font-semibold text-m ml-1">
                        {sliderValue.toFixed(1)}x
                    </span>
                    <span
                        className="ml-2 text-muted-foreground text-sm cursor-pointer"
                        title="Leverage multiplies your exposure."
                    ></span>
                </div>
                <div className="w-full">
                    <Slider
                        value={[sliderValue]}
                        onValueChange={(value) => {
                            const next = value[0];
                            setSliderValue(next);
                            setInputText(next.toString());
                        }}
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
                <div className="relative w-20">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={inputText}
                        onChange={(e) => {
                            const raw = e.target.value;
                            setInputText(raw);
                            if (
                                raw === "" ||
                                raw === "-" ||
                                raw === "." ||
                                raw === "-."
                            ) {
                                return;
                            }
                            let parsed = Number(raw);
                            if (!isFinite(parsed)) return;
                            if (parsed < min) parsed = min;
                            if (parsed > max) parsed = max;
                            setSliderValue(parsed);
                        }}
                        onBlur={() => {
                            let parsed = Number(inputText);
                            if (!isFinite(parsed)) parsed = sliderValue;
                            if (parsed < min) parsed = min;
                            if (parsed > max) parsed = max;
                            setSliderValue(parsed);
                            setInputText(parsed.toString());
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                let parsed = Number(inputText);
                                if (!isFinite(parsed)) parsed = sliderValue;
                                if (parsed < min) parsed = min;
                                if (parsed > max) parsed = max;
                                setSliderValue(parsed);
                                setInputText(parsed.toString());
                            }
                        }}
                        className="w-20 px-2 py-1 pr-5 rounded-lg border border-neutral-200 bg-white text-neutral-700 font-semibold text-lg text-center focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 font-semibold text-base pointer-events-none select-none">
                        x
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(LeverageSlider);
