
// src/lib/mock-data.ts
import type { Subject, Question } from '@/types';
import { Languages, Calculator, Globe2, ScrollText, Atom, FlaskConical, Leaf } from 'lucide-react';

export const ALL_SUBJECTS_DATA: Subject[] = [
  {
    id: 'portuguese',
    name: 'Português',
    description: 'Língua portuguesa, literatura e interpretação de textos.',
    IconComponent: Languages,
    href: '/subject-trails/portuguese',
    iconColor: 'text-blue-500',
    lessonsCount: 10,
    exercisesCount: 20,
    questionsForPractice: [
      {
        id: 'pt_q1',
        subjectId: 'portuguese',
        text: 'Qual figura de linguagem está presente na frase: "Choveram pétalas de rosas na cerimônia"?',
        choices: [
          { id: 'a', text: 'Metáfora' },
          { id: 'b', text: 'Hipérbole' },
          { id: 'c', text: 'Personificação' },
          { id: 'd', text: 'Eufemismo' },
        ],
        correctAnswerId: 'a',
        explanation: 'Metáfora é a figura de linguagem que transfere o significado de uma palavra para outra através de uma comparação implícita.',
      },
      {
        id: 'pt_q2',
        subjectId: 'portuguese',
        text: 'Identifique a oração subordinada substantiva subjetiva:',
        choices: [
          { id: 'a', text: 'É importante que você estude.' },
          { id: 'b', text: 'Desejo que você seja feliz.' },
          { id: 'c', text: 'Não sei se ele virá.' },
          { id: 'd', text: 'O problema é que ele mentiu.' },
        ],
        correctAnswerId: 'a',
        explanation: 'A oração "que você estude" funciona como sujeito da oração principal "É importante".',
      },
    ],
    questionsForExam: [
      {
        id: 'pt_exam_q1',
        subjectId: 'portuguese',
        text: 'Qual o principal objetivo de um texto dissertativo-argumentativo?',
        choices: [
          { id: 'a', text: 'Narrar uma história com personagens e enredo.' },
          { id: 'b', text: 'Descrever detalhadamente um objeto ou paisagem.' },
          { id: 'c', text: 'Apresentar e defender um ponto de vista sobre um tema.' },
          { id: 'd', text: 'Instruir o leitor sobre como realizar uma tarefa.' },
        ],
        correctAnswerId: 'c',
        explanation: 'O texto dissertativo-argumentativo visa convencer o leitor sobre uma tese através de argumentos consistentes.',
      },
    ],
  },
  {
    id: 'math',
    name: 'Matemática',
    description: 'Números, álgebra, geometria e raciocínio lógico.',
    IconComponent: Calculator,
    href: '/subject-trails/math',
    iconColor: 'text-green-500',
    lessonsCount: 15,
    exercisesCount: 30,
    questionsForPractice: [
      {
        id: 'math_q1',
        subjectId: 'math',
        text: 'Qual é o valor de x na equação 2x + 5 = 15?',
        choices: [
          { id: 'a', text: '5' },
          { id: 'b', text: '10' },
          { id: 'c', text: '2.5' },
          { id: 'd', text: '7.5' },
        ],
        correctAnswerId: 'a',
        explanation: '2x = 15 - 5 => 2x = 10 => x = 10/2 => x = 5.',
      },
    ],
    questionsForExam: [
       {
        id: 'math_exam_q1',
        subjectId: 'math',
        text: 'Se um triângulo tem lados medindo 3cm, 4cm e 5cm, qual é o seu tipo?',
        choices: [
          { id: 'a', text: 'Equilátero' },
          { id: 'b', text: 'Isósceles' },
          { id: 'c', text: 'Retângulo' },
          { id: 'd', text: 'Obtusângulo' },
        ],
        correctAnswerId: 'c',
        explanation: 'Os lados 3, 4, 5 formam um triângulo pitagórico (3² + 4² = 5²), característico de um triângulo retângulo.',
      },
    ]
  },
  {
    id: 'history',
    name: 'História',
    description: 'Eventos passados, civilizações e transformações sociais.',
    IconComponent: ScrollText,
    href: '/subject-trails/history',
    iconColor: 'text-orange-500',
    lessonsCount: 12,
    exercisesCount: 18,
    questionsForPractice: [
      {
        id: 'hist_q1',
        subjectId: 'history',
        text: 'Quem proclamou a Independência do Brasil?',
        choices: [
          { id: 'a', text: 'Dom João VI' },
          { id: 'b', text: 'Dom Pedro I' },
          { id: 'c', text: 'Marechal Deodoro da Fonseca' },
          { id: 'd', text: 'Tiradentes' },
        ],
        correctAnswerId: 'b',
        explanation: 'Dom Pedro I proclamou a Independência do Brasil em 7 de setembro de 1822.',
      },
    ],
    questionsForExam: [
      {
        id: 'hist_exam_q1',
        subjectId: 'history',
        text: 'Qual evento marcou o início da Idade Média?',
        choices: [
          { id: 'a', text: 'A Queda do Império Romano do Ocidente' },
          { id: 'b', text: 'A Descoberta da América' },
          { id: 'c', text: 'A Revolução Francesa' },
          { id: 'd', text: 'A Primeira Guerra Mundial' },
        ],
        correctAnswerId: 'a',
        explanation: 'A Queda do Império Romano do Ocidente em 476 d.C. é tradicionalmente considerada o marco inicial da Idade Média.',
      },
    ]
  },
  {
    id: 'geography',
    name: 'Geografia',
    description: 'Estudo do espaço terrestre, paisagens e relações sociedade-natureza.',
    IconComponent: Globe2,
    href: '/subject-trails/geography',
    iconColor: 'text-yellow-500',
    lessonsCount: 10,
    exercisesCount: 15,
    questionsForPractice: [
      {
        id: 'geo_q1',
        subjectId: 'geography',
        text: 'Qual o maior oceano do planeta Terra?',
        choices: [
          { id: 'a', text: 'Atlântico' },
          { id: 'b', text: 'Índico' },
          { id: 'c', text: 'Pacífico' },
          { id: 'd', text: 'Ártico' },
        ],
        correctAnswerId: 'c',
        explanation: 'O Oceano Pacífico é o maior em área e volume.',
      },
    ],
    questionsForExam: [
      {
        id: 'geo_exam_q1',
        subjectId: 'geography',
        text: 'O que é a Linha do Equador?',
        choices: [
          { id: 'a', text: 'Um meridiano que divide a Terra em hemisfério norte e sul.' },
          { id: 'b', text: 'Um paralelo que divide a Terra em hemisfério oriental e ocidental.' },
          { id: 'c', text: 'Um paralelo que divide a Terra em hemisfério norte e sul.' },
          { id: 'd', text: 'Um meridiano que marca a longitude 0°.' },
        ],
        correctAnswerId: 'c',
        explanation: 'A Linha do Equador é o paralelo principal que divide a Terra nos hemisférios Norte e Sul.',
      },
    ]
  },
  {
    id: 'physics',
    name: 'Física',
    description: 'Leis do universo, movimento, energia e matéria.',
    IconComponent: Atom,
    href: '/subject-trails/physics',
    iconColor: 'text-purple-500',
    lessonsCount: 12,
    exercisesCount: 20,
    questionsForPractice: [
      {
        id: 'phy_q1',
        subjectId: 'physics',
        text: 'Qual a unidade de medida da Força no Sistema Internacional?',
        choices: [
          { id: 'a', text: 'Joule (J)' },
          { id: 'b', text: 'Watt (W)' },
          { id: 'c', text: 'Newton (N)' },
          { id: 'd', text: 'Pascal (Pa)' },
        ],
        correctAnswerId: 'c',
        explanation: 'Newton (N) é a unidade de Força no SI, em homenagem a Isaac Newton.',
      },
    ],
    questionsForExam: [
      {
        id: 'phy_exam_q1',
        subjectId: 'physics',
        text: 'O que descreve a Primeira Lei de Newton (Lei da Inércia)?',
        choices: [
          { id: 'a', text: 'A força resultante sobre um corpo é igual ao produto de sua massa pela aceleração.' },
          { id: 'b', text: 'Toda ação corresponde a uma reação de igual intensidade e sentido oposto.' },
          { id: 'c', text: 'Um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a permanecer em movimento com velocidade constante, a menos que uma força resultante atue sobre ele.' },
          { id: 'd', text: 'A energia total de um sistema isolado permanece constante.' },
        ],
        correctAnswerId: 'c',
        explanation: 'A Lei da Inércia afirma que os corpos resistem a mudanças em seu estado de movimento.',
      },
    ]
  },
  {
    id: 'chemistry',
    name: 'Química',
    description: 'Substâncias, suas propriedades, composições e transformações.',
    IconComponent: FlaskConical,
    href: '/subject-trails/chemistry',
    iconColor: 'text-red-500',
    lessonsCount: 11,
    exercisesCount: 22,
    questionsForPractice: [
      {
        id: 'chem_q1',
        subjectId: 'chemistry',
        text: 'Qual o símbolo químico da água?',
        choices: [
          { id: 'a', text: 'Ag' },
          { id: 'b', text: 'H2O' },
          { id: 'c', text: 'CO2' },
          { id: 'd', text: 'O2' },
        ],
        correctAnswerId: 'b',
        explanation: 'H2O representa a molécula de água, com dois átomos de hidrogênio e um de oxigênio.',
      },
    ],
    questionsForExam: [
     {
        id: 'chem_exam_q1',
        subjectId: 'chemistry',
        text: 'O que é uma ligação covalente?',
        choices: [
          { id: 'a', text: 'Transferência de elétrons entre átomos.' },
          { id: 'b', text: 'Compartilhamento de elétrons entre átomos.' },
          { id: 'c', text: 'Atração entre íons de cargas opostas.' },
          { id: 'd', text: 'Interação entre moléculas polares.' },
        ],
        correctAnswerId: 'b',
        explanation: 'Na ligação covalente, átomos compartilham pares de elétrons para atingir estabilidade.',
      },
    ]
  },
  {
    id: 'biology',
    name: 'Biologia',
    description: 'Estudo da vida, seres vivos, evolução e ecossistemas.',
    IconComponent: Leaf,
    href: '/subject-trails/biology',
    iconColor: 'text-teal-500',
    lessonsCount: 14,
    exercisesCount: 25,
    questionsForPractice: [
      {
        id: 'bio_q1',
        subjectId: 'biology',
        text: 'Qual organela celular é responsável pela respiração celular?',
        choices: [
          { id: 'a', text: 'Ribossomo' },
          { id: 'b', text: 'Complexo de Golgi' },
          { id: 'c', text: 'Mitocôndria' },
          { id: 'd', text: 'Lisossomo' },
        ],
        correctAnswerId: 'c',
        explanation: 'A mitocôndria é conhecida como a "usina de energia" da célula, onde ocorre a respiração celular.',
      },
    ],
    questionsForExam: [
      {
        id: 'bio_exam_q1',
        subjectId: 'biology',
        text: 'Qual é o processo pelo qual as plantas produzem seu próprio alimento usando a luz solar?',
        choices: [
          { id: 'a', text: 'Respiração Celular' },
          { id: 'b', text: 'Fotossíntese' },
          { id: 'c', text: 'Transpiração' },
          { id: 'd', text: 'Fermentação' },
        ],
        correctAnswerId: 'b',
        explanation: 'Fotossíntese é o processo em que plantas convertem luz solar, água e CO2 em glicose e oxigênio.',
      },
    ]
  },
];

export const getSubjectById = (id: string): Subject | undefined => {
  return ALL_SUBJECTS_DATA.find(sub => sub.id === id);
}

export const getPracticeQuestionsBySubjectId = (subjectId: string): Question[] => {
  const subject = getSubjectById(subjectId);
  return subject?.questionsForPractice || [];
}

export const getAllExamQuestions = (): Question[] => {
  return ALL_SUBJECTS_DATA.reduce((acc, subject) => {
    if (subject.questionsForExam) {
      acc.push(...subject.questionsForExam);
    }
    return acc;
  }, [] as Question[]);
};

    