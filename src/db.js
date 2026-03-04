/**
 * db.js
 * All persistence for the chat application. Uses in-memory store for simplicity.
 * Step 1: In-memory list holds conversation entries { role, content, created_at }.
 * Step 2: save_message appends one entry; get_recent_messages returns last N for context.
 * Step 3: No inline queries; each operation is a named function.
 */

/** In-memory list of messages (role, content, created_at) for conversation history */
const message_store = [];

/**
 * Appends a single message to the store. Used after user or assistant messages.
 * @param {string} role - Either 'user' or 'assistant'
 * @param {string} content - Message text
 */
export function save_message(role, content) {
  message_store.push({
    role,
    content,
    created_at: new Date().toISOString(),
  });
}

/**
 * Returns the last N messages for context (e.g. for OpenAI conversation history).
 * @param {number} limit - Maximum number of messages to return (default 20)
 * @returns {Array<{ role: string, content: string }>} Recent messages, oldest first
 */
export function get_recent_messages(limit = 20) {
  const start = Math.max(0, message_store.length - limit);
  return message_store.slice(start).map((m) => ({ role: m.role, content: m.content }));
}

/**
 * Clears the in-memory store. Useful for testing or optional “new conversation” endpoint.
 */
export function clear_messages() {
  message_store.length = 0;
}
