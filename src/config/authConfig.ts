// src/config/authConfig.ts
import { createAuthClient } from "better-auth/react";

// const authClient = createAuthClient({
//   baseURL: "http://localhost:8080", // Your backend base URL
// });
const authClient = createAuthClient({
  baseURL: "https://unnamed-temp.onrender.com", // Your backend base URL
});
export default authClient;