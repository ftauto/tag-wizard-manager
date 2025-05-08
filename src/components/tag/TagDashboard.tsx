
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, UserRound, Activity as ActivityIcon } from "lucide-react";
import TagList from "./TagList";
import TagFilter from "./TagFilter";
import UserList from "../user/UserList";
import ActivityLog from "../activity/ActivityLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUsers } from "@/contexts/UserContext";
import { useTags } from "@/contexts/TagContext";

const TagDashboard: React.FC = () => {
  const { users } = useUsers();
  const { tags } = useTags();
  
  // Find most assigned user
  const userAssignmentCounts = users.map(user => {
    let count = 0;
    tags.forEach(tag => {
      if (tag.assignedUsers?.includes(user.id)) {
        count++;
      }
    });
    return { userId: user.id, name: user.name, count };
  });
  
  const mostAssignedUser = userAssignmentCounts.length > 0 
    ? userAssignmentCounts.reduce((prev, current) => 
        (prev.count > current.count) ? prev : current) 
    : null;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Tag className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-bold">Tag & User Management</h1>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Tag Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <TagFilter />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="tags" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="tags">
              <Tag className="h-4 w-4 mr-2" /> Tags
            </TabsTrigger>
            <TabsTrigger value="users">
              <UserRound className="h-4 w-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="activity">
              <ActivityIcon className="h-4 w-4 mr-2" /> Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tags">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Manage Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <TagList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <UserList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>
        </Tabs>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-secondary p-4 text-center">
                <h3 className="text-muted-foreground text-sm">Total Tags</h3>
                <p className="text-3xl font-bold text-primary">{tags.length}</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <h3 className="text-muted-foreground text-sm">Total Users</h3>
                <p className="text-3xl font-bold text-primary">{users.length}</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <h3 className="text-muted-foreground text-sm">Most Tagged User</h3>
                {mostAssignedUser && mostAssignedUser.count > 0 ? (
                  <>
                    <p className="text-xl font-medium">{mostAssignedUser.name}</p>
                    <p className="text-sm text-muted-foreground">{mostAssignedUser.count} tags</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No assignments yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TagDashboard;
