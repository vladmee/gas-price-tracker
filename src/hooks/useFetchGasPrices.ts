import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useGasPrices, { type GasPrices } from "../store/useGasPrices";
import { type GasPricesApiResponse } from "~/app/api/gas-prices/route";

const fetchGasPrices = async (): Promise<GasPrices> => {
  const response = await fetch("/api/gas-prices", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (!response.ok) {
    throw new Error("could not reach the api");
  }
  const data: GasPricesApiResponse =
    (await response.json()) as GasPricesApiResponse;
  return data.result;
};

const useFetchGasPrices = () => {
  const setData = useGasPrices((state) => state.setData);

  const { data, isSuccess } = useQuery({
    queryKey: ["api-gas-prices"],
    queryFn: fetchGasPrices,
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 10000, // fetch every 10 sec
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setData(data, new Date());
    }
  }, [isSuccess, data, setData]);

  return { isSuccess };
};

export default useFetchGasPrices;
