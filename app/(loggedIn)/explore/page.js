import { getDatabase } from "@/lib/mongodb";

export default async function ExplorePage() {
  const db = await getDatabase();
  const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } }).toArray();
  const projectsList = projects.flatMap(user => user.event_details?.projects || []);
  console.log("Explore data fetched from MongoDB:", projectsList);

  return (
    <div>
      <h1>Explore</h1>
      <p>Welcome to the explore page!</p>
      <ul>
        {projectsList.map((user, index) => (
          <li key={index} className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit">
            <h2>{user.name || "Project Name"}</h2>
            <p>{user.description || "Project Description"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
