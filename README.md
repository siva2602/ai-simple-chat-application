# AI Simple Chat Application

Node.js chat application with a REST API and web UI. Supports optional OpenAI for AI replies; without an API key it echoes your message.

## Structure

- **src/common.js** – Logging (`logInfo`, `logError`) and env helper (`get_env`)
- **src/validation.js** – Input validation for chat messages
- **src/db.js** – In-memory message store (save_message, get_recent_messages)
- **src/chat-service.js** – Reply logic: OpenAI if `OPENAI_API_KEY` is set, else echo
- **src/routes/chat.js** – `POST /chat` handler
- **src/app.js** – Express app (JSON parser, static files, routes)
- **src/index.js** – Server entry point
- **public/index.html** – Web UI for chatting

## Setup

1. Install dependencies:

   ```bash
   cd ai-simple-chat-application
   npm install
   ```

2. Copy env example and optionally set OpenAI key:

   ```bash
   cp .env.example .env
   # Edit .env: set PORT (default 3000) and optionally OPENAI_API_KEY
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open http://localhost:3000 in a browser to use the chat UI.

## API

- **POST /chat**  
  Body: `{ "message": "your text" }`  
  Response: `{ "reply": "assistant reply" }`  
  Use this as `chat_bot_url` (e.g. `http://localhost:3000`) for the ai-chat-assistant CLI.

## Environment variables

| Variable          | Required | Default           | Description                          |
|-------------------|----------|-------------------|--------------------------------------|
| PORT              | No       | 3000              | Server port                          |
| OPENAI_API_KEY    | No       | -                 | If set, replies use OpenAI           |
| OPENAI_MODEL      | No       | gpt-3.5-turbo     | Model for chat completions           |
