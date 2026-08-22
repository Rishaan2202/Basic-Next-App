import "./globals.css";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Basic Next App",
  description: "This is a basic NEXT.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-sky-400 min-h-full flex flex-col ml-50">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
