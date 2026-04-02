export interface CandidateData {
  sno: string;
  name: string;
  email: string;
  assessment: string;
  marks: {
    question: string;
    score: number;
  }[];
  total: number;
  gainedMarks: number;
  raw: Record<string, string>;
}
