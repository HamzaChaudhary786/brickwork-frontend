// src/config/authConfig.ts
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    inferAdditionalFields({
      user: {
        name: { type: "string" },
        username: { type: "string" },
        steamId: { type: "string", required: false },
        starCitizenId: { type: "string", required: false }
      }
    })
  ],
});

export default authClient;


