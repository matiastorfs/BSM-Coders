import express from "express";
import { getGames, getGameById } from "../database";
import { Game } from "../types";
import { secureMiddleware } from "../securemiddleware";
import { flashMiddleware } from "../flashmiddleware";

let games: Game[] = [];

export default function gameRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    games = await getGames();

    res.render("games", { games });
  });

  router.post("/compare", secureMiddleware, async (req, res) => {
      const { game1, game2 } = req.body;
  
      const game1Data = await getGameById(game1);
      const game2Data = await getGameById(game2);
  
      if (game1 && game2) {
        res.render("compare", { 
          game1: game1Data, 
          game2: game2Data 
        });
      } else {
        res.redirect("/home");
      }
  });

  return router;
}
