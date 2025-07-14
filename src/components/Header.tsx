
import { Search, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full">
      {/* Red top bar */}
      <div className="bg-primary h-12 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="bg-white px-3 py-1 rounded">
            <img 
              src="/lovable-uploads/50a9333b-ccb9-4e40-bcc1-b31177569e46.png" 
              alt="Sopro Logo" 
              className="h-6"
            />
          </div>
          <span className="text-white text-sm font-medium">Chemia budowlana</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <Globe className="h-4 w-4" />
            <span className="text-sm">PL</span>
          </div>
          <div className="relative">
            <Input
              placeholder="Wprowadź temat"
              className="w-48 h-8 text-sm bg-white"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* White navigation bar */}
      <div className="bg-white border-b border-border">
        <nav className="flex items-center justify-center py-3 px-4">
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Produkty</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Topowe produkty</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Baza wiedzy</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Obiekty Referencyjne</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Gdzie kupić?</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Akademia Profesjonalisty</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Aktualności</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Kontakt</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
