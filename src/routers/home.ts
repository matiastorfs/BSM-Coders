import express from "express";
import { getGames } from "../database";
import { Game } from "../types";

export default function homeRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    let games = await getGames();
    res.render("home", { games });
  });

  return router;
}
