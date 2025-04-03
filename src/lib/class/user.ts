import { UserResponse, UserRole } from "@/types/auth-types";
import { EmployeeResponse } from "@/types/employee";

export class User {
  private static instance: User;
  private user: UserResponse | null = null;
  private employee: EmployeeResponse | null = null;

  private constructor() {}

  public static getInstance(): User {
    console.log("User instance created", User.instance);
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  setUser(user: UserResponse): void {
    this.user = user;
  }

  setEmployee(employee: EmployeeResponse): void {
    this.employee = employee;
  }

  getUser(): UserResponse | null {
    return this.user;
  }

  getEmployee(): EmployeeResponse | null {
    return this.employee;
  }

  clearUser(): void {
    this.user = null;
  }

  clearEmployee(): void {
    this.employee = null;
  }

  hasRole(role: UserRole): boolean {
    return this.user?.roleList.includes(role) || false;
  }
}