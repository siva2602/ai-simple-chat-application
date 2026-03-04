/**
 * validation.js
 * Input validation for the chat application. All validation helpers live here.
 * Step 1: validate_chat_message ensures message is a non-empty string within length limit.
 * Step 2: Returns { valid: boolean, error?: string } for use by routes.
 */

/** Maximum allowed length for a single chat message (characters) */
const MAX_MESSAGE_LENGTH = 10000;

/**
 * Validates the body of a chat request: message must be a non-empty string within limit.
 * @param {unknown} body - Request body (typically { message: string })
 * @returns {{ valid: true } | { valid: false, error: string }}
 */
export function validate_chat_message(body) {
  if (body === null || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object" };
  }
  const message = body.message;
  if (message === undefined || message === null) {
    return { valid: false, error: "Missing field: message" };
  }
  if (typeof message !== "string") {
    return { valid: false, error: "Field message must be a string" };
  }
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Message cannot be empty" };
  }
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message must be at most ${MAX_MESSAGE_LENGTH} characters` };
  }
  return { valid: true };
}
