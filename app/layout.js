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
        {children}
      </body>
    </html>
  );
}
