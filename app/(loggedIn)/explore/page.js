import { getDatabase } from "@/lib/mongodb";

export default async function ExplorePage() {
  const db = await getDatabase();
  const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } }).toArray();
  console.log("Explore data fetched from MongoDB:", projects);

  return (
    <div>
      <h1>Explore</h1>
      <p>Welcome to the explore page!</p>
      <ul>
        {projects.map((user, index) => (
          <li key={index} className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit">
            <h2>{user.event_details.projects?.name || "Project Name"}</h2>
            <p>{user.event_details.projects?.description || "Project Description"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}