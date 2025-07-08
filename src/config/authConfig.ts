// src/config/authConfig.ts
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  fetchOptions: {
    credentials: "include",
  },
});

export default authClient;
