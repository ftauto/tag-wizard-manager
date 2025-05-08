
import React, { useState } from "react";
import { useTags } from "@/contexts/TagContext";
import { useUsers } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tag } from "@/types/tag";
import UserBadge from "../user/UserBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserRound, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TagUserAssignmentProps {
  tag: Tag;
  isOpen: boolean;
  onClose: () => void;
}

const TagUserAssignment: React.FC<TagUserAssignmentProps> = ({ tag, isOpen, onClose }) => {
  const { users, getUserById } = useUsers();
  const { assignUsersToTag, removeUserFromTag } = useTags();
  
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(tag.assignedUsers || []);
  
  const handleToggleUser = (userId: string) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };
  
  const handleSave = () => {
    assignUsersToTag(tag.id, selectedUserIds);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Users to Tag: {tag.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Currently Assigned</h4>
            {selectedUserIds.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedUserIds.map(userId => {
                  const user = getUserById(userId);
                  if (!user) return null;
                  return (
                    <div key={userId} className="relative group">
                      <UserBadge 
                        user={user} 
                        size="sm"
                        showRole={false}
                      />
                      <button 
                        onClick={() => handleToggleUser(userId)}
                        className="absolute -top-1 -right-1 bg-red-100 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} className="text-red-600" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">No users assigned to this tag yet</p>
            )}
          </div>
          
          <ScrollArea className="h-60 border rounded-md p-2">
            <div className="space-y-2">
              {users.length > 0 ? (
                users.map(user => (
                  <div key={user.id} className="flex items-center space-x-2 p-1 hover:bg-secondary/50 rounded-md">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUserIds.includes(user.id)}
                      onCheckedChange={() => handleToggleUser(user.id)}
                    />
                    <Label
                      htmlFor={`user-${user.id}`}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <UserBadge user={user} size="sm" showRole={true} />
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No users available</p>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagUserAssignment;
