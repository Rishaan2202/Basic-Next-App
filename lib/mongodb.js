import { MongoClient } from "mongodb";

export async function getDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("data");
}