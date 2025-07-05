import Image from "next/image";
import { useEffect, useState } from "react";
import BorrowRatioSlider from "./BorrowRatioSlider";

type BorrowRatioEditorProps = {
    baseAmount: number;
    quoteAmount: number;
    baseImg: string;
    baseSymbol: string;
    quoteImg: string;
    quoteSymbol: string;
    baseQuoteRatio: number;
    basePrice: number;
    baseIR: number;
    quoteIR: number;
    onRatioChange: (ratio: number) => void;
}

export default function BorrowRatioEditor({
    baseAmount,
    quoteAmount,
    baseImg,
    baseSymbol,
    quoteImg,
    quoteSymbol,
    baseQuoteRatio,
    basePrice,
    baseIR,
    quoteIR,
    onRatioChange
}: BorrowRatioEditorProps) {
    // Slider configuration
    const min = 0;
    const max = 100;
    const step = 1;

    // Local state for slider/input
    const [sliderValue, setSliderValue] = useState(baseQuoteRatio);

    // Keep local state in sync with prop changes
    useEffect(() => {
        setSliderValue(baseQuoteRatio);
    }, [baseQuoteRatio]);

    // Notify parent when slider/input changes
    useEffect(() => {
        onRatioChange(sliderValue);
    }, [sliderValue, onRatioChange]);

    // Calculate percentages for display
    const basePercent = 100 - sliderValue;
    const quotePercent = sliderValue;

    return (
        <div className="w-full max-w-xl mx-auto py-6">
            <div className="flex justify-center items-center mb-2">
                <span className="text-l text-neutral-400">Borrow Ratio</span>
            </div>
            {/* Tokens */}
            <div className="flex justify-between items-center w-full px-6 mb-2">
                {/* Base */}
                <div className="flex items-center gap-2">
                    <Image src={baseImg} alt={baseSymbol} width={28} height={28} className="rounded-full" />
                    <span className="text-neutral-600 text-m font-semibold">{baseSymbol}</span>
                    <span className="text-neutral-400 text-xs">{baseAmount} ({"50%"})</span>
                </div>
                {/* Quote */}
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-xs">{quoteAmount} ({"50%"})</span>
                    <span className="text-neutral-600 text-m font-semibold">{quoteSymbol}</span>
                    <Image src={quoteImg} alt={quoteSymbol} width={28} height={28} className="rounded-full" />
                </div>
            </div>
            {/* IR */}
            <div>

            </div>
            <div className="w-full px-4 flex flex-col items-center">
                {/* Slider Track & Thumb */}
                <BorrowRatioSlider
                    value={sliderValue}
                    onChange={setSliderValue}
                    min={min}
                    max={max}
                    step={step}
                />
            </div>
        </div>
    );
}