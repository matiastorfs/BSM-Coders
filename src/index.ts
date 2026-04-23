// To run this server in localhost, type the following commands:
// npm install (one time only)
// npm run build
// npm start

import express from "express";
import path from "path";
import { getGameById, getGames } from "./data.js";
import { Game } from "./types.js";

const app = express();
const root = process.cwd();

app.set("view engine", "ejs");

app.use(express.static(path.join(root, "public")));
app.use(express.static(path.join(root, "dist")));

/*
app.get("/:page.html", (req, res) => {
  res.render(req.params.page);
});
*/

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  const games: Game[] = getGames();
  res.render("home", { games });
});

app.get("/game/:id", async (req, res) => {

  const game = await getGameById(parseInt(req.params.id));

  if (!game) {
    return res.status(404).send("Game niet gevonden");
  }

  res.render("info", { game });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
