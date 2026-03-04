/**
 * chat-auth.js
 * Middleware that checks CHAT_BOT_URL and CHAT_ASSISTANT_KEY from .env for /chat requests.
 * Step 1: Read CHAT_ASSISTANT_KEY from env; if set, require request header x-chat-assistant-key to match.
 * Step 2: Respond 401 when key is missing or invalid. CHAT_BOT_URL is for client use; middleware only checks key.
 */

import { get_env, logInfo } from "../common.js";

/** Header name the client must send with the assistant key */
const CHAT_ASSISTANT_KEY_HEADER = "x-chat-assistant-key";

/**
 * Middleware that validates CHAT_ASSISTANT_KEY: when set in .env, requests must send the same key in x-chat-assistant-key header.
 * When CHAT_ASSISTANT_KEY is not set, all requests are allowed (backward compatible).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function chat_assistant_key_middleware(req, res, next) {
  const expected_key = get_env("CHAT_ASSISTANT_KEY");
  if (!expected_key) {
    next();
    return;
  }
  const sent_key = req.get(CHAT_ASSISTANT_KEY_HEADER) || req.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!sent_key || sent_key !== expected_key) {
    logInfo("Chat request rejected: missing or invalid CHAT_ASSISTANT_KEY");
    res.status(401).json({ error: "Missing or invalid chat assistant key" });
    return;
  }
  next();
}
