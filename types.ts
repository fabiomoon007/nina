export interface Question {
  id: string;
  prova: string;
  ano: number;
  banca: string;
  cargo: string;
  numero: number;
  enunciado: string;
  alternativas: Record<string, string>;
  gabarito: string;
  anulada: boolean;
  tags: string[];
}

export interface QuizResultData {
  id: string;
  score: number;
  total: number;
  date: string;
  answers: Record<string, string>;
  questions: Question[];
}

export interface SearchResult {
  summary: string;
  sources: { web: { uri: string; title: string } }[];
}
