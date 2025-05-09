import { PageHeader } from "@/components/layout/page-header";
import { getAllExamQuestions } from "@/lib/mock-data";
import { MockExamClientPage } from "@/components/practice-zone/mock-exam-client-page";

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


export default function TakeMockExamPage() {
  const allQuestions = getAllExamQuestions();
  const shuffledQuestions = shuffleArray(allQuestions); 

  return (
    <>
      <PageHeader title="Simulado em Andamento" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <MockExamClientPage questions={shuffledQuestions} />
      </main>
    </>
  );
}
