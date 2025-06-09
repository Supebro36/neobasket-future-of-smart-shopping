
import React, { createContext, useContext, useState } from "react";
import { AIChatMessage } from "../types";
import { toast } from "sonner";
import { SearchService } from "../services/searchService";

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
      message: "Hi there! I'm your NeoBasket shopping assistant. I can help you find products, answer questions about items, or provide recommendations. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I assist with your shopping today? I can help you find specific products, suggest items, or answer questions about our inventory.";
    }
    
    // Help responses
    if (lowerMessage.includes("help")) {
      return "I can help you in several ways:\n• Search for specific products\n• Get recommendations by category\n• Find deals and discounts\n• Answer questions about shipping and delivery\n• Provide product comparisons\n\nWhat would you like help with?";
    }
    
    // Product search - detect if user is looking for specific products
    if (lowerMessage.includes("find") || lowerMessage.includes("search") || lowerMessage.includes("looking for") || lowerMessage.includes("need") || lowerMessage.includes("want")) {
      try {
        // Extract potential search terms from the message
        const searchTerms = userMessage.replace(/\b(find|search|looking for|need|want|a|an|the|some|any)\b/gi, '').trim();
        
        if (searchTerms.length > 2) {
          const products = await SearchService.searchProducts(searchTerms);
          
          if (products.length > 0) {
            const productList = products.slice(0, 5).map(product => 
              `• ${product.name} - $${product.price} (${product.category})`
            ).join('\n');
            
            return `I found these products for "${searchTerms}":\n\n${productList}\n\nWould you like more details about any of these items, or should I search for something else?`;
          } else {
            return `I couldn't find any products matching "${searchTerms}". Try searching for:\n• Different keywords\n• Category names like "electronics", "clothing", "home-decor"\n• Brand names\n\nWhat else can I help you find?`;
          }
        }
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }
    
    // Category-based recommendations
    if (lowerMessage.includes("electronics") || lowerMessage.includes("tech") || lowerMessage.includes("gadget")) {
      return "Great choice! Our electronics category has amazing products. I'd recommend checking out our wireless headphones, smart home devices, and mobile accessories. Would you like me to find specific electronics for you?";
    }
    
    if (lowerMessage.includes("clothing") || lowerMessage.includes("fashion") || lowerMessage.includes("wear")) {
      return "Our clothing collection is fantastic! We have trendy options for all styles. Are you looking for casual wear, formal attire, or something specific like jackets or accessories?";
    }
    
    if (lowerMessage.includes("home") || lowerMessage.includes("decor") || lowerMessage.includes("furniture")) {
      return "Perfect for home improvement! Our home decor section has beautiful items to transform your space. Are you looking for decorative pieces, furniture, or functional home items?";
    }
    
    // Recommendation requests
    if (lowerMessage.includes("recommendation") || lowerMessage.includes("suggest") || lowerMessage.includes("popular") || lowerMessage.includes("best")) {
      return "I'd be happy to suggest some popular items! Our top categories are:\n• Electronics (wireless headphones, smart speakers)\n• Clothing (trendy fashion pieces)\n• Home Decor (decorative items, furniture)\n• Accessories (bags, jewelry)\n\nWhich category interests you, or would you like recommendations for something specific?";
    }
    
    // Price and discount inquiries
    if (lowerMessage.includes("price") || lowerMessage.includes("discount") || lowerMessage.includes("deal") || lowerMessage.includes("sale")) {
      return "Great question about pricing! Many of our products have special discounts right now. To find the best deals, I can help you search for specific items or categories. What type of products are you interested in? I'll find the best prices for you!";
    }
    
    // Shipping inquiries
    if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery") || lowerMessage.includes("ship")) {
      return "Here's our shipping info:\n• Free shipping on orders over $50\n• Express shipping available at checkout\n• Standard delivery: 3-5 business days\n• Express delivery: 1-2 business days\n\nIs there a specific product you'd like to check shipping for?";
    }
    
    // Default response with product search suggestion
    return "I'm here to help you find the perfect products! You can ask me to:\n• Search for specific items\n• Show products in a category\n• Find deals and discounts\n• Compare products\n\nTry asking something like 'Find wireless headphones' or 'Show me electronics'. What are you shopping for today?";
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      message: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate AI response with product search integration
    try {
      const response = await generateResponse(message);
      
      setTimeout(() => {
        const aiResponse: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          message: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }, 800);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      setTimeout(() => {
        const aiResponse: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          message: "I apologize, but I'm having trouble processing your request right now. Please try asking about specific products or categories, and I'll do my best to help you find what you're looking for!",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }, 800);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        message: "Hi there! I'm your NeoBasket shopping assistant. I can help you find products, answer questions about items, or provide recommendations. What are you looking for today?",
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
