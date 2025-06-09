
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIAssistantChat from "../AIAssistantChat";
import { useAIAssistant } from "../../contexts/AIAssistantContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isOpen } = useAIAssistant();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {isOpen && <AIAssistantChat />}
    </div>
  );
}
