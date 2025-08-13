import { Link, useLocation } from "wouter";
import { Home, Code, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Learn" },
    { href: "/code-editor", icon: Code, label: "Practice" },
    { href: "/progress", icon: TrendingUp, label: "Progress" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="max-w-md mx-auto flex">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <Button
                variant="ghost"
                className={`w-full py-3 h-auto flex flex-col items-center space-y-1 rounded-none ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
