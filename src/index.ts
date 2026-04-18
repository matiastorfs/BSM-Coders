// To run this in production, type the following commands:
// npm run build
// npm start

import express from "express";
import path from "path";

const app = express();
const root = process.cwd();

app.use(express.static(path.join(root, "public")));
app.use(express.static(path.join(root, "dist")));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
