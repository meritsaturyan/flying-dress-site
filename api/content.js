const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "server", "content", "content.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Failed to read content.json", details: String(e) });
  }
};
