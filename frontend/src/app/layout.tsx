import Sidebar from "@/components/Sidebar";
import ChatSidebar from "@/components/ChatSidebar"; // ✅ import chatbot
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main content (offset for sidebar) */}
          <main className="flex-1 ml-20 md:ml-60 p-8 transition-all">
            {children}
          </main>
        </div>

        {/* Right Chat Sidebar (floating button + panel) */}
        <ChatSidebar />
      </body>
    </html>
  );
}
