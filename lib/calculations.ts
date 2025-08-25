export function calculatePositionExposure(leverage: number, borrowRatioFraction: number): number {
	if (!isFinite(leverage) || leverage <= 0) return 0.5;
	const clampedBorrowRatio = Math.max(0, Math.min(1, borrowRatioFraction));
	return 1 - ((leverage - 1) * (1 - clampedBorrowRatio)) / leverage;
}

export function calculateBorrowAmount(
	baseAmount: number,
	basePrice: number,
	quoteAmount: number,
	leverage: number
): number {
	if (!isFinite(leverage) || leverage < 1) return 0;
	if (!isFinite(baseAmount) || !isFinite(basePrice) || !isFinite(quoteAmount)) return 0;
	// If basePrice not loaded or invalid, still allow borrow from quote collateral only
	const baseComponent = basePrice > 0 ? baseAmount * basePrice : 0;
	const equityInQuote = baseComponent + Math.max(0, quoteAmount);
	const borrow = (leverage - 1) * equityInQuote;
	return borrow > 0 ? borrow : 0;
}

export function clamp01(value: number): number {
	if (!isFinite(value)) return 0;
	return Math.max(0, Math.min(1, value));
}

