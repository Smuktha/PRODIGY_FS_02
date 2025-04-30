// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css"; // ✅ use relative path inside the app directory
// Import global styles

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Employee Management System</title>
      </head>
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Employee Management System</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>&copy; 2025 Employee Management System</p>
        </footer>
      </body>
    </html>
  );
}
