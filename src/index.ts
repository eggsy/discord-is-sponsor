import { config as loadEnv } from "dotenv";

// Import structures
import ClientController from "./structures/client";
import ServerController from "./structures/server";

loadEnv();
if (!process.env.DISCORD_BOT_TOKEN)
  throw new Error("No DISCORD_BOT_TOKEN found in .env");

const client = new ClientController();
const server = new ServerController(client);

// Start the server
server.start();
