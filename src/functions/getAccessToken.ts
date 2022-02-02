import axios from "axios";
import { config } from "../config";

export const getAccessToken = async (code: string) => {
  const { data } = await axios.post(
    "https://discordapp.com/api/oauth2/token",
    new URLSearchParams({
      client_id: config.clientId,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: config.callbackUrl,
      code,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data?.access_token;
};

export default getAccessToken;
