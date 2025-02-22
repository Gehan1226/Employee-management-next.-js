import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import queryClient from "./lib/util/queryClient";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head></head>
      <body className="blue-background">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}