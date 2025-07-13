import Image from "next/image"
import React, { useEffect, useState } from "react"

type CollateralEditorProps = {
    baseSymbol: string
    quoteSymbol: string
    baseImg: string
    quoteImg: string
    onBaseAmountChange: (amount: number) => void
    onQuoteAmountChange: (amount: number) => void
}

const CollateralEditor = ({ baseSymbol, quoteSymbol, baseImg, quoteImg, onBaseAmountChange, onQuoteAmountChange }: CollateralEditorProps) => {
    const [baseAmount, setBaseAmount] = useState(0);
    const [quoteAmount, setQuoteAmount] = useState(0);

    useEffect(() => {
        onBaseAmountChange(baseAmount);
        onQuoteAmountChange(quoteAmount);
    }, [baseAmount, quoteAmount, onBaseAmountChange, onQuoteAmountChange]);

    return (
        <div>
        <div className="flex justify-center items-center">
            <span className="text-l text-neutral-400">Collateral</span>
        </div>
        <div className="flex gap-6 justify-between items-center w-full px-6">
            {/* Base Asset Box */}
            <div className="flex flex-col items-start">
                <span className="text-xs pl-2 text-neutral-400">{baseSymbol}</span>
                <div className="flex border border-neutral-200 items-center rounded-lg pl-2 py-2 min-w-[140px] hover:bg-neutral-200 transition-colors duration-100">
                    <Image src={baseImg} alt={baseSymbol} width={28} height={28} className="mr-3 rounded-full" />
                    <input
                        type="number"
                        className="bg-transparent outline-none text-neutral-600 text-lg w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={baseAmount}
                        min={0}
                        onChange={e => setBaseAmount(Number(e.target.value))}
                    />
                </div>
            </div>
            {/* Quote Asset Box */}
            <div className="flex flex-col items-start">
                <span className="text-xs pl-2 text-neutral-400">{quoteSymbol}</span>
                <div className="flex border border-neutral-200 items-center rounded-lg pl-2 py-2 min-w-[140px] hover:bg-neutral-200 transition-colors duration-100">
                    <Image src={quoteImg} alt={quoteSymbol} width={28} height={28} className="mr-3" />
                    <input
                        type="number"
                        className="bg-transparent outline-none text-neutral-600 text-lg w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={quoteAmount}
                        min={0}
                        onChange={e => setQuoteAmount(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
        </div>
    )
}

export default React.memo(CollateralEditor);