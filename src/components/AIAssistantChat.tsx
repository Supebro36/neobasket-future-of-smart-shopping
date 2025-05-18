
import { useState, useRef, useEffect } from "react";
import { useAIAssistant } from "../contexts/AIAssistantContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Trash2 } from "lucide-react";

export default function AIAssistantChat() {
  const { messages, sendMessage, toggleChatWindow, clearMessages } = useAIAssistant();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 md:w-96 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col z-40 overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="bg-neo-purple text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare size={20} className="mr-2" />
          <h3 className="font-medium">NeoBasket Assistant</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={clearMessages} 
            className="text-white/80 hover:text-white"
            aria-label="Clear chat"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={toggleChatWindow} 
            className="text-white/80 hover:text-white"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-h-[400px] bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`mb-4 ${
              message.sender === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                message.sender === "user"
                  ? "bg-neo-purple text-white rounded-tr-none"
                  : "bg-white border border-gray-200 rounded-tl-none"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="flex-1"
        />
        <Button 
          onClick={handleSend} 
          variant="default"
          disabled={inputValue.trim() === ""}
          className="bg-neo-purple hover:bg-neo-purple/90"
          size="icon"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
