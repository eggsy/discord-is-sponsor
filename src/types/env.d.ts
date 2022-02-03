declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string;
      DISCORD_BOT_TOKEN: string;
      DISCORD_CLIENT_SECRET: string;
    }
  }
}

export {}
