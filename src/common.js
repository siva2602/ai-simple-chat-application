/**
 * common.js
 * Shared utilities for the chat application: logging, env loading, and helpers.
 * Step 1: Load dotenv so process.env is populated.
 * Step 2: logInfo / logError write to stdout/stderr with timestamp.
 * Step 3: get_env reads and optionally validates required env vars.
 */

import dotenv from "dotenv";

// Load .env from project root so PORT and OPENAI_API_KEY are available
dotenv.config();

/**
 * Logs an info message to stdout with ISO timestamp.
 * @param {string} message - Message to log
 * @param {object} [meta] - Optional object to log (e.g. { request_id, user_id })
 */
export function logInfo(message, meta = null) {
  const ts = new Date().toISOString();
  const extra = meta ? ` ${JSON.stringify(meta)}` : "";
  console.log(`[${ts}] INFO ${message}${extra}`);
}

/**
 * Logs an error to stderr with ISO timestamp. Use for exceptions and failures.
 * @param {string} message - Error description
 * @param {Error|object} [err] - Optional Error or object (e.g. { code, stack })
 */
export function logError(message, err = null) {
  const ts = new Date().toISOString();
  const extra = err instanceof Error ? ` ${err.message}` : err ? ` ${JSON.stringify(err)}` : "";
  console.error(`[${ts}] ERROR ${message}${extra}`);
  if (err instanceof Error && err.stack) {
    console.error(err.stack);
  }
}

/**
 * Reads an environment variable. Throws if required and missing.
 * @param {string} key - Env key (e.g. 'PORT', 'OPENAI_API_KEY')
 * @param {{ required?: boolean, default?: string }} [opts] - If required true and key missing, throws; default used when key is missing
 * @returns {string} Value or default
 */
export function get_env(key, opts = {}) {
  const { required = false, default: default_val } = opts;
  const raw = process.env[key];
  const value = raw !== undefined && raw !== "" ? raw : default_val;
  if (required && (value === undefined || value === "")) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? "";
}
