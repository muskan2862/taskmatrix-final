import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";

export const metadata = {
  title: "TaskMatrix",
  description: "Task Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster 
        richColors 
        position="top-right"
        closeButton 
        expand={true} 
        duration={3000} 
        />
      </body>
    </html>
  );
}