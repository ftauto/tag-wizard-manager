
import React from "react";
import { useActivities } from "@/contexts/ActivityContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, ACTIVITY_ACTION_LABELS, ACTIVITY_ACTION_COLORS, ENTITY_TYPE_LABELS } from "@/types/activity";
import { formatDistanceToNow } from "date-fns";
import { UserRound, Tag, Activity as ActivityIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ActivityLog: React.FC = () => {
  const { activities, clearActivities } = useActivities();

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "user":
        return <UserRound size={16} className="mr-1" />;
      case "tag":
        return <Tag size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center">
          <ActivityIcon size={20} className="mr-2" /> Activity Log
        </CardTitle>
        {activities.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearActivities}>
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {activities.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No activities recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { action, entityType, entityName, userName, timestamp } = activity;

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <UserRound size={16} />;
      case "tag":
        return <Tag size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-b pb-3 last:border-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <Badge variant="outline" className={`mr-2 ${ACTIVITY_ACTION_COLORS[action]}`}>
            {ACTIVITY_ACTION_LABELS[action]}
          </Badge>
          <span className="flex items-center text-sm font-medium">
            {getEntityIcon(entityType)}
            <span className="mx-1">{ENTITY_TYPE_LABELS[entityType]}:</span>
            <span className="font-semibold">{entityName}</span>
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
      </div>
      <div className="text-sm text-muted-foreground">
        by <span className="font-medium">{userName}</span>
      </div>
    </div>
  );
};

export default ActivityLog;
