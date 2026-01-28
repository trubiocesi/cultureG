export type Category = 'quiz' | 'actualites' | 'oeuvres' | 'mythologie' | 'populaire' | 'personnel';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  date: string;
  source: string;
  category: string;
}

export interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  summary: string;
  keyPoints: string[];
  quote?: string;
  imageUrl?: string;
}

export interface PopularItem {
  id: string;
  title: string;
  description: string;
  type: 'film' | 'musique' | 'art' | 'histoire' | 'science';
  trending: boolean;
  imageUrl?: string;
}

export interface PersonalSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'article' | 'oeuvre';
  reason: string;
  completed: boolean;
}

export interface UserStats {
  quizzesCompleted: number;
  correctAnswers: number;
  totalAnswers: number;
  streakDays: number;
  favoriteCategory: string;
  level: number;
  xp: number;
}
