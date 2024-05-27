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
  setData: (data: GasPrices) => void;
}

const useGasPrices = create<GasPricesState>((set) => ({
  data: null,
  setData: (data: GasPrices) => set({ data }),
}));

export default useGasPrices;
