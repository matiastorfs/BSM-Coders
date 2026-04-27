import express from "express";
import { connect, getGames } from "./database";
import path from "path";
import homeRouter from "./routers/home";

const app = express();
const root = process.cwd();

app.set("view engine", "ejs");
app.set("port", 3000);

app.use(express.static(path.join(root, "public")));
app.use("/home", homeRouter());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/games", async (req, res) => {
  try {
    const games = await getGames();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// Temporary route for all files
app.get("/:file.html", (req, res) => {
  res.render(req.params.file);
});

app.listen(app.get("port"), async () => {
  await connect();
  console.log("Server started on http://localhost:" + app.get("port"));
});
