
export function roundNumberToDecimals(number: number, numDecimals: number) {
    return Math.round(number * Math.pow(10, numDecimals)) / Math.pow(10, numDecimals);
}