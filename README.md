# Discord: Is User Sponsor?

A bot that gives roles if a user is supporting you on GitHub! Uses Discord OAuth and Discord GitHub integration to get user's handle and then checks through GitHub GQL API.

## Demo

https://user-images.githubusercontent.com/13917975/152255832-f989ce12-6a60-4e67-9e4f-02120bfa3190.mp4

## Requirements

Make sure they are all installed on your system before setting up this bot.

- Discord bot account (get it from [here](https://discord.com/developers/applications))
- GitHub access token (get it from [here](https://github.com/settings/tokens))
- TypeScript
- [Node.js](https://nodejs.org)

## Configuration

Before doing everything, make sure you have everything set up and ready to go. You'll also have to run `npm install` command or your preffered package manager command to install the dependencies.

- Rename `.env.example` to `.env` and fill `GITHUB_TOKEN`, `DISCORD_BOT_TOKEN` and `DISCORD_CLIENT_SECRET`.
- Rename `src/config.example.ts` to `src/config.ts` and fill the fields.
  - ⚠️ You'll also have to configure the Redirects from your Discord Application settings to the same Callback URL you use in this file.

## Usage

Run the bot and wait until you see **3 successful** messages in your console that states web server, bot and REST has started working fine. Then go to your server where you invited the bot (you have to invite the bot with the `application_commands` scope) and then run the slash command `/get-sponsor-role`. You can also do this by running the same command within the bot's DMs. The bot will send you an OAuth link to log you in and get the connections from your profile. Click on the link and login with your Discord account. It'll get your GitHub name and check if you are sponsoring the given person on GitHub, will give you all the roles that are set in the config if you do.

## Notes

- Since this bot is getting the GitHub username from user's Discord integrations, all users have to connect their GitHub accounts to Discord.

## Backstory

It was created for [@antfu](https://github.com/antfu)'s Discord server.

## Any Problems?

Create an issue and let me know!
