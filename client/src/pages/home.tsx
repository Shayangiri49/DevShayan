import { useState, useEffect } from "react";
import { Link } from "wouter";
import TopNav from "@/components/navigation/top-nav";
import BottomNav from "@/components/navigation/bottom-nav";
import LessonCard from "@/components/lesson/lesson-card";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getCategories, getContinueLearningLesson } from "@/lib/lessons";
import { getUserProgress, updateDailyProgress } from "@/lib/progress";
import { getRecentAchievements } from "@/lib/achievements";
import { Play, Target, Trophy, Flame } from "lucide-react";
import type { UserProgress, CategoryProgress, Achievement } from "@shared/schema";

export default function Home() {
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

  const [categories, setCategories] = useState<CategoryProgress[]>([]);
  const [continueLesson, setContinueLesson] = useState<any>(null);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Load data
    setCategories(getCategories(userProgress));
    setContinueLesson(getContinueLearningLesson(userProgress));
    setRecentAchievements(getRecentAchievements(userProgress));
  }, [userProgress]);

  const dailyProgressPercentage = (userProgress.dailyProgress / userProgress.dailyGoal) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      {/* Tab Navigation */}
      <div className="bg-background border-b border-border">
        <div className="flex px-4">
          <button className="flex-1 py-3 text-center border-b-2 border-primary text-primary font-semibold">
            <i className="fas fa-home text-sm mr-2"></i>Learn
          </button>
          <Link href="/code-editor" className="flex-1 py-3 text-center text-muted-foreground font-medium hover:text-foreground">
            <i className="fas fa-code text-sm mr-2"></i>Code
          </Link>
          <Link href="/progress" className="flex-1 py-3 text-center text-muted-foreground font-medium hover:text-foreground">
            <Trophy className="w-4 h-4 inline mr-2" />Progress
          </Link>
          <Link href="/profile" className="flex-1 py-3 text-center text-muted-foreground font-medium hover:text-foreground">
            <i className="fas fa-user text-sm mr-2"></i>Profile
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Daily Goal */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Daily Goal</h2>
                <Target className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Learn for {userProgress.dailyGoal} minutes</span>
                <span className="text-sm font-semibold">{userProgress.dailyProgress}/{userProgress.dailyGoal} min</span>
              </div>
              <ProgressBar 
                value={dailyProgressPercentage} 
                className="bg-white/20 [&>div]:bg-white"
              />
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        {continueLesson && (
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Continue Learning</h3>
            <LessonCard lesson={continueLesson} showProgress />
          </div>
        )}

        {/* Python Topics */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Python Topics</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
                <CardContent className="p-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${category.color}`}>
                    <i className={`${category.icon} text-white`}></i>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{category.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{category.totalLessons} lessons</p>
                  <div className="flex items-center mt-2">
                    <ProgressBar 
                      value={(category.completedLessons / category.totalLessons) * 100}
                      className="h-1"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <Card key={achievement.id} className="border-primary/20 shadow-lg shadow-primary/10">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <i className={`${achievement.icon} text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <Link href="/code-editor">
          <Button size="lg" className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-all duration-200">
            <Play className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
