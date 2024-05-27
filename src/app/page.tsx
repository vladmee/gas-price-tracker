"use client";

import GasPriceCard from "~/components/GasPriceCard";
import { ProgressBar } from "~/components/ProgressBar";
import useFetchGasPrices from "~/hooks/useFetchGasPrices";
import useGasPrices from "~/store/useGasPrices";

export default function HomePage() {
  const { isSuccess } = useFetchGasPrices();
  const gasPrices = useGasPrices((state) => state.data);
  const lastUpdatedAt = useGasPrices((state) => state.lastUpdatedAt);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="w-[60%]">
        <ProgressBar lastUpdatedAt={lastUpdatedAt} />
        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <GasPriceCard
            type="low"
            isLoading={!isSuccess}
            price={gasPrices?.SafeGasPrice}
            base={gasPrices?.suggestBaseFee}
          />
          <GasPriceCard
            type="average"
            isLoading={!isSuccess}
            price={gasPrices?.ProposeGasPrice}
            base={gasPrices?.suggestBaseFee}
          />
          <GasPriceCard
            type="high"
            isLoading={!isSuccess}
            price={gasPrices?.FastGasPrice}
            base={gasPrices?.suggestBaseFee}
          />
        </div>
      </div>
    </main>
  );
}
