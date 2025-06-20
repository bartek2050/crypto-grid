export const getPriceChangeColor = (priceChange: number) => {
  if (priceChange > 0) return "#31B855";
  if (priceChange < 0) return "#F53538";
  return "#414554";
};