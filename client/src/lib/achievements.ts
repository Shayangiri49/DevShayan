import achievementsData from "@/data/achievements.json";
import type { Achievement, UserProgress } from "@shared/schema";

export function getAllAchievements(): Achievement[] {
  return achievementsData as Achievement[];
}

export function getRecentAchievements(userProgress: UserProgress): Achievement[] {
  const allAchievements = getAllAchievements();
  const recentIds = userProgress.achievements.slice(-3); // Last 3 achievements
  
  return allAchievements.filter(achievement => 
    recentIds.includes(achievement.id)
  );
}

export function checkForNewAchievements(userProgress: UserProgress): Achievement[] {
  const allAchievements = getAllAchievements();
  const newAchievements: Achievement[] = [];

  allAchievements.forEach(achievement => {
    if (userProgress.achievements.includes(achievement.id)) {
      return; // Already earned
    }

    const isEarned = checkAchievementRequirement(achievement, userProgress);
    if (isEarned) {
      newAchievements.push(achievement);
    }
  });

  return newAchievements;
}

function checkAchievementRequirement(achievement: Achievement, userProgress: UserProgress): boolean {
  const { requirement } = achievement;

  switch (requirement.type) {
    case "lessons_completed":
      if (requirement.lessonCategory) {
        // Count lessons in specific category
        const categoryLessons = userProgress.completedLessons.filter(lessonId => {
          // You'd need to cross-reference with lesson data to check category
          return true; // Simplified for now
        });
        return categoryLessons.length >= requirement.value;
      }
      return userProgress.completedLessons.length >= requirement.value;

    case "streak":
      return userProgress.streak >= requirement.value;

    case "xp":
      return userProgress.xp >= requirement.value;

    case "quiz_score":
      const averageScore = Object.values(userProgress.quizScores).reduce((a, b) => a + b, 0) / 
                           Object.values(userProgress.quizScores).length;
      return averageScore >= requirement.value;

    default:
      return false;
  }
}

export function awardAchievement(
  achievementId: string,
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void
) {
  const achievement = getAllAchievements().find(a => a.id === achievementId);
  if (!achievement) return;

  setUserProgress((prev) => ({
    ...prev,
    achievements: [...prev.achievements, achievementId],
    xp: prev.xp + achievement.xpReward,
  }));
}
