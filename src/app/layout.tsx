"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import queryClient from "@/lib/util/queryClient";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head></head>
      <body className="blue-background">
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
