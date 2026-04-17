const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/api/:file.json", (req: any, res: any) => {
  const path = require("path");
  const fs = require("fs");

  const filePath = path.join(__dirname, "data", `${req.params.file}.json`);

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(raw));
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// To run this with nodemon, you type:
// npm start
