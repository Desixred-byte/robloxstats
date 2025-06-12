import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/roblox-stats", async (req, res) => {
  try {
    const ROBLOX_API = "https://games.roblox.com/v1/games?universeIds=6022383883";
    const response = await fetch(ROBLOX_API);
    const data = await response.json();

    if (data.games && data.games.length > 0) {
      const game = data.games[0];
      return res.json({
        playing: game.playing,
        visits: game.visits
      });
    } else {
      return res.status(404).json({ error: "Game data not found." });
    }
  } catch (err) {
    console.error("Roblox API fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data from Roblox." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Roblox proxy server running at http://localhost:${PORT}`);
});
