
export interface Activity {
  id: string;
  action: ActivityAction;
  entityType: EntityType;
  entityId: string;
  entityName: string;
  userId: string;
  userName: string;
  timestamp: number;
  details?: Record<string, any>;
}

export type ActivityAction = 
  | "create"
  | "update"
  | "delete"
  | "assign"
  | "unassign";

export type EntityType = 
  | "tag"
  | "user";

export const ACTIVITY_ACTION_LABELS: Record<ActivityAction, string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  assign: "Assigned",
  unassign: "Unassigned"
};

export const ACTIVITY_ACTION_COLORS: Record<ActivityAction, string> = {
  create: "bg-green-100 text-green-800",
  update: "bg-blue-100 text-blue-800",
  delete: "bg-red-100 text-red-800",
  assign: "bg-violet-100 text-violet-800",
  unassign: "bg-orange-100 text-orange-800"
};

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  tag: "Tag",
  user: "User"
};
