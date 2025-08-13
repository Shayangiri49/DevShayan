import type { UserProgress } from "@shared/schema";

export function updateLessonProgress(
  lessonId: string, 
  step: number, 
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void
) {
  setUserProgress((prev) => ({
    ...prev,
    lessonProgress: {
      ...prev.lessonProgress,
      [lessonId]: step,
    },
  }));
}

export function updateQuizScore(
  quizId: string, 
  score: number, 
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void
) {
  setUserProgress((prev) => ({
    ...prev,
    quizScores: {
      ...prev.quizScores,
      [quizId]: score,
    },
  }));
}

export function addXP(
  amount: number, 
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void
) {
  setUserProgress((prev) => ({
    ...prev,
    xp: prev.xp + amount,
  }));
}

export function updateStreak(
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void
) {
  setUserProgress((prev) => {
    const today = new Date().toDateString();
    const lastStudyDate = prev.lastStudyDate ? new Date(prev.lastStudyDate).toDateString() : null;
    
    if (lastStudyDate === today) {
      // Already studied today
      return prev;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    let newStreak = prev.streak;
    if (lastStudyDate === yesterdayString) {
      // Continuing streak
      newStreak = prev.streak + 1;
    } else if (lastStudyDate !== today) {
      // Starting new streak
      newStreak = 1;
    }
    
    return {
      ...prev,
      streak: newStreak,
      lastStudyDate: new Date().toISOString(),
    };
  });
}

export function updateDailyProgress(
  minutes: number, 
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void
) {
  setUserProgress((prev) => ({
    ...prev,
    dailyProgress: Math.min(prev.dailyGoal, prev.dailyProgress + minutes),
  }));
}

export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem("userProgress");
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
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
  };
}
