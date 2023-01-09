import type { Answer } from "./answers";

export interface Question {
  id: number;
  title: string;
  user: number;
  content: string;
  pub_date: number;
  answers_count: number;
  answers?: Answer[];
}
