
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
        isUser 
          ? "bg-primary text-primary-foreground ml-4" 
          : "bg-muted text-muted-foreground mr-4"
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
        <span className={cn(
          "text-xs mt-1 block opacity-70",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
