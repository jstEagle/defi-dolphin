"use client"

import { createSwapy } from 'swapy'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import SecondaryHeader from '../SecondaryHeader'

import LeverageSlider from '../components/LeverageSlider'
import PositionTypeSlider from '../components/PositionTypeSlider'
import CollateralEditor from '../components/CollateralEditor'
import BorrowRatioEditor from '../components/BorrowRatioEditor'

export default function Optimize() {
	const swapy = useRef<any | null>(null)
	const swapyArea = useRef<HTMLDivElement | null>(null)

	const [basePrice, setBasePrice] = useState(-1);
	const [quotePrice, setQuotePrice] = useState(-1);

	const claculatePositionExposure = (
		leverage: number,
		borrowRatio: number
	): number => {
		return 1 - ((leverage - 1) * (1 - borrowRatio)) / leverage;
	}

	useEffect(() => {
		fetch("https://api.defituna.com/api/v1/oracle-prices/So11111111111111111111111111111111111111112")
			.then(res => res.json())
			.then(data => {
				const price = data.data.price / 10 ** data.data.decimals;
				setBasePrice(price);
				console.log('Fetched basePrice:', price);
			})
			.catch(err => {
				console.error(err);
			});

		fetch("https://api.defituna.com/api/v1/oracle-prices/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
			.then(res => res.json())
			.then(data => {
				const price = data.data.price / 10 ** data.data.decimals;
				setQuotePrice(price);
				console.log('Fetched quotePrice:', price);
			})
			.catch(err => {
				console.error(err);
			});

	}, [])

	// Optional: Log state changes for debugging
	useEffect(() => {
		if (basePrice !== -1) {
			console.log('basePrice state updated:', basePrice);
		}
	}, [basePrice]);

	useEffect(() => {
		if (quotePrice !== -1) {
			console.log('quotePrice state updated:', quotePrice);
		}
	}, [quotePrice]);

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

	const [exposure, setExposure] = useState(0.5);
	const [leverage, setLeverage] = useState(1);
	const [borrowRatio, setBorrowRatio] = useState(50); // New state for borrow ratio

	const [baseAmount, setBaseAmount] = useState(0);
	const [quoteAmount, setQuoteAmount] = useState(0);

	const borrowAmount = useMemo(() => baseAmount * basePrice + quoteAmount * (leverage - 1), [baseAmount, basePrice, quoteAmount, leverage]);

	const handleBaseAmountChange = useCallback((value: number) => setBaseAmount(value), []);
	const handleQuoteAmountChange = useCallback((value: number) => setQuoteAmount(value), []);
	const handleLeverageChange = useCallback((value: number) => setLeverage(value), []);
	const handleBorrowRatioChange = useCallback((value: number) => setBorrowRatio(value), []);

	// Recalculate exposure whenever leverage or borrowRatio changes
	useEffect(() => {
		setExposure(claculatePositionExposure(leverage, borrowRatio / 100));
	}, [leverage, borrowRatio]);

	return (
		<div className="min-h-screen h-screen bg-slate-50 flex flex-col">
			<SecondaryHeader />
			<div className="min-h-screen h-screen flex flex-col pt-12">
				{/* Header */}
				{/* Main Content Layout */}
				<div className="flex flex-1 w-full h-0 min-h-0 box-border overflow-hidden">
					{/* Left Sidebar (about 1/5 width) */}
					<div className="flex flex-col gap-2 items-center flex-[1_1_0%] px-2 py-8 h-full">
						<div className="bg-neutral-100 rounded-xl w-full h-full text-center flex flex-col items-center gap-6">
							<div className="w-full py-2">
								<div className="text-neutral-600 font-semibold text-m">Configure Position</div>
							</div>
							<div className="w-full py-2">
								<CollateralEditor baseSymbol="SOL" quoteSymbol="USDC" baseImg="/sol.png" quoteImg="/usdc.png" onBaseAmountChange={handleBaseAmountChange} onQuoteAmountChange={handleQuoteAmountChange} />
							</div>
							<div className="w-full py-2">
								<PositionTypeSlider value={exposure} token="SOL" />
							</div>
							<div className="w-full py-2">
								<LeverageSlider value={leverage} onChange={handleLeverageChange} min={1} max={5} step={0.1} />
							</div>
							<div className="w-full py-2">
								<BorrowRatioEditor
									borrowAmount={borrowAmount}
									basePrice={basePrice}
									baseImg="/sol.png"
									baseSymbol="SOL"
									quoteImg="/usdc.png"
									quoteSymbol="USDC"
									baseIR={0.01}
									quoteIR={0.01}
									onRatioChange={handleBorrowRatioChange}
									ratio={borrowRatio} // Pass as controlled prop
								/>
							</div>
						</div>
					</div>
					{/* Swapy Area (center only) */}
					<div ref={swapyArea} className="flex flex-[2_2_0%] gap-2 justify-center items-stretch px-0 py-8 h-full min-h-0">
						{/* Center: two stacked swapy slots */}
						<div className="flex flex-col gap-2 flex-1 h-full min-h-0">
							<div data-swapy-slot="a" className="bg-blue-200 rounded-2xl flex-1 flex flex-col items-center justify-center text-2xl font-bold min-h-0 w-full">
								<div data-swapy-item="a" className="bg-neutral-100 rounded-xl w-full text-center h-full flex items-center justify-center">
									<div>A</div>
								</div>
							</div>
							<div data-swapy-slot="b" className="bg-sky-200 rounded-2xl flex-1 flex flex-col items-center justify-center text-2xl font-bold min-h-0 w-full">
								<div data-swapy-item="b" className="bg-neutral-100  rounded-xl w-full text-center h-full flex items-center justify-center">
									<div>B</div>
								</div>
							</div>
						</div>
					</div>
					{/* Right Bar (not swappable) */}
					<div className="flex flex-col flex-[1_1_0%] justify-center h-full min-h-0 px-2 py-8">
						<div className="bg-neutral-100 rounded-2xl flex-1 flex flex-col items-center justify-center text-2xl font-bold min-h-0 w-full">
							<div className="bg-neutral-100 rounded-xl w-full text-center h-full flex items-center justify-center">
								<div>C</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}