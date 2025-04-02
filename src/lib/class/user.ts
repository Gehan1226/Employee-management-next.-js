import { UserResponse, UserRole } from "@/types/auth-types";

class User {
  private static instance: User;

  private user: UserResponse | null = null;

  private constructor() {}

  public static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  setUser(user: UserResponse): void {
    this.user = user;
  }

  getUser(): UserResponse | null {
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }

  hasRole(role: UserRole): boolean {
    return this.user?.roleList.includes(role) || false;
  }
}

export default User.getInstance();