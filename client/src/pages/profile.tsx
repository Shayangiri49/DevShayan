import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, User, Star, Flame, Trophy, Settings, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BottomNav from "@/components/navigation/bottom-nav";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import type { UserProgress } from "@shared/schema";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>("userProgress", {
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

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(userProgress.username);
  const [tempDailyGoal, setTempDailyGoal] = useState(userProgress.dailyGoal);

  const handleSave = () => {
    setUserProgress({
      ...userProgress,
      username: tempUsername,
      dailyGoal: tempDailyGoal,
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setTempUsername(userProgress.username);
    setTempDailyGoal(userProgress.dailyGoal);
    setIsEditing(false);
  };

  const exportProgress = () => {
    const dataStr = JSON.stringify(userProgress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pylearn_progress.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Progress Exported",
      description: "Your progress has been downloaded as a JSON file.",
    });
  };

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setUserProgress(importedData);
        toast({
          title: "Progress Imported",
          description: "Your progress has been restored from the file.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "The file format is invalid. Please try again.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const getLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const getXPForNextLevel = (xp: number) => {
    const currentLevel = getLevel(xp);
    return currentLevel * 100 - xp;
  };

  const level = getLevel(userProgress.xp);
  const xpForNext = getXPForNextLevel(userProgress.xp);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Profile</h2>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="text-center"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="flex-1">
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground mb-2">{userProgress.username}</h3>
                <Badge variant="secondary" className="mb-4">Level {level}</Badge>
                <p className="text-sm text-muted-foreground">
                  {xpForNext} XP to next level
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{userProgress.xp.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{userProgress.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{userProgress.achievements.length}</p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Goal Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Goal</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div>
                <Label htmlFor="dailyGoal">Minutes per day</Label>
                <Input
                  id="dailyGoal"
                  type="number"
                  min="5"
                  max="120"
                  value={tempDailyGoal}
                  onChange={(e) => setTempDailyGoal(parseInt(e.target.value) || 20)}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-foreground">Study {userProgress.dailyGoal} minutes daily</span>
                <Badge variant="outline">{userProgress.dailyProgress}/{userProgress.dailyGoal} min today</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" onClick={exportProgress} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Progress
            </Button>
            
            <div>
              <Label htmlFor="import-file" className="cursor-pointer">
                <Button variant="outline" className="w-full" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Import Progress
                  </span>
                </Button>
              </Label>
              <Input
                id="import-file"
                type="file"
                accept=".json"
                className="hidden"
                onChange={importProgress}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lessons Completed</span>
              <span className="text-foreground">{userProgress.completedLessons.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quizzes Taken</span>
              <span className="text-foreground">{Object.keys(userProgress.quizScores).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Created</span>
              <span className="text-foreground">
                {new Date(userProgress.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
