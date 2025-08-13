import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Trophy, Target, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/navigation/bottom-nav";
import ProgressBar from "@/components/ui/progress-bar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getCategories } from "@/lib/lessons";
import { getAllAchievements } from "@/lib/achievements";
import type { UserProgress, CategoryProgress, Achievement } from "@shared/schema";

export default function Progress() {
  const [, setLocation] = useLocation();
  
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
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setCategories(getCategories(userProgress));
    setAchievements(getAllAchievements());
  }, [userProgress]);

  const totalLessons = categories.reduce((sum, cat) => sum + cat.totalLessons, 0);
  const completedLessons = categories.reduce((sum, cat) => sum + cat.completedLessons, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const earnedAchievements = achievements.filter(achievement => 
    userProgress.achievements.includes(achievement.id)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Your Progress</h2>
        <div></div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userProgress.xp.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total XP</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userProgress.streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Lessons Completed</span>
                  <span>{completedLessons}/{totalLessons}</span>
                </div>
                <ProgressBar value={overallProgress} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Daily Goal</span>
                  <span>{userProgress.dailyProgress}/{userProgress.dailyGoal} min</span>
                </div>
                <ProgressBar 
                  value={(userProgress.dailyProgress / userProgress.dailyGoal) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                      <i className={`${category.icon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.completedLessons}/{category.totalLessons} lessons
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {Math.round((category.completedLessons / category.totalLessons) * 100)}%
                  </Badge>
                </div>
                <ProgressBar 
                  value={(category.completedLessons / category.totalLessons) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements ({earnedAchievements.length}/{achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const isEarned = userProgress.achievements.includes(achievement.id);
                return (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isEarned 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted bg-muted/20 opacity-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        isEarned ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-muted'
                      }`}>
                        <i className={`${achievement.icon} ${isEarned ? 'text-white' : 'text-muted-foreground'}`}></i>
                      </div>
                      <p className={`text-sm font-medium ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      {isEarned && (
                        <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                          +{achievement.xpReward} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
