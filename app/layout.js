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
        <h1 className="text-3xl font-bold text-white mx-4 mt-4">Rishaan</h1>
        <div className="w-fit flex flex-col text-white bg-sky-700/70 p-3 rounded-lg shadow-md space-x-4 m-4 h-fit">
          <button className="bg-sky-400/60 m-2 p-2 rounded"><Link href="/dashboard">Dashboard</Link></button>
          <button className="bg-sky-400/60 m-2 p-2 rounded"><Link href="/projects">Projects</Link></button>
          <button className="bg-sky-400/60 m-2 p-2 rounded"><Link href="/shop">Shop</Link></button>
          <button className="bg-sky-400/60 m-2 p-2 rounded"><Link href="/about">About</Link></button>
        </div>
      </body>
    </html>
  );
}
