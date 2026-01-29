
export enum Platform {
  KODU = 'Kodu Game Lab',
  CODESPARK = 'CodeSpark',
  MINECRAFT = 'Minecraft Edu',
  KODABLE = 'Kodable',
  CANVAS = 'Canvas (Libreta Digital)',
  OZARIA = 'Ozaria',
  CODE_COMBAT = 'Code Combat',
  ROBLOX = 'Roblox Studio',
  GAME_MAKER = 'Game Maker',
  TYPING_MASTER = 'Typing Master'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface WebQuest {
  id: number;
  targetClass: number; // Clase a la que pertenece (3, 4, 5, 6, 7)
  title: string;
  description: string;
  platform: Platform;
  imageUrl: string;
  introduction: string;
  task: string;
  process: string[];
  resources: string[];
  evaluation: QuizQuestion[];
  conclusion: string;
  color: string;
  kmkDefinition: string;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface StudentResult {
  id: string;
  studentName: string;
  klasse: string;
  questTitle: string;
  score: number;
  reflection: number;
  date: string;
}
