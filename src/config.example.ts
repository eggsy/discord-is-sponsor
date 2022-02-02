/**
 * Rename this file to `config.ts` before beginning!
 *
 * You have to enable the Developer Mode in your Discord app
 * to the required details for here.
 *
 * Some secrets are also required and are under .env
 * file in the root directory.
 */

const isDev = process.env.NODE_ENV === "development";

export const config = {
  // GitHub username who you want to check followers of
  userLogin: "eggsy",

  // Sponsor settings
  sponsorRoles: ["123123123123123123"],
  guildId: "123123123123123123",

  // Bot settings get it from https://discord.com/developers/applications
  clientId: "123123123123123123",

  // Server settings
  callbackUrl: isDev
    ? "http://localhost:3000/callback"
    : "https://domain.com/callback",
};

export default config;
