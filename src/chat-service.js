/**
 * chat-service.js
 * Handles incoming messages: stores user message only; no auto-reply. Reply flow will be defined later.
 * Step 1: receive_message saves the user message to db and returns null (no reply).
 * Step 2: get_reply is kept for optional use when a reply flow is added later.
 */

import { logInfo } from "./common.js";
import { save_message } from "./db.js";

/**
 * Accepts and stores the user message. Does not generate or return any reply.
 * @param {string} user_message - Trimmed user message
 * @returns {Promise<null>} Always null; reply flow to be defined later
 */
export async function receive_message(user_message) {
  save_message("user", user_message);
  logInfo("Message received (no auto-reply)");
  return null;
}
