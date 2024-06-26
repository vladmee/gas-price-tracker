import { NextResponse } from "next/server";
import { type GasPrices } from "~/store/useGasPrices";

export interface GasPricesApiResponse {
  status: string;
  message: string;
  result: GasPrices;
}

export const dynamic = "force-dynamic";
export const revalidate = 10;

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
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
    if (!response.ok) {
      throw new Error("error fetching, please retry");
    }
    const data: GasPricesApiResponse =
      (await response.json()) as GasPricesApiResponse;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
