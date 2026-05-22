import { Collection, MongoClient, ObjectId } from "mongodb";
import { Game, User } from "./types";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const saltRounds : number = 10;

dotenv.config();
export const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

const client = new MongoClient(uri);
const gameCollection: Collection<Game> = client
  .db("gamehub")
  .collection<Game>("games");

const userCollection: Collection<User> = client
  .db("gamehub")
  .collection<User>("users");

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

export async function getGameById(id: string | number) {
  try {
    return await gameCollection.findOne({ id: Number(id) });
  } catch (error) {
    console.error("Error fetching game by id:", error);
    return null;
  }
}

export async function AddUser(data: any): Promise<void> {
    try {
        const { password, passwordConfirm, termsofservice, ...userData } = data;

        if (password !== passwordConfirm) {
            throw new Error("Wachtwoorden komen niet overeen");
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await userCollection.insertOne({
          ...userData,
          password: hashedPassword,
          data: {
              xp: 0,
              fav: [],
              friends: [],
          }
        });
    } catch (error: any) {
        console.error("Fout bij AddUser:", error);
        throw error;
    }
}

export async function login(email: string, password: string): Promise<User> {
    if (!email || !password) {
        throw new Error("Email en wachtwoord zijn verplicht.");
    }

    const user = await userCollection.findOne({ email });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password!);
        if (isMatch) {
            return user;
        } else {
            throw new Error("Wachtwoord is onjuist.");
        }
    } else {
        throw new Error("Gebruiker niet gevonden.");
    }
}

export async function updateUsername(email: string, newName: string): Promise<void> {
  try {
    await userCollection.updateOne(
      { email: email },
      { $set: { name: newName } }
    );
  } catch (error) {
    console.error("Fout bij het updaten van de gebruikersnaam:", error);
    throw error;
  }
}

export async function addXpToUser(email: string, xp: number): Promise<void> {
  try {
    await userCollection.updateOne(
      { email },
      {
        $inc: {
          "data.xp": xp
        }
      }
    );
  } catch (error) {
    console.error("Error adding XP:", error);
    throw error;
  }
}

export async function getLeaderboard(): Promise<User[]> {
  try {
    return await userCollection
      .find()
      .sort({ "data.xp": -1 })
      .limit(3)
      .toArray();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await userCollection.findOne({ email });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateBeschrijving(email: string, nieuweBeschrijving: string): Promise<void> {
  try {
    await userCollection.updateOne(
      { email: email },
      { $set: { "data.beschrijving": nieuweBeschrijving } }
    );
  } catch (error) {
    console.error("Fout bij het updaten van de beschrijving:", error);
    throw error;
  }
}

export async function updateUserIcon(email: string, iconName: string): Promise<void> {
    // Voorbeeld als je met MongoDB/MongoClient werkt:
    await userCollection.updateOne({ email: email }, { $set: { userIcon: iconName } });
}