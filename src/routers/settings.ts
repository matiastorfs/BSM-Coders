import express from "express";
import { secureMiddleware } from "../securemiddleware";
import { updateUsername } from "../database";

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
        await updateUsername(email, username);
        
        req.session.user!.name = username;
        
        res.redirect("/settings");
      } catch (error) {
        console.error(error);
        res.redirect("/settings?error=failedtoupdate");
      }
    } else {
      res.redirect("/settings");
    }
  });

  return router;
}
