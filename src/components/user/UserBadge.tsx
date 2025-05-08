
import React from "react";
import { cn } from "@/lib/utils";
import { User, USER_ROLE_COLORS } from "@/types/user";
import { XIcon, Check, UserRound } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserBadgeProps {
  user: User;
  selected?: boolean;
  onSelect?: () => void;
  showDeleteButton?: boolean;
  onDelete?: () => void;
  showRole?: boolean;
  size?: "sm" | "md" | "lg";
}

const UserBadge: React.FC<UserBadgeProps> = ({
  user,
  selected = false,
  onSelect,
  showDeleteButton = false,
  onDelete,
  showRole = true,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-xs gap-1.5 py-0.5 px-2",
    md: "text-sm gap-2 py-1 px-3",
    lg: "text-base gap-2 py-1.5 px-4",
  };

  const avatarSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-secondary/80 text-secondary-foreground font-medium ring-1 ring-inset ring-gray-200 dark:ring-gray-800 hover:bg-secondary transition-colors cursor-pointer",
        sizeClasses[size],
        selected && "ring-2 ring-primary"
      )}
      onClick={onSelect}
    >
      <Avatar className={avatarSizes[size]}>
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <AvatarFallback>
            <UserRound className="h-3/4 w-3/4" />
          </AvatarFallback>
        )}
      </Avatar>
      <span>{user.name}</span>
      {selected && (
        <Check size={size === "sm" ? 12 : 14} className="ml-1 flex-shrink-0" />
      )}
      {showRole && (
        <span
          className={cn(
            "px-1.5 rounded-full text-xs",
            USER_ROLE_COLORS[user.role]
          )}
        >
          {user.role}
        </span>
      )}
      {showDeleteButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete();
          }}
          className="ml-1 flex-shrink-0 p-0.5 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
        >
          <XIcon size={size === "sm" ? 12 : 14} />
        </button>
      )}
    </div>
  );
};

export default UserBadge;
