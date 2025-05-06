"use client";
import { UserResponse } from "@/types/auth-types";
import { ManagerResponse } from "@/types/manager";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

type UserContextType = {
  user: UserResponse | null;
  updateUser: (user: UserResponse) => void;
  manager: ManagerResponse | null;
  updateManager: (manager: ManagerResponse) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [manager, setManager] = useState<ManagerResponse | null>(null);

  const updateUser = (user: UserResponse) => {
    setUser(user);
  };

  const updateManager = (manager: ManagerResponse) => {
    setManager(manager);
  };

  const value = useMemo(
    () => ({ user, updateUser, manager, updateManager }),
    [user, manager]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a UserProvider");
  }
  return context;
};
