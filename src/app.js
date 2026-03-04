/**
 * app.js
 * Express application: JSON body parser, static files for web UI, and chat API.
 * Step 1: Use express.json() for POST /chat body. Step 2: Serve public/ as static.
 * Step 3: Mount chat routes. Step 4: Export app for index.js to listen.
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { register_chat_routes } from "./routes/chat.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Parse JSON request bodies (e.g. for POST /chat)
app.use(express.json());

// Serve static files from public/ (web UI)
const public_dir = path.join(__dirname, "..", "public");
app.use(express.static(public_dir));

// Register chat API route
register_chat_routes(app);

export default app;
