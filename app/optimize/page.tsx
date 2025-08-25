"use client";

import { createSwapy } from "swapy";
import { useEffect, useRef, useState } from "react";
import SecondaryHeader from "../SecondaryHeader";
import SidebarConfigurator from "../components/SidebarConfigurator";
import { useSolUsdcPrices } from "@/lib/hooks/useOraclePrices";
import PositionSummary from "../components/PositionSummary";
import { PositionProvider } from "@/lib/context/PositionContext";

type PositionState = {
    baseAmount: number;
    quoteAmount: number;
    leverage: number;
    borrowRatio: number; // 0-100
    exposure: number; // 0-1
    borrowAmount: number; // in quote units
};

export default function Optimize() {
    const swapy = useRef<any | null>(null);
    const swapyArea = useRef<HTMLDivElement | null>(null);

    const { basePrice, quotePrice, loading, error } = useSolUsdcPrices();

    useEffect(() => {
        if (swapyArea.current) {
            swapy.current = createSwapy(swapyArea.current);
            swapy.current.onSwap((event: any) => {
                console.log("swap", event);
            });
        }
        return () => {
            swapy.current?.destroy();
        };
    }, []);

    const isLoading = loading || basePrice <= 0 || quotePrice <= 0;

    return (
        <div className="min-h-screen h-screen bg-neutral-50 flex flex-col font-inter">
            <SecondaryHeader />
            <main className="flex-1 min-h-0 pt-24 pb-0">
                <PositionProvider
                    assets={{
                        baseSymbol: "SOL",
                        quoteSymbol: "USDC",
                        baseImg: "/sol.png",
                        quoteImg: "/usdc.png",
                        basePrice,
                        quotePrice,
                    }}
                >
                    <section className="px-4 mt-8 flex-1 min-h-0 flex flex-col">
                        <div className="grid grid-cols-12 gap-4 h-full min-h-0">
                            <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                <div className="h-full">
                                    <SidebarConfigurator />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-8 lg:col-span-6">
                                <div
                                    ref={swapyArea}
                                    className="flex flex-col gap-4 h-full min-h-0"
                                >
                                    <div
                                        data-swapy-slot="a"
                                        className="relative rounded-2xl flex-1 flex flex-col items-center justify-center min-h-[240px] w-full bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-sky-100/60 dark:border-white/10 shadow"
                                    >
                                        <div
                                            data-swapy-item="a"
                                            className="relative rounded-xl w-full h-full flex items-center justify-center p-4"
                                        >
                                            <div className="text-neutral-600 dark:text-neutral-300 text-sm">
                                                Chart / Range Config
                                            </div>
                                            {isLoading && (
                                                <div className="absolute inset-0 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
                                                    <span className="text-neutral-500 text-sm">
                                                        Loading prices…
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        data-swapy-slot="b"
                                        className="relative rounded-2xl flex-1 flex flex-col items-center justify-center min-h-[240px] w-full bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-sky-100/60 dark:border-white/10 shadow"
                                    >
                                        <div
                                            data-swapy-item="b"
                                            className="relative rounded-xl w-full h-full flex items-center justify-center p-4"
                                        >
                                            <div className="text-neutral-600 dark:text-neutral-300 text-sm">
                                                Risk / Yield
                                            </div>
                                            {isLoading && (
                                                <div className="absolute inset-0 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
                                                    <span className="text-neutral-500 text-sm">
                                                        Loading prices…
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-3">
                                <div className="h-full">
                                    <PositionSummary />
                                </div>
                            </div>
                        </div>
                    </section>
                </PositionProvider>
            </main>
        </div>
    );
}
