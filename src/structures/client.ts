import { Client, Collection, CommandInteraction } from "discord.js";
import { config } from "../config";

// Helpers
import logger from "../helpers/console";

export class ClientController {
  client: Client = null;

  constructor() {
    this.client = new Client({
      intents: [],
      presence: {
        activities: [{ name: "for your commands", type: "WATCHING" }],
      },
      makeCache: () => new Collection(),
    });

    this.load();
  }

  async load() {
    await this.client.login(process.env.DISCORD_BOT_TOKEN);

    this.client.on("ready", this.handleReady);
    await this.setupRest();
  }

  async handleReady() {
    logger.success(
      "Client successfully connected to Discord. Setting up the REST now..."
    );
  }

  async setupRest() {
    await this.client.application.commands.set([
      {
        name: "get-sponsor-role",
        description: `Checks if your connected GitHub account is a sponsor of ${config.userLogin}`,
      },
    ]);

    this.client.on("interactionCreate", this.handleInteraction);
    logger.success(
      "Commands successfully applied to the application. Listening for interactions..."
    );
  }

  async setUserRole(userId: string, githubHandle: string) {
    const guild = await this.client.guilds.fetch(config.guildId);
    const user = await guild.members.fetch(userId);

    const roles = [];

    for (const role of config.sponsorRoles) {
      const fetchRole = await guild.roles.fetch(role);
      roles.push(fetchRole);
    }

    if (roles.length > 0) await user.roles.add(roles);
    await user.send(
      `✨ There you go \`${githubHandle}\`, you're a sponsor!`
    );
  }

  async handleInteraction(interaction: CommandInteraction) {
    if (
      !interaction.isCommand() ||
      interaction.commandName !== "get-sponsor-role"
    )
      return;

    const user = interaction.user;

    const message = await user.send(`
    > Note that this bot will look for your __GitHub connection from your Discord profile__. If you haven't done so, please go to **User Settings > Connections** and connect your GitHub account to your Discord account!\n\n:link: Please login from here: https://discord.com/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${config.callbackUrl}&scope=identify+connections
    `);

    interaction.reply({
      content: `[Please check your DMs!](${message.url})`,
      ephemeral: true,
    });
  }
}

export default ClientController;
