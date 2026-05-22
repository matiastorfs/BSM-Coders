import express from "express";
import {connect, getGames, getGameById, AddUser, login, addXpToUser, getLeaderboard, getUserByEmail, updateUserIcon} from "./database";
import path from "path";
import homeRouter from "./routers/home";
import gamesRouter from "./routers/games";
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
app.use(express.json());
app.use("/home", secureMiddleware, homeRouter());
app.use("/games", secureMiddleware, gamesRouter());
app.use("/guess-that-game", secureMiddleware, guessRouter());
app.use("/settings", secureMiddleware, settingsRouter());

app.get("/", async (req, res) => {
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
    const userData = { ...req.body };

    let uniqueId;
    let idExists = true;

    while (idExists) {
      uniqueId = Math.floor(1000 + Math.random() * 9000);
      idExists = false; 
    }

    userData.id = uniqueId;

    await AddUser(userData);
    
    req.session.message = { type: "success", message: "Account succesvol aangemaakt" };
    res.redirect("/login");
    
  } catch (error) {
    console.error("Registratiefout:", error);
    res.redirect("/signin?error=failed");
  }
});

app.post("/logout", secureMiddleware, async (req, res) => {
  delete req.session.user;
  req.session.message = { type: "success", message: "Succesvol uitgelogd!" };
  res.redirect("/");
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

app.post("/api/add-xp", secureMiddleware, async (req: any, res: any) => {
  try {
    const { xp } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: "Not logged in" });
    }

    await addXpToUser(req.session.user.email, Number(xp));

    const updatedUser = await getUserByEmail(req.session.user.email);

    if (updatedUser) {
      const userWithoutPassword = { ...updatedUser };
      delete userWithoutPassword.password;

      req.session.user = userWithoutPassword;
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add XP" });
  }
});

app.get("/api/leaderboard", secureMiddleware, async (req: any, res: any) => {
  try {
    const topPlayers = await getLeaderboard();

    const currentUser = await getUserByEmail(req.session.user.email);

    res.json({
      topPlayers,
      currentUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.post("/update-profile-picture", secureMiddleware, async (req: any, res: any) => {
  try {
    const { selectedIcon } = req.body;

    await updateUserIcon(req.session.user.email, selectedIcon);

    req.session.user.userIcon = selectedIcon;
    req.session.message = { type: "success", message: "Profielfoto succesvol aangepast!" };
    res.redirect("/account");

  } catch (error) {
    console.error(error);
    req.session.message = { type: "error", message: "Fout bij het bijwerken van de profielfoto." };
    res.redirect("/account");
  }
});


app.listen(app.get("port"), async () => {
  await connect();
  console.log("Server started on http://localhost:" + app.get("port"));
});
