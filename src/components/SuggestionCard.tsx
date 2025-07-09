
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface SuggestionCardProps {
  question: string;
  onClick: (question: string) => void;
}

const SuggestionCard = ({ question, onClick }: SuggestionCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50 group"
      onClick={() => onClick(question)}
    >
      <div className="flex items-start gap-3">
        <MessageCircle className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {question}
        </p>
      </div>
    </Card>
  );
};

export default SuggestionCard;
