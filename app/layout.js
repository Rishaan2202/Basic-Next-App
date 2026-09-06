import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Mansalva } from "next/font/google";

const mansalva = Mansalva({ subsets: ["latin"], display: "swap", weight: "400" }); 

export const metadata = {
  title: "Basic Next App",
  description: "This is a basic NEXT.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-sky-400 min-h-full flex flex-col ml-50 ${mansalva.className}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
