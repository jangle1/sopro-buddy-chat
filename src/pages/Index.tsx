
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, MessageCircle } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import SuggestionCard from "@/components/SuggestionCard";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "What services does Sopro offer for lead generation?",
  "How does Sopro's B2B prospecting process work?",
  "What makes Sopro different from other lead generation companies?",
  "Can you tell me about Sopro's pricing plans?",
  "How quickly can I expect to see results with Sopro?",
  "What industries does Sopro specialize in?"
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
    
    if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
      return "Sopro specializes in B2B lead generation and prospecting services. We help businesses identify, engage, and convert high-quality prospects through our proven outbound sales development process. Our services include prospect research, personalized outreach campaigns, and qualified lead delivery.";
    } else if (lowerMessage.includes("pricing") || lowerMessage.includes("cost")) {
      return "Sopro offers flexible pricing plans tailored to your business needs. Our pricing is based on the scope of your campaign and the number of prospects you want to reach. I'd recommend speaking with our sales team to get a customized quote that fits your specific requirements and budget.";
    } else if (lowerMessage.includes("process") || lowerMessage.includes("work")) {
      return "Our B2B prospecting process follows a proven 4-step approach: 1) Research and identify your ideal prospects, 2) Craft personalized outreach messages, 3) Execute multi-touch campaigns across email and LinkedIn, 4) Deliver qualified leads directly to your sales team. We handle the entire process so you can focus on closing deals.";
    } else if (lowerMessage.includes("result") || lowerMessage.includes("quickly")) {
      return "Most clients start seeing qualified leads within 4-6 weeks of campaign launch. However, results can vary based on your industry, target market, and campaign parameters. We work closely with you to optimize performance and ensure you're getting the best possible results from your investment.";
    } else if (lowerMessage.includes("different") || lowerMessage.includes("unique")) {
      return "What sets Sopro apart is our human-first approach combined with cutting-edge technology. Unlike automated tools, our expert team crafts personalized messages for each prospect. We also provide full transparency with detailed reporting and work as an extension of your sales team.";
    } else {
      return "Thank you for your question! I'm here to help you learn more about Sopro's lead generation services. Our team specializes in helping businesses like yours generate high-quality B2B leads through personalized outreach campaigns. Would you like to know more about our services, pricing, or process?";
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
      toast.error("Sorry, I'm having trouble responding right now. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Sopro Assistant</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about Sopro's lead generation services. Ask me anything about our process, pricing, or how we can help grow your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col shadow-lg">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat with Sopro Assistant
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Sparkles className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Welcome to Sopro Assistant!</h3>
                      <p className="text-muted-foreground mb-4">
                        Start by asking a question or choosing from the suggestions on the right.
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
                      placeholder="Ask me anything about Sopro's services..."
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
                <CardTitle className="flex items-center gap-2 text-primary">
                  <User className="h-5 w-5" />
                  Suggested Questions
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
          <p>Powered by Sopro AI Assistant • For more information, visit sopro.pl</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
