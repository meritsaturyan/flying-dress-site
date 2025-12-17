module.exports = async (req, res) => {
    try {
      if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  
      let body = "";
      await new Promise((resolve) => {
        req.on("data", (c) => (body += c));
        req.on("end", resolve);
      });
  
      const payload = body ? JSON.parse(body) : {};
      console.log("NEW LEAD:", payload); // на Vercel это будет видно в Logs
  
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Bad request", details: String(e) });
    }
  };
  