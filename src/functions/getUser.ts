import axios from "axios";

// Types
import type { User } from "discord.js";

interface Connection {
  type: string;
  name: string;
}

export const getUser = async (accessToken: string) => {
  const emptyData = {
    user: {} as User,
    connections: [],
  };

  const { data: user } = await axios.get<User>(
    "https://discordapp.com/api/users/@me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!user) return emptyData;

  const { data: connections } = await axios.get<Connection[]>(
    "https://discordapp.com/api/users/@me/connections",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (connections?.length === null) return emptyData;

  return {
    user,
    connections,
  };
};

export default getUser;
