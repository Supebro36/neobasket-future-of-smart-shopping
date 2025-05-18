
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIAssistantChat from "../AIAssistantChat";
import { useAIAssistant } from "../../contexts/AIAssistantContext";

export default function Layout() {
  const { isOpen } = useAIAssistant();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {isOpen && <AIAssistantChat />}
    </div>
  );
}
