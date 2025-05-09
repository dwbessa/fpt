// src/hooks/use-progress.ts
"use client";

import type { MockExamAttempt } from '@/types';
import { useState, useEffect, useCallback } from 'react';

const PROGRESS_STORAGE_KEY = 'faculdadeParaTodos_progress';
const MOCK_EXAMS_STORAGE_KEY = 'faculdadeParaTodos_mockExams';

// Subject Progress Management
export interface SubjectProgress {
  [subjectId: string]: number; // Progress percentage (0-100)
}

export function useSubjectProgress() {
  const [progress, setProgress] = useState<SubjectProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error("Failed to load subject progress from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSubjectProgress = useCallback((subjectId: string, newProgress: number) => {
    setProgress(prev => {
      const updated = { ...prev, [subjectId]: Math.max(0, Math.min(100, newProgress)) };
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save subject progress to localStorage:", error);
      }
      return updated;
    });
  }, []);

  const getSubjectProgress = useCallback((subjectId: string): number => {
    return progress[subjectId] || 0;
  }, [progress]);

  return { progress, updateSubjectProgress, getSubjectProgress, isLoadingProgress: isLoading };
}


// Mock Exam Attempts Management
export function useMockExams() {
  const [examAttempts, setExamAttempts] = useState<MockExamAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAttempts = localStorage.getItem(MOCK_EXAMS_STORAGE_KEY);
      if (storedAttempts) {
        setExamAttempts(JSON.parse(storedAttempts));
      }
    } catch (error) {
      console.error("Failed to load mock exam attempts from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addExamAttempt = useCallback((attempt: MockExamAttempt) => {
    setExamAttempts(prev => {
      const updatedAttempts = [attempt, ...prev]; // Add new attempt to the beginning
      try {
        localStorage.setItem(MOCK_EXAMS_STORAGE_KEY, JSON.stringify(updatedAttempts));
      } catch (error) {
        console.error("Failed to save mock exam attempt to localStorage:", error);
      }
      return updatedAttempts;
    });
  }, []);

  const getLatestExamAttempt = useCallback((): MockExamAttempt | null => {
    return examAttempts.length > 0 ? examAttempts[0] : null;
  }, [examAttempts]);

  return { examAttempts, addExamAttempt, getLatestExamAttempt, isLoadingExams: isLoading };
}