
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import TagList from "./TagList";
import TagFilter from "./TagFilter";
import { Separator } from "@/components/ui/separator";

const TagDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Tag className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-bold">Tag Management</h1>
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
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Manage Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <TagList />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Tag Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-secondary p-4 text-center">
                <h3 className="text-muted-foreground text-sm">Total Tags</h3>
                <p className="text-3xl font-bold text-primary">5</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <h3 className="text-muted-foreground text-sm">Most Used Tag</h3>
                <p className="text-xl font-medium">Work</p>
                <p className="text-sm text-muted-foreground">8 items</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <h3 className="text-muted-foreground text-sm">Least Used Tag</h3>
                <p className="text-xl font-medium">Learning</p>
                <p className="text-sm text-muted-foreground">2 items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TagDashboard;
