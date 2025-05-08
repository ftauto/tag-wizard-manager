
import React, { createContext, useState, useContext } from "react";
import { User, UserRole } from "@/types/user";
import { toast } from "sonner";

interface UserContextType {
  users: User[];
  loading: boolean;
  addUser: (name: string, email: string, role: UserRole) => void;
  updateUser: (id: string, name: string, email: string, role: UserRole) => void;
  deleteUser: (id: string) => void;
  selectedUsers: string[];
  toggleUserSelection: (userId: string) => void;
  clearSelectedUsers: () => void;
  getUserById: (userId: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample initial users
const initialUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "editor" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "viewer" },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const addUser = (name: string, email: string, role: UserRole) => {
    if (name.trim() === "" || email.trim() === "") {
      toast.error("User name and email cannot be empty");
      return;
    }

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      toast.error("A user with this email already exists");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
    };

    setUsers([...users, newUser]);
    toast.success(`User "${name}" added successfully`);
  };

  const updateUser = (id: string, name: string, email: string, role: UserRole) => {
    if (name.trim() === "" || email.trim() === "") {
      toast.error("User name and email cannot be empty");
      return;
    }

    if (users.some(user => user.id !== id && user.email.toLowerCase() === email.toLowerCase())) {
      toast.error("A user with this email already exists");
      return;
    }

    setUsers(
      users.map(user => 
        user.id === id ? { ...user, name: name.trim(), email: email.trim().toLowerCase(), role } : user
      )
    );
    toast.success(`User "${name}" updated successfully`);
  };

  const deleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    if (!userToDelete) return;

    setUsers(users.filter(user => user.id !== id));
    setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    toast.success(`User "${userToDelete.name}" deleted successfully`);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prevSelectedUsers =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter(id => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const clearSelectedUsers = () => {
    setSelectedUsers([]);
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        addUser,
        updateUser,
        deleteUser,
        selectedUsers,
        toggleUserSelection,
        clearSelectedUsers,
        getUserById
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
