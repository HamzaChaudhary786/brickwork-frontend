// src/api/roleApi.ts

import { Role } from "../screens/AdminDashboard";

export async function getAllRoles(): Promise<Role[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rbac/roles/1/10`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.result)) {
      throw new Error("Invalid roles response");
    }

    return data.result as Role[];

  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw error;
  }
}
