/**
 * routes/chat.js
 * Chat API route: POST /chat accepts { message }, stores it, returns { received: true }. No auto-reply.
 * Step 1: Run chat_assistant_key_middleware to check CHAT_ASSISTANT_KEY from .env.
 * Step 2: Validate body with validation.validate_chat_message.
 * Step 3: Call chat-service.receive_message; respond with { received: true }. Logs and error responses on failure.
 */

import { logInfo, logError } from "../common.js";
import { chat_assistant_key_middleware } from "../middleware/chat-auth.js";
import { validate_chat_message } from "../validation.js";
import { receive_message } from "../chat-service.js";

/**
 * Registers the POST /chat route on the given Express app.
 * @param {import('express').Express} app - Express application instance
 */
export function register_chat_routes(app) {
  app.post("/chat", chat_assistant_key_middleware, async (req, res) => {
    const validation = validate_chat_message(req.body);
    if (!validation.valid) {
      logInfo("Chat validation failed", { error: validation.error });
      res.status(400).json({ error: validation.error });
      return;
    }
    const message = req.body.message.trim();
    try {
      await receive_message(message);
      res.json({ received: true });
    } catch (err) {
      logError("Chat receive failed", err);
      res.status(500).json({ error: "Failed to receive message" });
    }
  });
}
