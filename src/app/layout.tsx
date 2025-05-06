"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import queryClient from "@/lib/util/queryClient";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head></head>
      <body className="blue-background">
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Toaster position="top-right" />
            {children}
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
