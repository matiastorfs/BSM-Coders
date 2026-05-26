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

export async function addFavoriteGame(
  email: string,
  gameId: number
): Promise<void> {
  try {
    await userCollection.updateOne(
      { email },
      {
        $addToSet: {
          "data.fav": gameId
        }
      }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
}

export async function removeFavoriteGame(
  email: string,
  gameId: number
): Promise<void> {
  try {
    await userCollection.updateOne(
      { email },
      {
        $pull: {
          "data.fav": gameId
        }
      }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
}

export async function getFavoriteGames(email: string): Promise<Game[]> {
  try {
    const user = await userCollection.findOne({ email });

    if (!user || !user.data?.fav?.length) {
      return [];
    }

    return await gameCollection
      .find({
        id: { $in: user.data.fav }
      })
      .toArray();

  } catch (error) {
    console.error(error);
    return [];
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
              gamesPlayed: 0,
              achievements: [],
              fav: [],
          },
          friends: []
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

export async function addPlayedGame(email: string): Promise<void> {
  try {
    const user = await userCollection.findOne({ email });

    if (!user) return;

    const currentGamesPlayed = user.data?.gamesPlayed || 0;
    const newGamesPlayed = currentGamesPlayed + 1;

    const achievements = user.data?.achievements || [];

    const hasAchievement = (title: string) =>
      achievements.some(a => a.title === title);

    const newAchievements = [];

    if (newGamesPlayed >= 1 && !hasAchievement("Beginner")) {
      newAchievements.push({
        title: "Beginner",
        description: "Speel Raad Het Spel 1 keer"
      });
    }

    if (newGamesPlayed >= 5 && !hasAchievement("Gevorderde Gamer")) {
      newAchievements.push({
        title: "Gevorderde Gamer",
        description: "Speel Raad Het Spel 5 keer"
      });
    }

    if (newGamesPlayed >= 10 && !hasAchievement("Guess Master")) {
      newAchievements.push({
        title: "Guess Master",
        description: "Speel Raad Het Spel 10 keer"
      });
    }

    await userCollection.updateOne(
      { email },
      {
        $set: {
          "data.gamesPlayed": newGamesPlayed
        },
        $push: {
          "data.achievements": {
            $each: newAchievements
          }
        }
      }
    );

  } catch (error) {
    console.error("Error updating games played:", error);
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
    await userCollection.updateOne({ email: email }, { $set: { userIcon: iconName } });
}

export async function getUserById(id: string | number): Promise<User | null> {
  try {
    return await userCollection.findOne({ id: Number(id) });
  } catch (error) {
    console.error("Fout bij het ophalen van gebruiker via ID:", error);
    return null;
  }
}

export async function addFriend(userEmail: string, friendId: string): Promise<void> {
  try {
    await userCollection.updateOne(
      { email: userEmail },
      {
        $addToSet: {
          friends: friendId
        }
      }
    );
  } catch (error) {
    console.error("Fout bij toevoegen vriend:", error);
    throw error;
  }
}

export async function getUsersByIds(ids: (string | number)[]): Promise<User[]> {
  try {
    return await userCollection.find({ 
      id: { $in: ids.map(Number) }
    }).toArray();
  } catch (error) {
    console.error("Fout bij het ophalen van vrienden via IDs:", error);
    return [];
  }
}

export async function removeFriend(userEmail: string, friendId: string): Promise<void> {
    await userCollection.updateOne(
      { email: userEmail },
      {
        $pull: {
          friends: friendId
        }
      }
    );
}