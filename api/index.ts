
import type { IncomingMessage, ServerResponse } from "node:http";
import { app } from "../src/app.ts";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await app.ready();
  app.server.emit("request", req, res);
}
