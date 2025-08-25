"use client";

import React from "react";
import CollateralEditor from "./CollateralEditor";
import PositionTypeSlider from "./PositionTypeSlider";
import LeverageSlider from "./LeverageSlider";
import BorrowRatioEditor from "./BorrowRatioEditor";
import { usePosition } from "@/lib/context/PositionContext";

export default function SidebarConfigurator() {
    const { assets, derived } = usePosition();

    return (
        <div className="rounded-2xl w-full h-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-sky-100/60 dark:border-white/10 shadow text-center flex flex-col items-center gap-6">
            <div className="w-full py-2">
                <div className="text-neutral-700 dark:text-neutral-200 font-semibold text-m">
                    Configure Position
                </div>
            </div>
            <div className="w-full py-2">
                <CollateralEditor />
            </div>
            <div className="w-full py-2">
                <PositionTypeSlider
                    value={derived.exposure}
                    token={assets.baseSymbol}
                />
            </div>
            <div className="w-full py-2">
                <LeverageSlider />
            </div>
            <div className="w-full py-2">
                <BorrowRatioEditor />
            </div>
        </div>
    );
}
