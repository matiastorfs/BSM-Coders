import express from "express";
import { getGames } from "../database";
import { Game } from "../types";
import { secureMiddleware } from "../securemiddleware";

export default function guessRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const games: Game[] = await getGames();

    res.render("guess-that-game-homepagina", { games });
  });

  router.get("/1v1", async (req, res) => {
    const games: Game[] = await getGames();

    res.render("guess-that-game-1v1", { games });
  });

  router.get("/play", async (req, res) => {
    res.render("guess-that-game-play");
  });

  return router;
}
