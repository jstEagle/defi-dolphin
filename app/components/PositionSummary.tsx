"use client";

import React from "react";
import { roundNumberToDecimals } from "@/app/helper";
import { usePosition } from "@/lib/context/PositionContext";

export default function PositionSummary() {
    const { state, assets, derived } = usePosition();

    const equity =
        state.baseAmount * (assets.basePrice > 0 ? assets.basePrice : 0) +
        state.quoteAmount;
    const notional = equity * state.leverage;
    const borrowBasePct = 100 - state.borrowRatio;
    const borrowQuotePct = state.borrowRatio;

    return (
        <div className="rounded-2xl w-full h-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-sky-100/60 dark:border-white/10 shadow p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-neutral-700 dark:text-neutral-200 font-semibold">
                    Position Summary
                </h3>
                <span className="text-neutral-400 text-sm">Live</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-neutral-50 dark:bg-white/5 p-3 border border-white/50 dark:border-white/10">
                    <div className="text-neutral-400">Equity</div>
                    <div className="text-neutral-800 dark:text-neutral-100 font-semibold">
                        ${roundNumberToDecimals(equity, 2)}
                    </div>
                </div>
                <div className="rounded-xl bg-neutral-50 dark:bg-white/5 p-3 border border-white/50 dark:border-white/10">
                    <div className="text-neutral-400">Leverage</div>
                    <div className="text-neutral-800 dark:text-neutral-100 font-semibold">
                        {state.leverage.toFixed(1)}x
                    </div>
                </div>
                <div className="rounded-xl bg-neutral-50 dark:bg-white/5 p-3 border border-white/50 dark:border-white/10">
                    <div className="text-neutral-400">Borrowed</div>
                    <div className="text-neutral-800 dark:text-neutral-100 font-semibold">
                        ${roundNumberToDecimals(derived.borrowAmount, 2)}
                    </div>
                </div>
                <div className="rounded-xl bg-neutral-50 dark:bg-white/5 p-3 border border-white/50 dark:border-white/10">
                    <div className="text-neutral-400">Notional</div>
                    <div className="text-neutral-800 dark:text-neutral-100 font-semibold">
                        ${roundNumberToDecimals(notional, 2)}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-neutral-50 dark:bg-white/5 p-3 border border-white/50 dark:border-white/10">
                    <div className="text-neutral-400">Borrow Split</div>
                    <div className="text-neutral-700 dark:text-neutral-200">
                        <span className="font-semibold">{borrowBasePct}%</span>{" "}
                        base •{" "}
                        <span className="font-semibold">{borrowQuotePct}%</span>{" "}
                        quote
                    </div>
                </div>
                <div className="rounded-xl bg-neutral-50 dark:bg-white/5 p-3 border border-white/50 dark:border-white/10">
                    <div className="text-neutral-400">Exposure</div>
                    <div className="text-neutral-800 dark:text-neutral-100 font-semibold">
                        {roundNumberToDecimals(derived.exposure, 2)}
                    </div>
                </div>
            </div>
            <div className="mt-auto text-xs text-neutral-400">
                Assumes base priced in quote. Values update with inputs.
            </div>
        </div>
    );
}
