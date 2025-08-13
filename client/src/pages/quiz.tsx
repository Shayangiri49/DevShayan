import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getQuizById } from "@/lib/lessons";
import { updateQuizScore, addXP } from "@/lib/progress";
import QuizQuestion from "@/components/quiz/quiz-question";
import ProgressBar from "@/components/ui/progress-bar";
import type { Quiz, UserProgress } from "@shared/schema";

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
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

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (params?.id) {
      const quizData = getQuizById(params.id);
      if (quizData) {
        setQuiz(quizData);
        setTimeRemaining(quizData.timeLimit);
      }
    }
  }, [params?.id]);

  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      handleQuizComplete();
    }
  }, [timeRemaining, quizCompleted]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (!quiz) return;

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
    }
  };

  const handleQuizComplete = () => {
    if (!quiz) return;

    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);

    // Update user progress
    const xpEarned = finalScore >= quiz.passingScore ? 50 : 25;
    updateQuizScore(params!.id, finalScore, setUserProgress);
    addXP(xpEarned, setUserProgress);

    toast({
      title: finalScore >= quiz.passingScore ? "Quiz Passed!" : "Quiz Complete",
      description: `You scored ${finalScore}% and earned ${xpEarned} XP!`,
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quiz) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${score >= quiz.passingScore ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              {score >= quiz.passingScore ? (
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {score >= quiz.passingScore ? "Quiz Passed!" : "Quiz Complete"}
            </h2>
            <p className="text-lg text-muted-foreground mb-4">Your Score: {score}%</p>
            <p className="text-sm text-muted-foreground mb-6">
              Passing Score: {quiz.passingScore}%
            </p>
            <Button onClick={() => setLocation("/")} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Quiz Time!</h2>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-24">
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-question text-secondary text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </h3>
          <ProgressBar value={progressPercentage} className="w-full h-2" />
        </div>

        <QuizQuestion 
          question={question}
          answer={answers[question.id]}
          onAnswer={(answer) => handleAnswer(question.id, answer)}
          showFeedback={showFeedback}
          onShowFeedback={() => setShowFeedback(true)}
        />
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
        <div className="max-w-md mx-auto flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />Previous
          </Button>
          <Button 
            className="flex-1"
            onClick={handleNext}
            disabled={!answers[question.id]}
          >
            {currentQuestion === quiz.questions.length - 1 ? "Finish" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
