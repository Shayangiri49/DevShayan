import { z } from "zod";

// User Progress Schema
export const userProgressSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  xp: z.number().default(0),
  streak: z.number().default(0),
  lastStudyDate: z.string().optional(),
  completedLessons: z.array(z.string()).default([]),
  lessonProgress: z.record(z.number()).default({}), // lessonId -> step
  quizScores: z.record(z.number()).default({}), // quizId -> score
  achievements: z.array(z.string()).default([]),
  dailyGoal: z.number().default(20), // minutes
  dailyProgress: z.number().default(0), // minutes
  createdAt: z.string().default(() => new Date().toISOString()),
});

// Lesson Schema
export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedTime: z.number(), // minutes
  xpReward: z.number(),
  prerequisites: z.array(z.string()).default([]),
  steps: z.array(z.object({
    id: z.string(),
    type: z.enum(["content", "code", "exercise", "quiz"]),
    title: z.string(),
    content: z.string().optional(),
    code: z.string().optional(),
    language: z.string().optional(),
    exercise: z.object({
      instructions: z.string(),
      startingCode: z.string(),
      solution: z.string(),
      testCases: z.array(z.object({
        input: z.string(),
        expectedOutput: z.string(),
      })),
    }).optional(),
    quiz: z.object({
      question: z.string(),
      type: z.enum(["multiple-choice", "fill-blank", "code-output"]),
      options: z.array(z.string()).optional(),
      correctAnswer: z.union([z.string(), z.number()]),
      explanation: z.string(),
    }).optional(),
  })),
});

// Quiz Schema
export const quizSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  timeLimit: z.number(), // seconds
  passingScore: z.number(), // percentage
  questions: z.array(z.object({
    id: z.string(),
    question: z.string(),
    type: z.enum(["multiple-choice", "fill-blank", "code-output"]),
    options: z.array(z.string()).optional(),
    correctAnswer: z.union([z.string(), z.number()]),
    explanation: z.string(),
    points: z.number(),
  })),
});

// Achievement Schema
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  type: z.enum(["lesson", "streak", "quiz", "xp", "special"]),
  requirement: z.object({
    type: z.string(),
    value: z.number(),
    lessonCategory: z.string().optional(),
  }),
  xpReward: z.number(),
  rarity: z.enum(["common", "rare", "epic", "legendary"]),
});

// Category Progress Schema
export const categoryProgressSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  totalLessons: z.number(),
  completedLessons: z.number(),
  totalXP: z.number(),
  earnedXP: z.number(),
});

export type UserProgress = z.infer<typeof userProgressSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type Quiz = z.infer<typeof quizSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type CategoryProgress = z.infer<typeof categoryProgressSchema>;
