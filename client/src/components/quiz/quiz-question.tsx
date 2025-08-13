import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface QuizQuestionProps {
  question: {
    id: string;
    question: string;
    type: "multiple-choice" | "fill-blank" | "code-output";
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
    points: number;
  };
  answer: any;
  onAnswer: (answer: any) => void;
  showFeedback: boolean;
  onShowFeedback: () => void;
}

export default function QuizQuestion({ 
  question, 
  answer, 
  onAnswer, 
  showFeedback, 
  onShowFeedback 
}: QuizQuestionProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (answer !== undefined && answer !== null && answer !== "") {
      setSubmitted(true);
      onShowFeedback();
    }
  };

  const isCorrect = answer === question.correctAnswer;

  return (
    <div>
      <h4 className="text-lg font-semibold text-foreground mb-4">{question.question}</h4>

      {/* Multiple Choice */}
      {question.type === "multiple-choice" && question.options && (
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = answer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ";
            
            if (showFeedback) {
              if (isCorrectOption) {
                buttonClass += "border-green-500 bg-green-50 dark:bg-green-950";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "border-red-500 bg-red-50 dark:bg-red-950";
              } else {
                buttonClass += "border-muted";
              }
            } else if (isSelected) {
              buttonClass += "border-primary bg-primary/10";
            } else {
              buttonClass += "border-muted hover:border-primary hover:bg-primary/5";
            }

            return (
              <button
                key={index}
                onClick={() => !showFeedback && onAnswer(index)}
                disabled={showFeedback}
                className={buttonClass}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    showFeedback && isCorrectOption 
                      ? "bg-green-500 border-green-500" 
                      : showFeedback && isSelected && !isCorrectOption
                      ? "bg-red-500 border-red-500"
                      : isSelected 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground"
                  }`}>
                    <span className={`text-sm font-bold ${
                      (showFeedback && isCorrectOption) || (showFeedback && isSelected && !isCorrectOption) || isSelected
                        ? "text-white" 
                        : "text-muted-foreground"
                    }`}>
                      {optionLetter}
                    </span>
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Fill in the Blank */}
      {question.type === "fill-blank" && (
        <div className="mb-6">
          <Input
            value={answer || ""}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={showFeedback}
            className="text-center font-mono"
          />
        </div>
      )}

      {/* Code Output */}
      {question.type === "code-output" && (
        <div className="mb-6">
          <Input
            value={answer || ""}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="What will this code output?"
            disabled={showFeedback}
            className="text-center font-mono"
          />
        </div>
      )}

      {/* Submit Button */}
      {!showFeedback && (
        <Button 
          onClick={handleSubmit}
          disabled={answer === undefined || answer === null || answer === ""}
          className="w-full mb-4"
        >
          Submit Answer
        </Button>
      )}

      {/* Feedback */}
      {showFeedback && (
        <Card className={`${
          isCorrect 
            ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
            : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isCorrect ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <h5 className={`font-semibold mb-1 ${
                  isCorrect 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h5>
                <p className={`text-sm ${
                  isCorrect 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
