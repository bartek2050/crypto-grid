type CurrencyDataType = Record<string, number>;

export interface GlobalDataType {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: CurrencyDataType;
  total_volume: CurrencyDataType;
  market_cap_percentage: CurrencyDataType;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface TopCoinsDataType {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // ISO date format
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // ISO date format
  roi?: string; // Nieokreślone w przykładzie, więc pozostawione opcjonalnie
  last_updated: string; // ISO date format
  price_change_percentage_1h: number;
  sparkline_in_7d: {
    price: number[];
  };
}