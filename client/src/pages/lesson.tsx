import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePythonExecutor } from "@/hooks/use-python-executor";
import { getLessonById } from "@/lib/lessons";
import { updateLessonProgress, addXP } from "@/lib/progress";
import CodeExample from "@/components/lesson/code-example";
import ProgressBar from "@/components/ui/progress-bar";
import type { Lesson, UserProgress } from "@shared/schema";

export default function LessonPage() {
  const [, params] = useRoute("/lesson/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { executeCode } = usePythonExecutor();
  
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>("userProgress", {
    id: "user-1",
    username: "Python Learner",
    xp: 0,
    streak: 0,
    completedLessons: [],
    lessonProgress: {},
    quizScores: {},
    achievements: [],
    dailyGoal: 20,
    dailyProgress: 0,
    createdAt: new Date().toISOString(),
  });

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const lessonData = getLessonById(params.id);
      if (lessonData) {
        setLesson(lessonData);
        const progress = userProgress.lessonProgress[params.id] || 0;
        setCurrentStep(progress);
      }
    }
  }, [params?.id, userProgress]);

  const handleNext = () => {
    if (!lesson) return;

    const newStep = currentStep + 1;
    if (newStep < lesson.steps.length) {
      setCurrentStep(newStep);
      setShowFeedback(false);
      setUserCode("");
      updateLessonProgress(params!.id, newStep, setUserProgress);
    } else {
      // Lesson complete
      const newProgress = {
        ...userProgress,
        completedLessons: [...userProgress.completedLessons, lesson.id],
        xp: userProgress.xp + lesson.xpReward,
      };
      setUserProgress(newProgress);
      
      toast({
        title: "Lesson Complete!",
        description: `You earned ${lesson.xpReward} XP!`,
      });
      
      setLocation("/");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowFeedback(false);
      setUserCode("");
    }
  };

  const handleCheckAnswer = async () => {
    if (!lesson) return;

    const step = lesson.steps[currentStep];
    if (step.exercise) {
      try {
        const result = await executeCode(userCode);
        const isCorrect = step.exercise.testCases.every(testCase => {
          // Simple test case validation - in a real app, you'd want more sophisticated testing
          return result.includes(testCase.expectedOutput);
        });
        
        setFeedbackCorrect(isCorrect);
        setShowFeedback(true);
        
        if (isCorrect) {
          addXP(10, setUserProgress);
          toast({
            title: "Correct!",
            description: "Great job! You can move to the next step.",
          });
        }
      } catch (error) {
        setFeedbackCorrect(false);
        setShowFeedback(true);
        toast({
          title: "Error",
          description: "There was an error in your code. Try again!",
          variant: "destructive",
        });
      }
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  if (!lesson) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const step = lesson.steps[currentStep];
  const progressPercentage = ((currentStep + 1) / lesson.steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">{lesson.title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">{currentStep + 1}/{lesson.steps.length}</span>
          <div className="w-20 bg-muted rounded-full h-1">
            <ProgressBar value={progressPercentage} className="h-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-24">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
          {step.content && (
            <p className="text-muted-foreground leading-relaxed">{step.content}</p>
          )}
        </div>

        {/* Code Example */}
        {step.code && (
          <CodeExample code={step.code} language={step.language || "python"} onCopy={copyCode} />
        )}

        {/* Interactive Exercise */}
        {step.exercise && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-3">Try it yourself!</h4>
              <p className="text-sm text-muted-foreground mb-3">{step.exercise.instructions}</p>
              <div className="bg-background rounded-lg p-3 border">
                <Input
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Type your code here..."
                  className="font-mono text-sm border-0 focus-visible:ring-0"
                />
              </div>
              <Button 
                onClick={handleCheckAnswer}
                className="w-full mt-3"
                disabled={!userCode.trim()}
              >
                Check Answer
              </Button>
              
              {/* Feedback */}
              {showFeedback && (
                <Card className={`mt-3 ${feedbackCorrect ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${feedbackCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h5 className={`font-semibold mb-1 ${feedbackCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                          {feedbackCorrect ? 'Correct!' : 'Not quite right'}
                        </h5>
                        <p className={`text-sm ${feedbackCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                          {feedbackCorrect 
                            ? "Great job! You can move to the next step." 
                            : "Try again. Check your syntax and make sure your output matches the expected result."
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
        <div className="max-w-md mx-auto flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />Previous
          </Button>
          <Button 
            className="flex-1"
            onClick={handleNext}
            disabled={step.exercise && !feedbackCorrect && showFeedback}
          >
            Next<ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
