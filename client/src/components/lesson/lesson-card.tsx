import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress-bar";
import type { Lesson } from "@shared/schema";

interface LessonCardProps {
  lesson: Lesson;
  showProgress?: boolean;
  progress?: number;
}

export default function LessonCard({ lesson, showProgress = false, progress = 0 }: LessonCardProps) {
  const progressPercentage = showProgress ? (progress / lesson.steps.length) * 100 : 0;

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{lesson.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
            {lesson.estimatedTime && (
              <p className="text-xs text-muted-foreground mt-1">
                {lesson.estimatedTime} min • {lesson.xpReward} XP
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center ml-3">
            <i className="fas fa-play text-primary"></i>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {showProgress && (
            <div className="flex items-center space-x-2 flex-1 mr-3">
              <ProgressBar value={progressPercentage} className="h-1.5 w-20" />
              <span className="text-xs text-muted-foreground">{progress}/{lesson.steps.length}</span>
            </div>
          )}
          
          <Link href={`/lesson/${lesson.id}`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              {showProgress && progress > 0 ? "Continue" : "Start"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
