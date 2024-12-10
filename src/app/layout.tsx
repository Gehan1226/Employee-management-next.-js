import "./globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <head>
      </head>
      <body className="blue-background">
        {children}
      </body>
    </html>
  );
}
