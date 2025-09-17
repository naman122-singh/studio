"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AiAssistantIcon } from "./ai-assistant-icon";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-message",
      text: "Hello! I am your AI assistant. How can I help you with your business, marketing, or content creation today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const reactId = useId();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `${reactId}-${messages.length}-user`,
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Mock bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: `${reactId}-${messages.length + 1}-bot`,
        text: `You asked: "${input}". As a mock assistant, I'm just echoing your query. In a real scenario, I'd provide a helpful answer here.`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "bot" && (
                <Avatar className="w-8 h-8 border-2 border-primary p-1">
                  <AiAssistantIcon />
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md rounded-lg px-4 py-2",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
               {message.sender === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1"
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
