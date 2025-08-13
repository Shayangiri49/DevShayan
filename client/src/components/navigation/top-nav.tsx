import { Link } from "wouter";
import { Code, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { UserProgress } from "@shared/schema";

export default function TopNav() {
  const [userProgress] = useLocalStorage<UserProgress>("userProgress", {
    id: "user-1",
    username: "Python Learner",
    xp: 1250,
    streak: 5,
    completedLessons: [],
    lessonProgress: {},
    quizScores: {},
    achievements: [],
    dailyGoal: 20,
    dailyProgress: 15,
    createdAt: new Date().toISOString(),
  });

  return (
    <nav className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
          <Code className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-foreground">PyLearn</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
          <Flame className="w-3 h-3 mr-1" />
          {userProgress.streak}
        </Badge>
        
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-foreground">
            {userProgress.xp.toLocaleString()}
          </span>
        </div>
        
        <Link href="/profile">
          <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-xs font-semibold text-primary">
                {userProgress.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
