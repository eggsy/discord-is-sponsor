import logger from "../helpers/console";
import { config } from "../config";
import fastify from "fastify";

// Functions
import isUserSponsor from "../functions/isUserSponsor";
import getAccessToken from "../functions/getAccessToken";
import getUser from "../functions/getUser";

// Classes
import ClientController from "./client";

export class ServerController {
  server = fastify();
  client: ClientController;

  // Declare a route
  constructor(client: ClientController) {
    this.client = client;
    this.setupRoute();
  }

  async setupRoute() {
    this.server.get("/callback", async (request) => {
      const query = request.query as { code?: string };

      if (!query || !query?.code)
        return { error: true, message: "No code provided" };

      // Fetch temporary access token from Discord API
      const accessToken = await getAccessToken(query.code);
      if (!accessToken)
        return { error: true, message: "Couldn't get an access token." };

      // Fetch user information from Discord
      const userData = await getUser(accessToken);

      if (userData?.connections?.length === 0)
        return {
          error: true,
          message:
            "You don't have any connections on your Discord account. You need to connect your GitHub account to your GitHub account to get the sponsor role(s).",
        };

      const githubConnection = userData.connections?.find(
        (i) => i.type === "github"
      );

      if (!githubConnection)
        return {
          error: true,
          message:
            "You haven't connected your Discord account to your GitHub account. Please do that and try again!",
        };

      const isSponsor = await isUserSponsor(githubConnection.name);
      if (isSponsor)
        await this.client.setUserRole(userData.user.id, githubConnection.name);
      else
        return {
          error: false,
          message: `You are not a sponsor of ${config.userLogin}.`,
        };

      return {
        error: false,
        message:
          "Successfully given you the Sponsor role(s)! Thanks for verifying.",
      };
    });
  }

  async start() {
    try {
      const url = await this.server.listen(3000);
      logger.success(`Web server running on: ${url}`);
    } catch (err) {
      logger.error(err);
    }
  }
}

export default ServerController;
