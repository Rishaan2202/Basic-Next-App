import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Could not fetch MongoDB URI from environment variables!");
}

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {

    if (!globalThis._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalThis._mongoClientPromise = client.connect();
    }

    clientPromise = globalThis._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function getDatabase() {
    try {
        const client = await clientPromise;

        if (!client) {
            throw new Error("Failed to connect to MongoDB");
        }

        return client.db("data");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}