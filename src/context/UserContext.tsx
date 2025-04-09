"use client";
import { UserResponse } from "@/types/auth-types";
import { EmployeeResponse } from "@/types/employee";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

type UserContextType = {
  user: UserResponse | null;
  employee: EmployeeResponse | null;
  updateUser: (user: UserResponse) => void;
  updateEmployee: (employee: EmployeeResponse) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [employee, setEmployee] = useState<EmployeeResponse | null>(null);

  const updateUser = (user: UserResponse) => {
    setUser(user);
  };

  const updateEmployee = (employee: EmployeeResponse) => {
    setEmployee(employee);
  };

  const value = useMemo(
    () => ({
      user,
      employee,
      updateUser,
      updateEmployee,
    }),
    [user, employee]
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
