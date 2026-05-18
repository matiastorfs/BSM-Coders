import express from "express";
import { connect, getGames, getGameById, AddUser, login } from "./database";
import path from "path";
import homeRouter from "./routers/home";
import { Game, User, FlashMessage } from "./types";
import guessRouter from "./routers/guessthatgame";
import settingsRouter from "./routers/settings";
import session from "./session";
import { flashMiddleware } from "./flashmiddleware";
import { secureMiddleware } from "./securemiddleware";

const app = express();
const root = process.cwd();

app.set("view engine", "ejs");
app.set("port", 3000);

app.use(session);
app.use(flashMiddleware);

app.use(express.static(path.join(root, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/home", homeRouter());
app.use("/guess-that-game", guessRouter());
app.use("/settings", settingsRouter());

app.get("/", secureMiddleware, async (req, res) => {
  res.render("index");
});

app.get("/login", async (req, res) => {
  res.render("log-in-page");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    req.session.user = userWithoutPassword;
    req.session.message = { type: "success", message: "Succesvol ingelogd!" };
    res.redirect("/home");
  } catch (e: any) {
    req.session.message = { type: "error", message: e.message };
    res.redirect("/login");
  }
});

app.get("/signin", async (req, res) => {
  res.render("sign-up-page");
});

app.post("/signin", async (req, res) => {
  try {
    await AddUser(req.body);
    res.redirect("/login");
  } catch (error) {
    res.redirect("/signin?error=failed");
  }
});

app.post("/logout", secureMiddleware, async (req, res) => {
        req.session.destroy((err) => {
            res.redirect("/login");
        });
    });

app.get("/account", secureMiddleware, (req, res) => {
  res.render("account");
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

app.get("/game/:id", secureMiddleware, async (req : any, res : any) => {
  const gameId = req.params.id; 
  
  const game: Game | null = await getGameById(gameId);
  if (game) {
    res.render("info", { game });
  }
  else {
    res.status(404).render("404")
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
