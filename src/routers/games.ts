import express from "express";
import { getGames } from "../database";
import { Game } from "../types";

let games: Game[] = [];

export default function gameRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    games = await getGames();

    res.render("games", { games });
  });

  return router;
}
