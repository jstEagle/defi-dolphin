"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import {
    calculateBorrowAmount,
    calculatePositionExposure,
} from "@/lib/calculations";

export type PositionState = {
    baseAmount: number;
    quoteAmount: number;
    leverage: number;
    borrowRatio: number; // 0-100
};

export type DerivedState = {
    borrowAmount: number; // in quote units
    exposure: number; // 0-1
    borrowSplitBaseUnits: number;
    borrowSplitQuoteUnits: number;
};

export type AssetMeta = {
    baseSymbol: string;
    quoteSymbol: string;
    baseImg: string;
    quoteImg: string;
    basePrice: number;
    quotePrice: number;
};

type PositionContextValue = {
    state: PositionState;
    setBaseAmount: (amount: number) => void;
    setQuoteAmount: (amount: number) => void;
    setLeverage: (value: number) => void;
    setBorrowRatio: (value: number) => void;
    assets: AssetMeta;
    setAssets: (partial: Partial<AssetMeta>) => void;
    derived: DerivedState;
};

const PositionContext = createContext<PositionContextValue | undefined>(
    undefined
);

type ProviderProps = React.PropsWithChildren<{
    assets: AssetMeta;
    initial?: Partial<PositionState>;
}>;

export function PositionProvider({ assets, initial, children }: ProviderProps) {
    const [state, setState] = useState<PositionState>({
        baseAmount: initial?.baseAmount ?? 0,
        quoteAmount: initial?.quoteAmount ?? 0,
        leverage: initial?.leverage ?? 1,
        borrowRatio: initial?.borrowRatio ?? 50,
    });

    const [assetMeta, setAssetMeta] = useState<AssetMeta>(assets);

    const setBaseAmount = useCallback((amount: number) => {
        setState((s) => ({
            ...s,
            baseAmount: Math.max(0, Number.isFinite(amount) ? amount : 0),
        }));
    }, []);

    const setQuoteAmount = useCallback((amount: number) => {
        setState((s) => ({
            ...s,
            quoteAmount: Math.max(0, Number.isFinite(amount) ? amount : 0),
        }));
    }, []);

    const setLeverage = useCallback((value: number) => {
        let next = Number.isFinite(value) ? value : 1;
        next = Math.max(1, next);
        setState((s) => ({ ...s, leverage: next }));
    }, []);

    const setBorrowRatio = useCallback((value: number) => {
        let next = Number.isFinite(value) ? value : 50;
        next = Math.max(0, Math.min(100, next));
        setState((s) => ({ ...s, borrowRatio: next }));
    }, []);

    const setAssets = useCallback((partial: Partial<AssetMeta>) => {
        setAssetMeta((a) => ({ ...a, ...partial }));
    }, []);

    const derived: DerivedState = useMemo(() => {
        const borrowAmount = calculateBorrowAmount(
            state.baseAmount,
            assetMeta.basePrice,
            state.quoteAmount,
            state.leverage
        );
        const exposure = calculatePositionExposure(
            state.leverage,
            state.borrowRatio / 100
        );
        const safePrice =
            assetMeta.basePrice > 0 && isFinite(assetMeta.basePrice)
                ? assetMeta.basePrice
                : 1;
        const frac = Math.max(0, Math.min(100, state.borrowRatio)) / 100;
        const baseUnits = (borrowAmount * (1 - frac)) / safePrice;
        const quoteUnits = borrowAmount * frac;
        return {
            borrowAmount,
            exposure,
            borrowSplitBaseUnits: baseUnits,
            borrowSplitQuoteUnits: quoteUnits,
        };
    }, [
        state.baseAmount,
        state.quoteAmount,
        state.leverage,
        state.borrowRatio,
        assetMeta.basePrice,
    ]);

    const value: PositionContextValue = {
        state,
        setBaseAmount,
        setQuoteAmount,
        setLeverage,
        setBorrowRatio,
        assets: assetMeta,
        setAssets,
        derived,
    };

    return (
        <PositionContext.Provider value={value}>
            {children}
        </PositionContext.Provider>
    );
}

export function usePosition() {
    const ctx = useContext(PositionContext);
    if (!ctx)
        throw new Error("usePosition must be used within a PositionProvider");
    return ctx;
}
