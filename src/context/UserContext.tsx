"use client";
import { UserResponse } from "@/types/auth-types";
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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const updateUser = (user: UserResponse) => {
    setUser(user);
  };

  const value = useMemo(() => ({ user, updateUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a UserProvider");
  }
  return context;
};
