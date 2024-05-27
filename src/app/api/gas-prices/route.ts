import { NextResponse } from "next/server";
import { type GasPrices } from "~/store/useGasPrices";

export interface GasPricesApiResponse {
  status: string;
  message: string;
  result: GasPrices;
}

export async function GET() {
  const apiKey = process.env.ETHERSCAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Please provide a valid API key" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`,
    );
    if (!response.ok) {
      throw new Error("error fetching, please retry");
    }
    const data: GasPricesApiResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
