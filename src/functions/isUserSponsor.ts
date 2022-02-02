import axios from "axios";
import { config } from "../config";

// Helpers
import logger from "../helpers/console";

// Types
interface SponsorResult {
  errors?: { type: string; message: string }[];
  data: {
    user?: {
      isSponsoredBy: boolean;
    };
  };
}

const isUserSponsor = async (userLogin: string) => {
  const { data: response } = await axios.post<SponsorResult>(
    "https://api.github.com/graphql",
    {
      query: `
        query {
          user(login: "${config.userLogin}") {
            isSponsoredBy(accountLogin: "${userLogin}")
          }
        }
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  if (response.errors?.length > 0) {
    logger.error(
      `Error while getting the sponsor status of ${userLogin}: ${response.errors[0].message}`
    );

    return false;
  }

  return response?.data?.user?.isSponsoredBy || false;
};

export default isUserSponsor;
