
import React, { useState } from "react";
import { useTags } from "@/contexts/TagContext";
import TagBadge from "./TagBadge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TagModal from "./TagModal";
import { Tag } from "@/types/tag";

const TagList: React.FC = () => {
  const { tags, deleteTag, toggleTag, selectedTags, clearSelectedTags } = useTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  
  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTag(null);
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
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="group relative"
              onDoubleClick={() => handleEdit(tag)}
            >
              <TagBadge
                tag={tag}
                selected={selectedTags.includes(tag.id)}
                onSelect={() => toggleTag(tag.id)}
                showDeleteButton={true}
                onDelete={() => deleteTag(tag.id)}
              />
            </div>
          ))}
        </div>
      )}

      <TagModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        editTag={editingTag}
      />
    </div>
  );
};

export default TagList;
