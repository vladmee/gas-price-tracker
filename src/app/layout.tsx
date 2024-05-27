import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Providers from "~/components/Providers";

export const metadata = {
  title: "Ethereum Gas Price Tracker",
  description: "Simple gas price tracker for Ethereum",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
