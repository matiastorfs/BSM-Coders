import express from "express";
import { secureMiddleware } from "../securemiddleware";
import { updateUsername, updateBeschrijving, getUserByEmail } from "../database";

export default function settingsRouter() {
  const router = express.Router();

  router.get("/", secureMiddleware, async (req, res) => {

    res.render("settings");
  });

  router.get("/", secureMiddleware, async (req, res) => {
    res.render("settings");
  });

  router.post("/username", secureMiddleware, async (req, res) => {
    const { username } = req.body;
    const email = req.session.user?.email;

    if (email && username) {
      try {
        req.session.message = { type: "success", message: "Gebruikersnaam succesvol bijgewerkt!" };
        await updateUsername(email, username);
        
        req.session.user!.name = username;
        
        res.redirect("/settings");
      } catch (error) {
        req.session.message = { type: "error", message: "Er ging iets mis bij het bijwerken van de gebruikersnaam." };
        console.error(error);
        res.redirect("/settings?error=failedtoupdate");
      }
    } else {
      res.redirect("/settings");
    }
  });

  router.post("/beschrijving", async (req: any, res: any) => {
  try {
    const { beschrijving } = req.body;
    const email = req.session.user.email;

    await updateBeschrijving(email, beschrijving);

    const updatedUser = await getUserByEmail(email);
    if (updatedUser) {
      const userWithoutPassword = { ...updatedUser };
      delete userWithoutPassword.password;
      req.session.user = userWithoutPassword;
    }

    req.session.message = { type: "success", message: "Beschrijving succesvol bijgewerkt!" };
    res.redirect("/settings");
  } catch (error) {
    console.error(error);
    req.session.message = { type: "error", message: "Er ging iets mis bij het bijwerken van de beschrijving." };
    res.redirect("/settings");
  }
});

  return router;
}
