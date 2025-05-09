// src/types/index.ts
import type { LucideIcon } from 'lucide-react';

export interface SubjectBase {
  id: string;
  name: string;
  description: string;
  IconComponent: LucideIcon;
  href: string; // Base href for the subject trail page
  iconColor?: string;
}

export interface Subject extends SubjectBase {
  progress?: number; // 0-100, percentage of completion for the trail
  lessonsCount?: number; // Example: To show "X Lições"
  exercisesCount?: number; // Example: To show "Y Exercícios"
  questionsForPractice?: Question[]; // Questions specifically for the "Exercícios" section
  questionsForExam?: Question[]; // Questions specifically for the "Simulados" section
}

// For future expansion of detailed subject trails
export interface Lesson {
  id: string;
  title: string;
  contentPath: string; // Path to markdown or component for lesson content
  completed: boolean;
}

export interface Choice {
  id: string; // e.g., "a", "b", "c", "d"
  text: string;
}

export interface Question {
  id: string; // Unique ID for the question
  subjectId: string; // To link back to the subject
  text: string; // The question text
  choices: Choice[]; // Array of choices
  correctAnswerId: string; // ID of the correct choice
  explanation?: string; // Explanation for the correct answer (optional)
}

// User's answer to a question
export interface UserAnswer {
  questionId: string;
  selectedAnswerId: string | null; // ID of the choice selected by the user
  isCorrect?: boolean; // To be determined after submission
}

// Structure for results of a mock exam attempt
export interface MockExamSubjectResult {
  subjectId: string;
  subjectName: string;
  score: number; // Number of correct answers
  totalQuestions: number; // Total questions for this subject in the exam
}

export interface MockExamAttempt {
  id: string; // Unique ID for this attempt
  timestamp: string; // ISO date string when the exam was completed
  subjectResults: MockExamSubjectResult[];
  overallScore: number; // Overall percentage, e.g., 75 for 75%
  totalCorrect: number;
  totalAttempted: number;
  // Formatted string of results for the AI, e.g., "Matemática: 5/10, Português: 8/10"
  formattedResultsForAI: string;
}