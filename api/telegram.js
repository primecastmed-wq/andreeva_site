const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8177451986:AAHbx2SCySkEBX77pG9LijcSi1GQi6H2Oqw";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "854248885";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const telegramResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const telegramJson = await telegramResp.json();
    if (!telegramResp.ok) {
      return res.status(502).json({ error: telegramJson?.description || "Telegram API failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
