// src/types/Role.ts

export interface Role {
  id: string;
  name: string;
  description: string;
  discordRoleId: string;
  color: number;
  level: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export { AdminDashboard } from "./AdminDashboard";