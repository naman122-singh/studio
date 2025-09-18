
"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Send, User, Mic, Square, Upload, Camera, Loader2, Volume2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AiAssistantIcon } from "./ai-assistant-icon";
import { chat } from "@/ai/flows/chat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface MessageContent {
  text?: string;
  media?: {
    url: string;
    contentType?: string;
  };
}

interface Message {
  id: string;
  role: "user" | "model";
  content: MessageContent[];
}

// Speech recognition setup
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-message",
      content: [{ text: "Hello! I am your AI assistant. How can I help you with your business, marketing, or content creation today?" }],
      role: "model",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const { toast } = useToast();
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

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    // You can add logic here to select a voice based on detected language if supported
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (text: string, mediaUrl?: string, mediaType?: string) => {
    if (!text.trim() && !mediaUrl) return;

    const userMessage: Message = {
      id: `${reactId}-${messages.length}-user`,
      role: "user",
      content: mediaUrl ? [{text}, { media: { url: mediaUrl, contentType: mediaType } }] : [{ text }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content.map(c => ({
          text: c.text,
          media: c.media ? { url: c.media.url, contentType: c.media.contentType } : undefined
        }))
      }));

      const result = await chat({
        history,
        message: text,
      });
      
      const botResponse: Message = {
        id: `${reactId}-${messages.length + 1}-bot`,
        content: [{ text: result.message }],
        role: "model",
      };
      setMessages((prev) => [...prev, botResponse]);
      speak(result.message);
    } catch (error) {
      console.error("Chat error:", error);
      toast({ title: "Error", description: "Could not get a response from the AI.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };
  
  const handleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    
    if (!SpeechRecognition) {
      toast({ title: "Unsupported Browser", description: "Your browser does not support voice recognition.", variant: "destructive" });
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US'; // Can be changed dynamically

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
        toast({ title: "Voice Error", description: `An error occurred: ${event.error}`, variant: "destructive" });
    }

    recognitionRef.current.start();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSendMessage("I've uploaded a file.", reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "model" && (
                <Avatar className="w-8 h-8 border-2 border-primary p-0.5 bg-background">
                  <AiAssistantIcon />
                </Avatar>
              )}
              <div className="flex flex-col gap-1 items-end">
                {message.content.map((content, index) => (
                  <div key={index}>
                    {content.text && (
                        <div
                        className={cn(
                          "max-w-xs md:max-w-md rounded-lg px-4 py-2",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <p className="text-sm">{content.text}</p>
                      </div>
                    )}
                    {content.media && (
                        <div className="mt-2 rounded-lg overflow-hidden max-w-xs">
                          {content.media.contentType?.startsWith('image/') ? (
                             <img src={content.media.url} alt="Uploaded content" className="max-w-full h-auto"/>
                          ) : (
                             <p className="text-xs text-muted-foreground p-2 bg-muted rounded-md">Uploaded file: {content.media.contentType}</p>
                          )}
                        </div>
                    )}
                  </div>
                ))}
              </div>
              {message.role === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <Avatar className="w-8 h-8 border-2 border-primary p-0.5 bg-background">
                  <AiAssistantIcon />
                </Avatar>
              <div className="max-w-xs md:max-w-md rounded-lg px-4 py-2 bg-muted text-muted-foreground flex items-center">
                 <Loader2 className="w-5 h-5 animate-spin mr-2"/>
                 <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or speak your message..."
            className="flex-1"
            aria-label="Chat input"
            disabled={isLoading}
          />
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="button" size="icon" variant="outline" onClick={handleListen} disabled={isLoading}>
                        {isListening ? <Square className="w-4 h-4 text-red-500"/> : <Mic className="w-4 h-4" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isListening ? 'Stop listening' : 'Use microphone'}</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                        <Upload className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Upload a file</p>
                </TooltipContent>
            </Tooltip>
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </TooltipProvider>

          <Button type="submit" size="icon" aria-label="Send message" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
