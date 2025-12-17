const fs = require("fs");
const path = require("path");

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    const body = req.body && typeof req.body === "object" ? req.body : await readJsonBody(req);

    const payload = {
      name: String(body?.name || "").trim(),
      date: String(body?.date || "").trim(),
      whatsapp: String(body?.whatsapp || "").trim(),
      comment: String(body?.comment || "").trim(),
      lang: String(body?.lang || "").trim(),
      createdAt: new Date().toISOString()
    };

    // демо-сохранение (на Vercel это временно, но для теста формы норм)
    const outPath = path.join("/tmp", "leads.json");
    let arr = [];
    try {
      arr = JSON.parse(fs.readFileSync(outPath, "utf-8"));
      if (!Array.isArray(arr)) arr = [];
    } catch {}
    arr.unshift(payload);
    fs.writeFileSync(outPath, JSON.stringify(arr, null, 2), "utf-8");

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
};
