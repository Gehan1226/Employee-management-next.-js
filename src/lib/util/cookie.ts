"use server";
import { cookies } from "next/headers";

export async function createAuthCookie(token: string) {
    (await cookies()).set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
}

export async function clearAuthCookie() {
  (await cookies()).delete("accessToken");
}