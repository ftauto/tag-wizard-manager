
import React, { useState } from "react";
import { useUsers } from "@/contexts/UserContext";
import UserBadge from "./UserBadge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import UserModal from "./UserModal";
import { User } from "@/types/user";
import { Input } from "@/components/ui/input";

const UserList: React.FC = () => {
  const { users, deleteUser, toggleUserSelection, selectedUsers, clearSelectedUsers } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Users</h3>
        <div className="flex items-center space-x-2">
          {selectedUsers.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearSelectedUsers}
            >
              Clear ({selectedUsers.length})
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon size={16} className="mr-1" /> Add User
          </Button>
        </div>
      </div>

      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      
      {filteredUsers.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          {searchQuery ? "No users match your search." : "No users added yet."}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="group relative"
              onDoubleClick={() => handleEdit(user)}
            >
              <UserBadge
                user={user}
                selected={selectedUsers.includes(user.id)}
                onSelect={() => toggleUserSelection(user.id)}
                showDeleteButton={true}
                onDelete={() => deleteUser(user.id)}
              />
            </div>
          ))}
        </div>
      )}

      <UserModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        editUser={editingUser}
      />
    </div>
  );
};

export default UserList;
