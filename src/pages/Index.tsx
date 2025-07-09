
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, MessageCircle } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import SuggestionCard from "@/components/SuggestionCard";
import Header from "@/components/Header";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "Jakie produkty oferuje Sopro do hydroizolacji?",
  "Jak działa klej do płytek S-FLEX?",
  "Jakie są różnice między produktami Sopro a konkurencją?",
  "Gdzie mogę kupić produkty Sopro?",
  "Jak szybko schnie zaprawa Sopro?",
  "Jakie są zastosowania produktów Sopro w budownictwie?"
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple response simulation based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hydroizolacja") || lowerMessage.includes("izolacja")) {
      return "Sopro oferuje kompleksowy system produktów do hydroizolacji, w tym membrany, dyspersje i systemy uszczelniające. Nasze produkty zapewniają skuteczną ochronę przed wilgocią w łazienkach, balkonach i innych obszarach narażonych na działanie wody.";
    } else if (lowerMessage.includes("s-flex") || lowerMessage.includes("klej")) {
      return "S-FLEX to elastyczny klej do płytek ceramicznych i kamienia naturalnego. Charakteryzuje się wysoką przyczepnością, elastycznością i odpornością na warunki atmosferyczne. Idealny do zastosowań wewnętrznych i zewnętrznych.";
    } else if (lowerMessage.includes("różnice") || lowerMessage.includes("konkurencja")) {
      return "Produkty Sopro wyróżniają się najwyższą jakością, innowacyjnymi formułami i wieloletnim doświadczeniem w branży chemii budowlanej. Oferujemy kompleksowe systemy produktów z pełnym wsparciem technicznym.";
    } else if (lowerMessage.includes("kupić") || lowerMessage.includes("gdzie")) {
      return "Produkty Sopro są dostępne w hurtowniach budowlanych, sklepach ze specjalistycznym asortymentem budowlanym oraz u autoryzowanych dystrybutorów. Sprawdź mapę punktów sprzedaży na naszej stronie internetowej.";
    } else if (lowerMessage.includes("schnie") || lowerMessage.includes("czas")) {
      return "Czas schnięcia zależy od konkretnego produktu. Większość zapraw Sopro osiąga wstępną wytrzymałość w ciągu 2-4 godzin, a pełne utwardzenie następuje po 24-48 godzinach, w zależności od warunków atmosferycznych.";
    } else {
      return "Dziękuję za pytanie! Jestem tutaj, aby pomóc Ci dowiedzieć się więcej o produktach Sopro do chemii budowlanej. Nasze produkty obejmują kleje, zaprawy, hydroizolacje i systemy wykończeniowe. W czym mogę Ci pomóc?";
    }
  };

  const handleSendMessage = async (messageText: string = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(messageText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Przepraszam, mam problem z odpowiedzią. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Asystent Sopro</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uzyskaj natychmiastowe odpowiedzi na pytania dotyczące produktów Sopro. Zapytaj mnie o nasze rozwiązania, zastosowania lub procesy budowlane.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col shadow-lg">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Rozmowa z Asystentem Sopro
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Sparkles className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Witaj w Asystenice Sopro!</h3>
                      <p className="text-muted-foreground mb-4">
                        Zacznij od zadania pytania lub wybierz jedną z propozycji po prawej stronie.
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-muted rounded-lg px-4 py-3 mr-4">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-primary" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </ScrollArea>
                
                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Zapytaj mnie o produkty Sopro..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isLoading}
                      size="icon"
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5" />
                  Sugerowane pytania
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestedQuestions.map((question, index) => (
                  <SuggestionCard
                    key={index}
                    question={question}
                    onClick={handleSuggestionClick}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Napędzane przez Asystenta AI Sopro • Więcej informacji na sopro.pl</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
