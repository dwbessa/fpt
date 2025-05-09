import { PageHeader } from "@/components/layout/page-header";
import { OptionCard } from "@/components/practice-zone/option-card";
import { ClipboardList, FileText } from "lucide-react";

const practiceOptions = [
  { 
    id: 'real-exercises', 
    title: 'Exercícios Reais', 
    description: 'Pratique com questões focadas em tópicos específicos para reforçar seu aprendizado em cada matéria.',
    IconComponent: ClipboardList, 
    href: '/practice-zone/exercises', // Updated href
    buttonText: 'Resolver Exercícios',
    iconColor: 'text-primary',
    buttonClassName: 'bg-primary hover:bg-primary/90'
  },
  { 
    id: 'mock-exams', 
    title: 'Simulados Completos', 
    description: 'Teste seu conhecimento em um ambiente similar ao exame real. Receba feedback personalizado para guiar seus estudos.',
    IconComponent: FileText, 
    href: '/practice-zone/mock-exams/start', // Updated href
    buttonText: 'Fazer Simulado',
    iconColor: 'text-accent',
    buttonClassName: 'bg-accent hover:bg-accent/90 text-accent-foreground'
  },
];

export default function PracticeZonePage() {
  return (
    <>
      <PageHeader title="Zona de Prática" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <p className="mb-6 text-lg text-muted-foreground">
          Aprimore suas habilidades e prepare-se para os desafios! Escolha uma opção abaixo para começar a praticar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {practiceOptions.map((option) => (
            <OptionCard key={option.id} option={option} />
          ))}
        </div>
      </main>
    </>
  );
}