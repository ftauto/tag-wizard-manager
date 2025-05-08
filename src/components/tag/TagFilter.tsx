
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTags } from "@/contexts/TagContext";
import TagBadge from "./TagBadge";
import { Tag } from "@/types/tag";
import { Search, Filter, X } from "lucide-react";

const TagFilter: React.FC = () => {
  const { tags, toggleTag, selectedTags, clearSelectedTags } = useTags();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          {searchQuery && (
            <button 
              className="absolute right-2 top-2.5"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className={showFilterPanel ? "bg-secondary" : ""}
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {selectedTags.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearSelectedTags}
          >
            Clear ({selectedTags.length})
          </Button>
        )}
      </div>
      
      {showFilterPanel && (
        <div className="p-4 border rounded-md glass-effect shadow-sm">
          <div className="mb-2 font-medium">Filter by Tags</div>
          {filteredTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  selected={selectedTags.includes(tag.id)}
                  onSelect={() => toggleTag(tag.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No tags found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagFilter;
