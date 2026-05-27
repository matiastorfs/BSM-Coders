import express from "express";
import { getGames, getGameById } from "../database";
import { Game } from "../types";
import { secureMiddleware } from "../securemiddleware";
import { flashMiddleware } from "../flashmiddleware";

let games: Game[] = [];

export default function gameRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    let games: Game[] = await getGames();

    const query = ((req.query.q as string) || "").toLowerCase();
    const sort = req.query.sort as string;
    const order = (req.query.order as string) === "desc" ? "desc" : "asc";

    const sortOptions = [
      { key: "title", value: "Titel" },
      { key: "developer", value: "Ontwikkelaar" },
      { key: "release_date", value: "Datum" },
    ];

    let filteredGames: Game[] = query
      ? games.filter((game) => game.title.toLowerCase().includes(query))
      : games;

    if (sort) {
      filteredGames.sort((a: any, b: any) => {
        let valA = a[sort];
        let valB = b[sort];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return order === "asc" ? -1 : 1;
        if (valA > valB) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    res.render("games", {
      games: filteredGames,
      query,
      order,
      sort,
      sortOptions,
      showsort: sort ? "visible" : "",
    });
  });

  router.post("/compare", secureMiddleware, async (req, res) => {
    const { game1, game2 } = req.body;

    const game1Data = await getGameById(game1);
    const game2Data = await getGameById(game2);

    if (game1 && game2) {
      res.render("compare", {
        game1: game1Data,
        game2: game2Data,
      });
    } else {
      res.redirect("/home");
    }
  });

  return router;
}
