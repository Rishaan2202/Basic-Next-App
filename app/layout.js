import "./globals.css";
import Link from 'next/link';

export const metadata = {
  title: "Basic Next App",
  description: "This is a basic NEXT.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-sky-400 min-h-full flex flex-col">
        <img src="@/hackalympics_1024.svg" alt="Hackalympics Logo" className="w-20 h-20 m-4" />
        {children}
      </body>
    </html>
  );
}
