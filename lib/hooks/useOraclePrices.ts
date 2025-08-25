"use client";

import { useEffect, useState } from "react";

type OracleResponse = {
	data: { price: number; decimals: number };
};

async function fetchOraclePrice(mint: string): Promise<number> {
	const res = await fetch(`https://api.defituna.com/api/v1/oracle-prices/${mint}`);
	if (!res.ok) throw new Error(`Failed to fetch price for ${mint}`);
	const json: OracleResponse = await res.json();
	return json.data.price / 10 ** json.data.decimals;
}

export function useOraclePrices(baseMint: string, quoteMint: string) {
	const [basePrice, setBasePrice] = useState<number>(-1);
	const [quotePrice, setQuotePrice] = useState<number>(-1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		Promise.allSettled([
			fetchOraclePrice(baseMint),
			fetchOraclePrice(quoteMint),
		])
			.then(results => {
				if (!isMounted) return;
				const [baseRes, quoteRes] = results;
				if (baseRes.status === "fulfilled") setBasePrice(baseRes.value);
				else setError(baseRes.reason?.message ?? "Failed to fetch base price");
				if (quoteRes.status === "fulfilled") setQuotePrice(quoteRes.value);
				else setError(prev => prev ?? (quoteRes.reason?.message ?? "Failed to fetch quote price"));
			})
			.finally(() => {
				if (isMounted) setLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [baseMint, quoteMint]);

	return { basePrice, quotePrice, loading, error };
}

export function useSolUsdcPrices() {
	return useOraclePrices(
		"So11111111111111111111111111111111111111112",
		"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
	);
}


