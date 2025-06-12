export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://games.roblox.com/v1/games?universeIds=4838322068"
    );
    const data = await response.json();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Roblox stats:", error);
    res.status(500).json({ error: "Failed to fetch data from Roblox." });
  }
}
