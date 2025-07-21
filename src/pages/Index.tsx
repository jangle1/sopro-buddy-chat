
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
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { soproThermConversation } from "@/demo/soproThermConversation";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  suggestions?: string[]; // Added suggestions property
}

const suggestedQuestions = [
  "Jakie produkty oferuje Sopro do hydroizolacji?",
  "Jak działa klej do płytek S-FLEX?",
  "Jakie są różnice między produktami Sopro a konkurencją?",
  "Gdzie mogę kupić produkty Sopro?",
  "Jak szybko schnie zaprawa Sopro?",
  "Jakie są zastosowania produktów Sopro w budownictwie?",
  "Systemy ociepleń Sopro" // Dodane demo
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [pendingDemo, setPendingDemo] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

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

    if (demoMode) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        isUser: true,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);
      // Find next assistant message in demo
      let nextIdx = demoStep + 1;
      while (nextIdx < soproThermConversation.length && soproThermConversation[nextIdx].isUser) {
        nextIdx++;
      }
      const nextDemoMsg = soproThermConversation[nextIdx];
      setTimeout(() => {
        if (nextDemoMsg && !nextDemoMsg.isUser) {
          setMessages(prev => [...prev, { ...nextDemoMsg }]);
          setDemoStep(nextIdx);
        }
        setIsLoading(false);
      }, 800);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      isUser: true,
      timestamp: Date.now()
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
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Przepraszam, mam problem z odpowiedzią. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    if (question === "Systemy ociepleń Sopro") {
      if (messages.length > 0) {
        setShowReplaceDialog(true);
        setPendingDemo(true);
      } else {
        // Start demo mode with first user+assistant message
        setDemoMode(true);
        setDemoStep(1);
        setMessages([
          { ...soproThermConversation[0] },
          { ...soproThermConversation[1] }
        ]);
      }
      return;
    }
    setDemoMode(false);
    setDemoStep(0);
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Szukamy ostatniej wiadomości bota z suggestions
  const lastBotWithSuggestions = [...messages].reverse().find(m => !m.isUser && m.suggestions && m.suggestions.length > 0);
  // Sprawdzamy, czy ostatnia wiadomość użytkownika to 'Nie, dziękuję. To wszystko.'
  const lastUserMessage = [...messages].reverse().find(m => m.isUser);
  const shouldShowSuggestions = lastBotWithSuggestions && !(lastUserMessage && lastUserMessage.text.trim() === 'Nie, dziękuję. To wszystko.');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col">
        {/* Mobile-first layout */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
          {/* Chat Interface - Full width on mobile, 2/3 on desktop */}
          <div className="flex-1 lg:flex-[2] flex flex-col min-h-0">
            {/* Header section - smaller on mobile */}
            <div className="text-center p-4 lg:p-8">
              <div className="flex items-center justify-center gap-2 lg:gap-3 mb-2 lg:mb-4">
                <div className="p-2 lg:p-3 bg-primary rounded-full">
                  <Bot className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold text-foreground">Asystent Sopro</h1>
              </div>
              <p className="text-sm lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                Uzyskaj natychmiastowe odpowiedzi na pytania dotyczące produktów Sopro. Zapytaj mnie o nasze rozwiązania, zastosowania lub procesy budowlane.
              </p>
            </div>

            {/* Chat Card - takes remaining space */}
            <div className="flex-1 mx-4 lg:mx-8 mb-4 lg:mb-8 flex flex-col min-h-0">
              <Card className="flex-1 flex flex-col shadow-lg min-h-0">
                <CardHeader className="bg-primary text-white rounded-t-lg py-3 lg:py-6 flex-shrink-0">
                  <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                    <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
                    Rozmowa z Asystentem Sopro
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                  {/* Messages area - scrollable */}
                  <div className="flex-1 min-h-0">
                    <ScrollArea className="h-full">
                      <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
                        {messages.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-32 lg:h-48 text-center">
                            <Sparkles className="h-8 w-8 lg:h-12 lg:w-12 text-primary mb-2 lg:mb-4" />
                            <h3 className="text-base lg:text-lg font-semibold mb-1 lg:mb-2">Witaj w Asystenice Sopro!</h3>
                            <p className="text-sm lg:text-base text-muted-foreground px-4">
                              Zacznij od zadania pytania lub wybierz jedną z propozycji.
                            </p>
                          </div>
                        )}
                        
                        {messages.map((message) => (
                          <ChatMessage
                            key={message.id}
                            message={message.text}
                            isUser={message.isUser}
                            timestamp={new Date(message.timestamp)}
                          />
                        ))}
                        
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-3 lg:px-4 py-2 lg:py-3 mr-2 lg:mr-4">
                              <div className="flex items-center gap-2">
                                <Bot className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-primary rounded-full animate-bounce"></div>
                                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </div>
                  {/* SUGGESTIONS KAFELKI NAD INPUTEM */}
                  {shouldShowSuggestions && (
                    <div className="flex flex-wrap gap-2 px-4 pb-2 pt-2">
                      {lastBotWithSuggestions.suggestions!.map((s, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => handleSendMessage(s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  )}
                  {/* Input Area - fixed at bottom */}
                  <div className="border-t p-3 lg:p-4 flex-shrink-0">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Zapytaj mnie o produkty Sopro..."
                        disabled={isLoading}
                        className="flex-1 text-sm lg:text-base"
                      />
                      <Button 
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim() || isLoading}
                        size="icon"
                        className="shrink-0 h-9 w-9 lg:h-10 lg:w-10"
                      >
                        <Send className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Suggestions Panel - Below chat on mobile, side on desktop */}
          <div className="lg:flex-1 lg:max-w-sm">
            <div className="mx-4 lg:mx-0 lg:mr-8 mb-4 lg:mb-8 lg:mt-24">
              <Card className="shadow-lg">
                <CardHeader className="pb-3 lg:pb-6">
                  <CardTitle className="flex items-center gap-2 text-foreground text-base lg:text-lg">
                    <User className="h-4 w-4 lg:h-5 lg:w-5" />
                    Sugerowane pytania
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3">
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
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-xs lg:text-sm text-muted-foreground bg-muted/30">
          <p>Napędzane przez Asystenta AI Sopro • Więcej informacji na sopro.pl</p>
        </div>
      </div>
      <AlertDialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy zastąpić bieżącą rozmowę scenariuszem demo?</AlertDialogTitle>
            <AlertDialogDescription>
              Obecna rozmowa zostanie usunięta i zastąpiona przykładowym scenariuszem "Systemy ociepleń Sopro".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setShowReplaceDialog(false); setPendingDemo(false); }}>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setDemoMode(true);
              setDemoStep(1);
              setMessages([
                { ...soproThermConversation[0] },
                { ...soproThermConversation[1] }
              ]);
              setShowReplaceDialog(false);
              setPendingDemo(false);
            }}>Zastąp</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
