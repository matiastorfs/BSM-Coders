import express from "express";
import { getGames, getFavoriteGames } from "../database";
import { Game } from "../types";
import { secureMiddleware } from "../securemiddleware";
import { flashMiddleware } from "../flashmiddleware";

let games: Game[] = [];

export default function homeRouter() {
  const router = express.Router();

  router.get("/", async (req: any, res) => {
    games = await getGames();

    const favoriteGames = await getFavoriteGames(
      req.session.user.email
    );

    res.render("home", {
      games,
      favoriteGames
    });
  });

  return router;
}
