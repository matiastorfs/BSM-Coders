import express from "express";

export default function settingsRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {

    res.render("settings");
  });

  return router;
}
