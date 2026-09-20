import { getDatabase } from "@/lib/mongodb";
import Image from "next/image";

export default async function ExplorePage() {

  const db = await getDatabase();
  const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } }).toArray();
  const projectsList = projects.flatMap(user => user.event_details?.projects || []);
  console.log("Explore data fetched from MongoDB:", projectsList);

  return (
    <div className="absolute left-50 top-20">
      <h1 className='font-bold text-3xl'>Explore</h1>
      <p>Welcome to the explore page!</p>
      <ul className="text-[var(--blue)] grid grid-cols-3 h-full">
        {projectsList.map((user, index) => (
          <li key={index} className="flex flex-col break-words bg-[var(--black)] m-2 p-2 rounded w-[25vw]">
            <Image src={user.screenshot || "https://cdn.hackclub.com/01a09f57-fcc4-78d8-b720-d09a3e79effa/No_Image_Available.jpg"} alt="Project Screenshot" width={400} height={200} className="rounded mb-2" />
            <h2 className="font-bold text-2xl text-[var(--red)] mb-2 flex justify-center">{user.name || "Project Name"}</h2> 
            <p>{user.description || "Project Description"}</p>
            <div className='flex justify-around mt-auto'>
              <button className="bg-[var(--yellow)] hover:bg-[var(--yellow)] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%]"><a href={user.demo || "#"} target="_blank" rel="noopener noreferrer">Demo</a></button>
              <button className="bg-[var(--yellow)] hover:bg-[var(--yellow)] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%] "><a href={user.code || "#"} target="_blank" rel="noopener noreferrer">Code</a></button> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
