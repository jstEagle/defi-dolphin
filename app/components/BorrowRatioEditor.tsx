import Image from "next/image";
import { useMemo } from "react";
import BorrowRatioSlider from "./BorrowRatioSlider";
import { roundNumberToDecimals } from "../helper";
import React from "react";
import { usePosition } from "@/lib/context/PositionContext";

const BorrowRatioEditor = () => {
    const { assets, state, setBorrowRatio, derived } = usePosition();
    // Slider configuration
    const min = 0;
    const max = 100;
    const step = 1;

    const {
        baseBorrowUnits,
        quoteBorrowUnits,
        baseBorrowQuote,
        quoteBorrowQuote,
    } = useMemo(() => {
        const borrowAmount = derived.borrowAmount;
        const ratio = state.borrowRatio;
        const safePrice =
            assets.basePrice > 0 && isFinite(assets.basePrice)
                ? assets.basePrice
                : 1;
        const frac = Math.max(0, Math.min(100, ratio)) / 100;
        const baseUnits = (borrowAmount * (1 - frac)) / safePrice;
        const quoteUnits = borrowAmount * frac;
        return {
            baseBorrowUnits: roundNumberToDecimals(baseUnits, 4),
            quoteBorrowUnits: roundNumberToDecimals(quoteUnits, 4),
            baseBorrowQuote: roundNumberToDecimals(
                borrowAmount * (1 - frac),
                2
            ),
            quoteBorrowQuote: roundNumberToDecimals(borrowAmount * frac, 2),
        };
    }, [derived.borrowAmount, state.borrowRatio, assets.basePrice]);

    // Notify parent when slider/input changes
    // Only call onRatioChange when the slider changes
    const handleSliderChange = (val: number) => {
        setBorrowRatio(val);
    };

    return (
        <div className="w-full max-w-xl mx-auto py-6">
            <div className="flex justify-center items-center mb-2">
                <span className="text-l text-neutral-400">Borrow Ratio</span>
            </div>
            {/* Tokens */}
            <div className="flex justify-between items-center w-full px-6 mb-2">
                {/* Base */}
                <div className="flex items-center gap-2">
                    <Image
                        src={assets.baseImg}
                        alt={assets.baseSymbol}
                        width={28}
                        height={28}
                        className="rounded-full"
                    />
                    <span className="text-neutral-600 text-m font-semibold">
                        {assets.baseSymbol}
                    </span>
                    <span className="text-neutral-400 text-xs">
                        ${baseBorrowQuote} ({baseBorrowUnits}{" "}
                        {assets.baseSymbol}) ({100 - state.borrowRatio}%)
                    </span>
                </div>
                {/* Quote */}
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-xs">
                        ${quoteBorrowQuote} ({quoteBorrowUnits}{" "}
                        {assets.quoteSymbol}) ({state.borrowRatio}%)
                    </span>
                    <span className="text-neutral-600 text-m font-semibold">
                        {assets.quoteSymbol}
                    </span>
                    <Image
                        src={assets.quoteImg}
                        alt={assets.quoteSymbol}
                        width={28}
                        height={28}
                        className="rounded-full"
                    />
                </div>
            </div>
            {/* IR */}
            <div></div>
            <div className="w-full px-4 flex flex-col items-center">
                {/* Slider Track & Thumb */}
                <BorrowRatioSlider
                    value={state.borrowRatio}
                    onChange={handleSliderChange}
                    min={min}
                    max={max}
                    step={step}
                />
            </div>
        </div>
    );
};

export default React.memo(BorrowRatioEditor);
