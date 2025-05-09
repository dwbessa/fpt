import { PageHeader } from "@/components/layout/page-header";
import { SubjectCard, type Subject } from "@/components/subject-trails/subject-card";
import { Languages, Calculator, Globe2, ScrollText, Atom, FlaskConical, Leaf } from "lucide-react";

const subjects: Subject[] = [
  { id: 'portuguese', name: 'Português', description: 'Domine a língua portuguesa e a interpretação de textos.', IconComponent: Languages, href: '/subject-trails/portuguese', iconColor: 'text-blue-500' },
  { id: 'math', name: 'Matemática', description: 'Desvende os números, fórmulas e o raciocínio lógico.', IconComponent: Calculator, href: '/subject-trails/math', iconColor: 'text-green-500' },
  { id: 'geography', name: 'Geografia', description: 'Explore o mundo, seus lugares e suas dinâmicas.', IconComponent: Globe2, href: '/subject-trails/geography', iconColor: 'text-yellow-500' },
  { id: 'history', name: 'História', description: 'Viaje pelo tempo e entenda o passado para construir o futuro.', IconComponent: ScrollText, href: '/subject-trails/history', iconColor: 'text-orange-500' },
  { id: 'physics', name: 'Física', description: 'Compreenda as leis que regem o universo e seus fenômenos.', IconComponent: Atom, href: '/subject-trails/physics', iconColor: 'text-purple-500' },
  { id: 'chemistry', name: 'Química', description: 'Descubra a ciência das substâncias e suas transformações.', IconComponent: FlaskConical, href: '/subject-trails/chemistry', iconColor: 'text-red-500' },
  { id: 'biology', name: 'Biologia', description: 'Estude a vida em todas as suas formas e manifestações.', IconComponent: Leaf, href: '/subject-trails/biology', iconColor: 'text-teal-500' },
];

export default function SubjectTrailsPage() {
  return (
    <>
      <PageHeader title="Trilhas de Estudo" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <p className="mb-6 text-lg text-muted-foreground">
          Escolha uma matéria para iniciar sua jornada de aprendizado ou continuar de onde parou. Cada trilha é desenhada para cobrir os tópicos essenciais de forma progressiva e gamificada.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </main>
    </>
  );
}
