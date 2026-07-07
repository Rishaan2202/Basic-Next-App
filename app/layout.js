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
        <div className="w-fit flex flex-col text-white bg-sky-600/70 p-4 rounded-lg shadow-md space-x-4">
          <button className="bg-sky-450/60"><Link href="/dashboard">Dashboard</Link></button>
          <button className="bg-sky-450/60"><Link href="/projects">Projects</Link></button>
          <button className="bg-sky-450/60"><Link href="/shop">Shop</Link></button>
          <button className="bg-sky-450/60"><Link href="/about">About</Link></button>
        </div>
      </body>
    </html>
  );
}
