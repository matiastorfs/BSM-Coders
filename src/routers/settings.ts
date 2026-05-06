import express from "express";
import { secureMiddleware } from "../securemiddleware";

export default function settingsRouter() {
  const router = express.Router();

  router.get("/", secureMiddleware, async (req, res) => {

    res.render("settings");
  });

  return router;
}
