import { create } from "zustand";

export interface GasPrices {
  LastBlock: string;
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
  suggestBaseFee: string;
  gasUsedRatio: string;
}

export interface GasPricesState {
  data: GasPrices | null;
  lastUpdatedAt: Date | null;
  setData: (data: GasPrices, lastUpdatedAt: Date) => void;
}

const useGasPrices = create<GasPricesState>((set) => ({
  data: null,
  lastUpdatedAt: null,
  setData: (data, lastUpdatedAt) => set({ data, lastUpdatedAt }),
}));

export default useGasPrices;
