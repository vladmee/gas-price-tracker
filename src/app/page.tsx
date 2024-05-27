"use client";

import GasPriceCard from "~/components/GasPriceCard";
import useFetchGasPrices from "~/hooks/useFetchGasPrices";
import useGasPrices from "~/store/useGasPrices";

export default function HomePage() {
  useFetchGasPrices();
  const gasPrices = useGasPrices((state) => state.data);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <GasPriceCard
            type="low"
            isLoading={gasPrices ? false : true}
            price={gasPrices?.SafeGasPrice}
            base={gasPrices?.suggestBaseFee}
          />
          <GasPriceCard
            type="average"
            isLoading={gasPrices ? false : true}
            price={gasPrices?.ProposeGasPrice}
            base={gasPrices?.suggestBaseFee}
          />
          <GasPriceCard
            type="high"
            isLoading={gasPrices ? false : true}
            price={gasPrices?.FastGasPrice}
            base={gasPrices?.suggestBaseFee}
          />
        </div>
      </div>
    </main>
  );
}
