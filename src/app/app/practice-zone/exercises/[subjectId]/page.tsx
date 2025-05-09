import { PageHeader } from "@/components/layout/page-header";
import { getSubjectById, getPracticeQuestionsBySubjectId } from "@/lib/mock-data";
import { ExerciseClientPage } from "@/components/practice-zone/exercise-client-page";
import { notFound } from "next/navigation";

interface ExercisePageParams {
  params: {
    subjectId: string;
  };
}

export default function ExerciseSubjectPage({ params }: ExercisePageParams) {
  const subject = getSubjectById(params.subjectId);
  
  if (!subject) {
    notFound();
  }
  
  const questions = getPracticeQuestionsBySubjectId(params.subjectId);

  return (
    <>
      <PageHeader title={`Exercícios de ${subject.name}`} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <ExerciseClientPage subject={subject} questions={questions} />
      </main>
    </>
  );
}

// Optional: Generate static paths if you have a fixed set of subjects
// export async function generateStaticParams() {
//   const { ALL_SUBJECTS_DATA } = await import('@/lib/mock-data');
//   return ALL_SUBJECTS_DATA.map((subject) => ({
//     subjectId: subject.id,
//   }));
// }
