
import React, { createContext, useState, useContext } from "react";
import { Activity, ActivityAction, EntityType } from "@/types/activity";

interface ActivityContextType {
  activities: Activity[];
  addActivity: (
    action: ActivityAction,
    entityType: EntityType,
    entityId: string,
    entityName: string,
    userId?: string,
    userName?: string,
    details?: Record<string, any>
  ) => void;
  clearActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  
  const addActivity = (
    action: ActivityAction,
    entityType: EntityType,
    entityId: string,
    entityName: string,
    userId: string = "system",
    userName: string = "System",
    details?: Record<string, any>
  ) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      action,
      entityType,
      entityId,
      entityName,
      userId,
      userName,
      timestamp: Date.now(),
      details
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 100)); // Keep only the last 100 activities
  };

  const clearActivities = () => {
    setActivities([]);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        clearActivities
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error("useActivities must be used within an ActivityProvider");
  }
  return context;
};
