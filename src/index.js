/**
 * index.js
 * Entry point: loads .env via common, starts Express server on PORT.
 * Step 1: get_env('PORT') with default 3000. Step 2: app.listen and logInfo when ready.
 */

import app from "./app.js";
import { get_env, logInfo, logError } from "./common.js";

const port = Number(get_env("PORT", { default: "3000" })) || 3000;

app.listen(port, () => {
  logInfo(`Chat server listening on http://localhost:${port}`);
}).on("error", (err) => {
  logError("Server failed to start", err);
  process.exitCode = 1;
});
