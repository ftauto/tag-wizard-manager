
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export type UserRole = "admin" | "editor" | "viewer";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer"
};

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  admin: "bg-violet-100 text-violet-800 ring-violet-600/20",
  editor: "bg-blue-100 text-blue-800 ring-blue-600/20",
  viewer: "bg-green-100 text-green-800 ring-green-600/20"
};

