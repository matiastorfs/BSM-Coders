import games from "../public/data/games.json";
import { Game } from "./types";

export function getGames(): Game[] {
  return games;
}

export async function getGameById(id: number) {
  return games.find(game => game.id === id) ?? null;
}