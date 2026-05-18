import express from "express";
import { getGames } from "../database";
import { Game } from "../types";
import { secureMiddleware } from "../securemiddleware";

let games: Game[] = [];

export default function homeRouter() {
  const router = express.Router();

  router.get("/", secureMiddleware, async (req, res) => {
    games = await getGames();

    res.render("home", { games });
  });

  return router;
}
