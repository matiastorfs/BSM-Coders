import games from "../public/data/games.json" with { type: 'json'};
import { Game } from "./types.js";

export function getGames(): Game[] {
  return games;
}

export async function getGameById(id: number) {
  return games.find(game => game.id === id) ?? null;
}