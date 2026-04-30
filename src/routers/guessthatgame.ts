import express from "express";
import { getGames } from "../database";
import { Game } from "../types";

let games: Game[] = [];

export default function guessRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    games = await getGames();

    res.render("guess-that-game-homepagina", { games });
  });

  router.get("/1v1", async (req, res) => {
    games = await getGames();

    res.render("guess-that-game-1v1", { games });
  });

  return router;
}
