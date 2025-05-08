
import React, { useState } from "react";
import { useTags } from "@/contexts/TagContext";
import { useUsers } from "@/contexts/UserContext";
import TagBadge from "./TagBadge";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserRound } from "lucide-react";
import TagModal from "./TagModal";
import TagUserAssignment from "./TagUserAssignment";
import { Tag } from "@/types/tag";
import UserBadge from "../user/UserBadge";

const TagList: React.FC = () => {
  const { tags, deleteTag, toggleTag, selectedTags, clearSelectedTags } = useTags();
  const { getUserById } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagForUserAssignment, setTagForUserAssignment] = useState<Tag | null>(null);
  
  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTag(null);
  };

  const handleOpenUserAssignment = (tag: Tag) => {
    setTagForUserAssignment(tag);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Tags</h3>
        <div className="flex items-center space-x-2">
          {selectedTags.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearSelectedTags}
            >
              Clear ({selectedTags.length})
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon size={16} className="mr-1" /> Add Tag
          </Button>
        </div>
      </div>
      
      {tags.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No tags created yet. Create your first tag to get started.
        </div>
      ) : (
        <div className="grid gap-3">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="group border rounded-lg p-3 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <TagBadge
                  tag={tag}
                  selected={selectedTags.includes(tag.id)}
                  onSelect={() => toggleTag(tag.id)}
                  showDeleteButton={true}
                  onDelete={() => deleteTag(tag.id)}
                />
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleOpenUserAssignment(tag)}
                  >
                    <UserRound size={14} className="mr-1" /> 
                    Assign Users
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleEdit(tag)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              
              {tag.assignedUsers && tag.assignedUsers.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-xs text-muted-foreground mb-1">Assigned Users:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tag.assignedUsers.map(userId => {
                      const user = getUserById(userId);
                      if (!user) return null;
                      return (
                        <UserBadge 
                          key={userId} 
                          user={user} 
                          size="sm" 
                          showRole={false}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <TagModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        editTag={editingTag}
      />
      
      {tagForUserAssignment && (
        <TagUserAssignment
          tag={tagForUserAssignment}
          isOpen={!!tagForUserAssignment}
          onClose={() => setTagForUserAssignment(null)}
        />
      )}
    </div>
  );
};

export default TagList;
