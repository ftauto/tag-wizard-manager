
import React, { createContext, useState, useContext, useEffect } from "react";
import { Tag, TagColor } from "@/types/tag";
import { toast } from "sonner";

interface TagContextType {
  tags: Tag[];
  loading: boolean;
  addTag: (name: string, color: TagColor) => void;
  updateTag: (id: string, name: string, color: TagColor) => void;
  deleteTag: (id: string) => void;
  selectedTags: string[];
  toggleTag: (tagId: string) => void;
  clearSelectedTags: () => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

// Sample initial tags
const initialTags: Tag[] = [
  { id: "1", name: "Important", color: "red", count: 5 },
  { id: "2", name: "Personal", color: "blue", count: 3 },
  { id: "3", name: "Work", color: "green", count: 8 },
  { id: "4", name: "Learning", color: "violet", count: 2 },
  { id: "5", name: "Project", color: "orange", count: 4 },
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
    };

    setTags([...tags, newTag]);
    toast.success(`Tag "${name}" created successfully`);
  };

  const updateTag = (id: string, name: string, color: TagColor) => {
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
        tag.id === id ? { ...tag, name: name.trim(), color } : tag
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
        clearSelectedTags
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
