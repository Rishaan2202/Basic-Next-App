import { getDatabase } from "@/lib/mongodb";

export default async function ExplorePage() {
<<<<<<< HEAD

  const db = await getDatabase();
  const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } }).toArray();
  const projectsList = projects.flatMap(user => user.event_details?.projects || []);

=======
  const db = await getDatabase();
  const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } }).toArray();
  const projectsList = projects.flatMap(user => user.event_details?.projects || []);
>>>>>>> ffddf3c6d9a20f962c9c68db7cdc8cb225ad57ae
  console.log("Explore data fetched from MongoDB:", projectsList);

  return (
    <div className="absolute left-50 top-20">
      <h1 className='font-bold text-3xl'>Explore</h1>
      <p>Welcome to the explore page!</p>
<<<<<<< HEAD
      <ul className="grid grid-cols-2 h-full">
        {projectsList.map((user, index) => (
          <li key={index} className="flex flex-col break-words bg-[var(--tertiary)] m-2 p-2 rounded text-black w-[30vw]">
            <h2 className="font-bold text-2xl flex justify-center">{user.name || "Project Name"}</h2> 
            <p>{user.description || "Project Description"}</p>
            <div className='flex justify-around mt-auto'>
              <button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%]"><a href={user.demo || "#"} target="_blank" rel="noopener noreferrer">Demo</a></button>
              <button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%] "><a href={user.code || "#"} target="_blank" rel="noopener noreferrer">Code</a></button> 
=======
      <ul>
        {projectsList.map((user, index) => (
          <li key={index} className="bg-[var(--tertiary)] m-2 p-2 rounded text-black w-[30vw]">
            <h2 className="font-bold text-2xl flex justify-center">{user.name || "Project Name"}</h2> 
            <p>{user.description || "Project Description"}</p>
            <div className='flex justify-around'>
              <button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%]"><a href={user.demo || "#"} target="_blank" rel="noopener noreferrer">Demo</a></button>
              <button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%]"><a href={user.code || "#"} target="_blank" rel="noopener noreferrer">Code</a></button> 
>>>>>>> ffddf3c6d9a20f962c9c68db7cdc8cb225ad57ae
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
