import { Collection, MongoClient } from "mongodb";
import { Game } from "./types";
import dotenv from "dotenv";

dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

const client = new MongoClient(uri);
const gameCollection: Collection<Game> = client
  .db("gamehub")
  .collection<Game>("games");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

async function seed() {
  if ((await gameCollection.countDocuments()) === 0) {
    const res = await fetch("https://www.freetogame.com/api/games");
    const games = await res.json();
    await gameCollection.insertMany(games);
  }
}

export async function getGames() {
  return await gameCollection.find().toArray();
}

export async function connect() {
  try {
    await client.connect();
    await seed();
    console.log("Connected to database");
    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error);
  }
}
