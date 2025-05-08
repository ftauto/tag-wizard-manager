
import React, { createContext, useState, useContext, useEffect } from "react";
import { Tag, TagColor } from "@/types/tag";
import { toast } from "sonner";

interface TagContextType {
  tags: Tag[];
  loading: boolean;
  addTag: (name: string, color: TagColor) => void;
  updateTag: (id: string, name: string, color: TagColor, assignedUsers?: string[]) => void;
  deleteTag: (id: string) => void;
  selectedTags: string[];
  toggleTag: (tagId: string) => void;
  clearSelectedTags: () => void;
  assignUsersToTag: (tagId: string, userIds: string[]) => void;
  removeUserFromTag: (tagId: string, userId: string) => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

// Sample initial tags
const initialTags: Tag[] = [
  { id: "1", name: "Important", color: "red", count: 5, assignedUsers: ["1"] },
  { id: "2", name: "Personal", color: "blue", count: 3, assignedUsers: ["2"] },
  { id: "3", name: "Work", color: "green", count: 8, assignedUsers: ["1", "3"] },
  { id: "4", name: "Learning", color: "violet", count: 2, assignedUsers: [] },
  { id: "5", name: "Project", color: "orange", count: 4, assignedUsers: ["2", "3"] },
];

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addTag = (name: string, color: TagColor) => {
    if (name.trim() === "") {
      toast.error("Tag name cannot be empty");
      return;
    }

    if (tags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
      toast.error("A tag with this name already exists");
      return;
    }

    const newTag: Tag = {
      id: Date.now().toString(),
      name: name.trim(),
      color: color,
      count: 0,
      assignedUsers: [],
    };

    setTags([...tags, newTag]);
    toast.success(`Tag "${name}" created successfully`);
  };

  const updateTag = (id: string, name: string, color: TagColor, assignedUsers?: string[]) => {
    if (name.trim() === "") {
      toast.error("Tag name cannot be empty");
      return;
    }

    if (tags.some(tag => tag.id !== id && tag.name.toLowerCase() === name.toLowerCase())) {
      toast.error("A tag with this name already exists");
      return;
    }

    setTags(
      tags.map(tag => 
        tag.id === id ? { 
          ...tag, 
          name: name.trim(), 
          color,
          assignedUsers: assignedUsers !== undefined ? assignedUsers : tag.assignedUsers
        } : tag
      )
    );
    toast.success(`Tag "${name}" updated successfully`);
  };

  const deleteTag = (id: string) => {
    const tagToDelete = tags.find(tag => tag.id === id);
    if (!tagToDelete) return;

    setTags(tags.filter(tag => tag.id !== id));
    setSelectedTags(selectedTags.filter(tagId => tagId !== id));
    toast.success(`Tag "${tagToDelete.name}" deleted successfully`);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter(id => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  const clearSelectedTags = () => {
    setSelectedTags([]);
  };

  const assignUsersToTag = (tagId: string, userIds: string[]) => {
    setTags(
      tags.map(tag =>
        tag.id === tagId ? { ...tag, assignedUsers: userIds } : tag
      )
    );
    toast.success("Users assigned to tag successfully");
  };

  const removeUserFromTag = (tagId: string, userId: string) => {
    const tag = tags.find(t => t.id === tagId);
    if (!tag || !tag.assignedUsers) return;

    const updatedUsers = tag.assignedUsers.filter(id => id !== userId);
    
    setTags(
      tags.map(t =>
        t.id === tagId ? { ...t, assignedUsers: updatedUsers } : t
      )
    );
    toast.success("User removed from tag successfully");
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        loading,
        addTag,
        updateTag,
        deleteTag,
        selectedTags,
        toggleTag,
        clearSelectedTags,
        assignUsersToTag,
        removeUserFromTag
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
};
