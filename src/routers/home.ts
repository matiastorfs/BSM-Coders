import express from "express";
import { getGames, getFavoriteGames, getUsersByIds } from "../database";

export default function homeRouter() {
  const router = express.Router();

  router.get("/", async (req: any, res) => {
    const user = req.session.user;
    
    const games = (await getGames()).slice(0, 16);
    const favoriteGames = await getFavoriteGames(user.email);

    const friendIds = user.friends || [];
    const mixedIds = [
      ...friendIds.map((id: any) => Number(id)),
      ...friendIds.map((id: any) => String(id))
    ];

    const friendsList = await getUsersByIds(mixedIds);

    res.render("home", {
      user,
      games,
      favoriteGames,
      friendsList
    });
  });

  return router;
}