
import { Bell, Search, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type AppHeaderProps = {
  role: "admin" | "restaurant";
  showMenuButton?: boolean;
  onMenuButtonClick?: () => void;
}

export default function AppHeader({ role, showMenuButton = false, onMenuButtonClick }: AppHeaderProps) {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b px-4 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {showMenuButton && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={onMenuButtonClick}>
              <MenuIcon className="h-5 w-5" />
            </Button>
          )}
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 text-sm bg-accent/50 rounded-md border-0 focus:outline-none w-[180px] lg:w-[240px] focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <span className="hidden md:inline-flex px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
            {role === "admin" ? "Admin" : "Restaurant"}
          </span>
          <div className="h-8 w-8 rounded-full bg-accent/70 flex items-center justify-center">
            <span className="text-sm font-medium">
              {role === "admin" ? "A" : "R"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
