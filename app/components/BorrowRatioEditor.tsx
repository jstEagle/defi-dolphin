import Image from "next/image";
import { useEffect, useState } from "react";
import BorrowRatioSlider from "./BorrowRatioSlider";
import { roundNumberToDecimals } from "../helper";
import React from "react";

type BorrowRatioEditorProps = {
	baseImg: string;
	baseSymbol: string;
	quoteImg: string;
	quoteSymbol: string;
	borrowAmount: number;
	basePrice: number;
	baseIR: number;
	quoteIR: number;
	onRatioChange: (ratio: number) => void;
	ratio: number; // Add this line
}

const BorrowRatioEditor = ({
	baseImg,
	baseSymbol,
	quoteImg,
	quoteSymbol,
	borrowAmount,
	basePrice,
	baseIR,
	quoteIR,
	onRatioChange,
	ratio // Add this line
}: BorrowRatioEditorProps) => {
	// Slider configuration
	const min = 0;
	const max = 100;
	const step = 1;

	const [baseAmount, setBaseAmount] = useState(roundNumberToDecimals((borrowAmount / (100 / (100 - ratio))) / basePrice, 4));
	const [quoteAmount, setQuoteAmount] = useState(roundNumberToDecimals((borrowAmount / (100 / ratio)), 4));

	// Keep local state in sync with prop changes
	useEffect(() => {
		setBaseAmount(roundNumberToDecimals((borrowAmount / (100 / (100 - ratio))) / basePrice, 4));
		setQuoteAmount(roundNumberToDecimals((borrowAmount / (100 / ratio)), 4));
	}, [ratio, borrowAmount, basePrice]);

	// Notify parent when slider/input changes
	// Only call onRatioChange when the slider changes
	const handleSliderChange = (val: number) => {
		onRatioChange(val);
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
					<Image src={baseImg} alt={baseSymbol} width={28} height={28} className="rounded-full" />
					<span className="text-neutral-600 text-m font-semibold">{baseSymbol}</span>
					<span className="text-neutral-400 text-xs">{baseAmount} ({100-ratio}%)</span>
				</div>
				{/* Quote */}
				<div className="flex items-center gap-2">
					<span className="text-neutral-400 text-xs">{quoteAmount} ({ratio}%)</span>
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
					value={ratio}
					onChange={handleSliderChange}
					min={min}
					max={max}
					step={step}
				/>
			</div>
		</div>
	);
}

export default React.memo(BorrowRatioEditor);