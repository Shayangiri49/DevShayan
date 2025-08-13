import lessonsData from "@/data/lessons.json";
import type { Lesson, UserProgress, CategoryProgress } from "@shared/schema";

export function getAllLessons(): Lesson[] {
  return lessonsData as Lesson[];
}

export function getLessonById(id: string): Lesson | null {
  const lessons = getAllLessons();
  return lessons.find(lesson => lesson.id === id) || null;
}

export function getLessonsByCategory(category: string): Lesson[] {
  const lessons = getAllLessons();
  return lessons.filter(lesson => lesson.category === category);
}

export function getContinueLearningLesson(userProgress: UserProgress): Lesson | null {
  const lessons = getAllLessons();
  
  // Find the first lesson that's in progress
  for (const lesson of lessons) {
    const progress = userProgress.lessonProgress[lesson.id];
    if (progress !== undefined && progress < lesson.steps.length - 1) {
      return lesson;
    }
  }
  
  // If no lesson in progress, return the first uncompleted lesson
  for (const lesson of lessons) {
    if (!userProgress.completedLessons.includes(lesson.id)) {
      return lesson;
    }
  }
  
  return null;
}

export function getCategories(userProgress: UserProgress): CategoryProgress[] {
  const lessons = getAllLessons();
  const categories = new Map<string, CategoryProgress>();

  lessons.forEach(lesson => {
    if (!categories.has(lesson.category)) {
      categories.set(lesson.category, {
        id: lesson.category,
        name: lesson.category,
        description: `Learn ${lesson.category.toLowerCase()} programming concepts`,
        icon: getCategoryIcon(lesson.category),
        color: getCategoryColor(lesson.category),
        totalLessons: 0,
        completedLessons: 0,
        totalXP: 0,
        earnedXP: 0,
      });
    }

    const category = categories.get(lesson.category)!;
    category.totalLessons++;
    category.totalXP += lesson.xpReward;

    if (userProgress.completedLessons.includes(lesson.id)) {
      category.completedLessons++;
      category.earnedXP += lesson.xpReward;
    }
  });

  return Array.from(categories.values());
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "Basics": "fas fa-play",
    "Variables": "fas fa-tag",
    "Functions": "fas fa-cube",
    "Loops": "fas fa-sync",
    "Conditionals": "fas fa-code-branch",
    "Lists": "fas fa-list",
    "Dictionaries": "fas fa-book",
    "Classes": "fas fa-sitemap",
    "Error Handling": "fas fa-exclamation-triangle",
    "File Handling": "fas fa-file",
    "Advanced": "fas fa-star",
  };
  return icons[category] || "fas fa-code";
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Basics": "bg-blue-100 dark:bg-blue-900",
    "Variables": "bg-green-100 dark:bg-green-900",
    "Functions": "bg-purple-100 dark:bg-purple-900",
    "Loops": "bg-orange-100 dark:bg-orange-900",
    "Conditionals": "bg-red-100 dark:bg-red-900",
    "Lists": "bg-yellow-100 dark:bg-yellow-900",
    "Dictionaries": "bg-pink-100 dark:bg-pink-900",
    "Classes": "bg-indigo-100 dark:bg-indigo-900",
    "Error Handling": "bg-red-100 dark:bg-red-900",
    "File Handling": "bg-gray-100 dark:bg-gray-900",
    "Advanced": "bg-cyan-100 dark:bg-cyan-900",
  };
  return colors[category] || "bg-gray-100 dark:bg-gray-900";
}

export function getQuizById(id: string): any {
  // For now, return a sample quiz - in a real app, you'd load from quiz data
  return {
    id,
    title: "Python Basics Quiz",
    description: "Test your knowledge of Python fundamentals",
    category: "Basics",
    timeLimit: 300, // 5 minutes
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which of the following is the correct way to create a variable in Python?",
        type: "multiple-choice",
        options: [
          'var name = "John"',
          'name = "John"',
          'string name = "John"',
          'name := "John"',
        ],
        correctAnswer: 1,
        explanation: "In Python, you can create variables simply by assigning a value. No need to declare the type!",
        points: 10,
      },
      {
        id: "q2",
        question: "What will print(len('Hello')) output?",
        type: "fill-blank",
        correctAnswer: "5",
        explanation: "The len() function returns the length of a string, which is the number of characters.",
        points: 10,
      },
    ],
  };
}
