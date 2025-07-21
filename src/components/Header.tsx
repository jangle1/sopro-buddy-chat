
import { Search, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full">
      {/* Red top bar */}
      <div className="bg-primary h-12 flex items-center justify-between px-4 overflow-x-hidden">
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-medium">Chemia budowlana</span>
        </div>
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2 text-white">
            <Globe className="h-4 w-4" />
            <span className="text-sm">PL</span>
          </div>
          <div className="relative max-w-[120px] sm:max-w-xs w-full">
            <Input
              placeholder="Szukaj"
              className="h-8 text-sm bg-white w-full min-w-0"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* White navigation bar */}
      <div className="bg-white border-b border-border overflow-x-hidden">
        <nav className="flex items-center justify-center py-3 px-4 overflow-x-hidden">
          <div className="flex items-center gap-8 text-sm overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent md:gap-8 gap-4 w-full md:justify-center max-w-full">
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Produkty</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Topowe produkty</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Baza wiedzy</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Obiekty Referencyjne</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Gdzie kupić?</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Akademia Profesjonalisty</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Aktualności</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex-shrink-0">Kontakt</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
