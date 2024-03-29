import { urls } from "@/constants/urls";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: urls.auth.loginCallback,
    authorizationParams: {
      connection: "worldcoin",
    },
  }),
});
