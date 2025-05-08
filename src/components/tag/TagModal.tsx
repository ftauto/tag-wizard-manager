
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTags } from "@/contexts/TagContext";
import { Tag, TagColor, TAG_COLORS } from "@/types/tag";
import { cn } from "@/lib/utils";

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTag: Tag | null;
}

const colorOptions: TagColor[] = [
  "violet",
  "indigo",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "gray",
];

const TagModal: React.FC<TagModalProps> = ({ isOpen, onClose, editTag }) => {
  const { addTag, updateTag } = useTags();
  const [name, setName] = useState("");
  const [color, setColor] = useState<TagColor>("violet");

  useEffect(() => {
    if (editTag) {
      setName(editTag.name);
      setColor(editTag.color as TagColor);
    } else {
      setName("");
      setColor("violet");
    }
  }, [editTag, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editTag) {
      updateTag(editTag.id, name, color);
    } else {
      addTag(name, color);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editTag ? "Edit Tag" : "Create New Tag"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tag Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter tag name"
                autoFocus
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Tag Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((colorOption) => (
                  <div
                    key={colorOption}
                    className={cn(
                      "w-8 h-8 rounded-full cursor-pointer transition-all",
                      TAG_COLORS[colorOption].split(" ")[0],
                      color === colorOption ? "ring-2 ring-offset-2 ring-primary" : ""
                    )}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2">
              <Label>Preview</Label>
              <div className="flex items-center mt-1">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset",
                    TAG_COLORS[color]
                  )}
                >
                  {name || "Tag Preview"}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {editTag ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TagModal;
