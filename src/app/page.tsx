"use client";

import useFetchGasPrices from "~/hooks/useFetchGasPrices";
import useGasPrices from "~/store/useGasPrices";

export default function HomePage() {
  useFetchGasPrices();
  const gasPrices = useGasPrices((state) => state.data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        {gasPrices ? (
          <pre>{JSON.stringify(gasPrices, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
