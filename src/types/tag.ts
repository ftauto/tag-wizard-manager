
export interface Tag {
  id: string;
  name: string;
  color: string;
  count?: number;
  assignedUsers?: string[]; // Array of user IDs assigned to this tag
}

export type TagColor = 
  | "violet" 
  | "indigo" 
  | "blue" 
  | "green" 
  | "yellow" 
  | "orange" 
  | "red" 
  | "pink"
  | "gray";

export const TAG_COLORS: Record<TagColor, string> = {
  violet: "bg-violet-100 text-violet-800 ring-violet-600/20",
  indigo: "bg-indigo-100 text-indigo-800 ring-indigo-600/20",
  blue: "bg-blue-100 text-blue-800 ring-blue-600/20",
  green: "bg-green-100 text-green-800 ring-green-600/20",
  yellow: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
  orange: "bg-orange-100 text-orange-800 ring-orange-600/20",
  red: "bg-red-100 text-red-800 ring-red-600/20",
  pink: "bg-pink-100 text-pink-800 ring-pink-600/20",
  gray: "bg-gray-100 text-gray-800 ring-gray-600/20",
};
