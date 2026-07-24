import "@/app/globals.css";
import Link from 'next/link';
import { users } from '../data/users';
import { cookies } from 'next/headers'

export const metadata = {
  title: "Basic Next App",
  description: "This is a basic NEXT.js app",
};

export default async function RootLayout({ children }) {

  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;
  console.log("Retrieved user ID from cookie:", userId);

  const currentUser = users.find(
    user => user.id === userId
  )

  console.log(users)
  console.log(currentUser ? "Current user found:" : "No current user found.", currentUser);

  return (
    <>
    <html lang="en">
      <body className="bg-sky-500 min-h-full flex flex-col">
        {children}
        <h1 className=" absolute left-5 text-4xl font-bold text-white mx-4 mt-4">Rishaan</h1>
        <div className=" absolute top-15 left-2 w-40 flex flex-col text-white bg-sky-700/70 p-3 rounded-lg shadow-md space-x-4 m-4 h-fit">
          <button className="bg-sky-300/60 m-2 p-2 rounded text-black"><Link href="/home">Home</Link></button>
          <button className="bg-sky-300/60 m-2 p-2 rounded text-black"><Link href="/explore">Explore</Link></button>
          <button className="bg-sky-300/60 m-2 p-2 rounded text-black"><Link href="/shop">Shop</Link></button>
          <button className="bg-sky-300/60 m-2 p-2 rounded text-black"><Link href="/about">About</Link></button>
        </div>
          <img src={currentUser?.pfp} alt="Profile" className="absolute top-15 right-2 w-10 h-10 rounded-full"/>
        </body>
    </html>
    </>
  );
}