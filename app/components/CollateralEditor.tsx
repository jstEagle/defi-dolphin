import Image from "next/image";
import React, { useState } from "react";
import { usePosition } from "@/lib/context/PositionContext";

const CollateralEditor = () => {
    const { assets, state, setBaseAmount, setQuoteAmount } = usePosition();
    const [baseAmountLocal, setBaseAmountLocal] = useState(state.baseAmount);
    const [quoteAmountLocal, setQuoteAmountLocal] = useState(state.quoteAmount);

    return (
        <div>
            <div className="flex justify-center items-center">
                <span className="text-l text-neutral-400">Collateral</span>
            </div>
            <div className="flex gap-6 justify-between items-center w-full px-6">
                {/* Base Asset Box */}
                <div className="flex flex-col items-start">
                    <span className="text-xs pl-2 text-neutral-400">
                        {assets.baseSymbol}
                    </span>
                    <div className="flex border border-neutral-200 items-center rounded-lg pl-2 py-2 min-w-[140px] hover:bg-neutral-200 transition-colors duration-100">
                        <Image
                            src={assets.baseImg}
                            alt={assets.baseSymbol}
                            width={28}
                            height={28}
                            className="mr-3 rounded-full"
                        />
                        <input
                            type="number"
                            className="bg-transparent outline-none text-neutral-600 text-lg w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={baseAmountLocal}
                            min={0}
                            onChange={(e) => {
                                const raw = e.target.value;
                                const parsed = Number(raw);
                                if (!isFinite(parsed) || parsed < 0) {
                                    setBaseAmountLocal(0);
                                    setBaseAmount(0);
                                    return;
                                }
                                setBaseAmountLocal(parsed);
                                setBaseAmount(parsed);
                            }}
                        />
                    </div>
                </div>
                {/* Quote Asset Box */}
                <div className="flex flex-col items-start">
                    <span className="text-xs pl-2 text-neutral-400">
                        {assets.quoteSymbol}
                    </span>
                    <div className="flex border border-neutral-200 items-center rounded-lg pl-2 py-2 min-w-[140px] hover:bg-neutral-200 transition-colors duration-100">
                        <Image
                            src={assets.quoteImg}
                            alt={assets.quoteSymbol}
                            width={28}
                            height={28}
                            className="mr-3"
                        />
                        <input
                            type="number"
                            className="bg-transparent outline-none text-neutral-600 text-lg w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={quoteAmountLocal}
                            min={0}
                            onChange={(e) => {
                                const raw = e.target.value;
                                const parsed = Number(raw);
                                if (!isFinite(parsed) || parsed < 0) {
                                    setQuoteAmountLocal(0);
                                    setQuoteAmount(0);
                                    return;
                                }
                                setQuoteAmountLocal(parsed);
                                setQuoteAmount(parsed);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CollateralEditor);
