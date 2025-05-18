
import React, { createContext, useContext, useState } from "react";
import { AIChatMessage } from "../types";
import { toast } from "sonner";

interface AIAssistantContextType {
  messages: AIChatMessage[];
  isOpen: boolean;
  toggleChatWindow: () => void;
  sendMessage: (message: string) => void;
  clearMessages: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      message: "Hi there! I'm your NeoBasket shopping assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const generateResponse = (userMessage: string): string => {
    // Simple response generation for MVP
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I assist with your shopping today?";
    }
    
    if (lowerMessage.includes("help")) {
      return "I can help you find products, answer questions about items, or assist with your order. What do you need help with?";
    }
    
    if (lowerMessage.includes("recommendation") || lowerMessage.includes("suggest")) {
      return "I'd recommend checking out our wireless headphones or smart home speakers - they're our top-rated electronics right now!";
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("discount")) {
      return "Many of our products have special discounts right now. Is there a specific category you're interested in?";
    }
    
    if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      return "We offer free shipping on orders over $50 and express shipping options at checkout!";
    }
    
    return "I'm still learning to help with that. Can you try asking in a different way or browse our categories?";
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      message: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response with a short delay
    setTimeout(() => {
      const aiResponse: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        message: generateResponse(message),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        message: "Hi there! I'm your NeoBasket shopping assistant. How can I help you today?",
        timestamp: new Date()
      }
    ]);
    toast.info("Chat history cleared");
  };

  return (
    <AIAssistantContext.Provider value={{
      messages,
      isOpen,
      toggleChatWindow,
      sendMessage,
      clearMessages
    }}>
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error("useAIAssistant must be used within an AIAssistantProvider");
  }
  return context;
}
