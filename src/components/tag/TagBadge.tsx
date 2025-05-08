
import React from "react";
import { cn } from "@/lib/utils";
import { Tag, TAG_COLORS } from "@/types/tag";
import { XIcon, Check } from "lucide-react";
import { useTags } from "@/contexts/TagContext";

interface TagBadgeProps {
  tag: Tag;
  selected?: boolean;
  onSelect?: () => void;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  selected = false,
  onSelect,
  showDeleteButton = false,
  onDelete,
}) => {
  const { count } = tag;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset",
        TAG_COLORS[tag.color as keyof typeof TAG_COLORS],
        selected ? "ring-2" : "ring-1",
        "tag-animation"
      )}
      onClick={onSelect}
    >
      {selected && (
        <Check size={14} className="mr-1 flex-shrink-0" />
      )}
      <span>{tag.name}</span>
      {count !== undefined && (
        <span className="ml-1 text-xs opacity-75">({count})</span>
      )}
      {showDeleteButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete();
          }}
          className="ml-1 flex-shrink-0 p-0.5 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
        >
          <XIcon size={12} />
        </button>
      )}
    </div>
  );
};

export default TagBadge;
