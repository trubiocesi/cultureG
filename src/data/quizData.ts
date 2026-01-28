import type { QuizQuestion } from '@/types';

export type QuizCategory = 'actu' | 'media' | 'general' | 'histoire';

export interface DailyQuizState {
  date: string;
  questions: QuizQuestion[];
  completed: boolean;
  score: number;
  answers: number[];
}

export const quizCategories: Record<QuizCategory, { label: string; icon: string; color: string; bgColor: string }> = {
  actu: { 
    label: 'Actualité', 
    icon: '📰', 
    color: 'text-blue-700',
    bgColor: 'bg-blue-100'
  },
  media: { 
    label: 'Média', 
    icon: '🎬', 
    color: 'text-purple-700',
    bgColor: 'bg-purple-100'
  },
  general: { 
    label: 'Général', 
    icon: '🌍', 
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  },
  histoire: { 
    label: 'Histoire', 
    icon: '📜', 
    color: 'text-amber-700',
    bgColor: 'bg-amber-100'
  },
};

// Questions Actualité
export const actuQuestions: QuizQuestion[] = [
  {
    id: 'actu-1',
    question: 'Quel film a remporté l\'Oscar du meilleur film en 2024 ?',
    options: ['Oppenheimer', 'Everything Everywhere All at Once', 'The Whale', 'Elvis'],
    correctAnswer: 0,
    explanation: 'Oppenheimer de Christopher Nolan a remporté 7 Oscars dont celui du meilleur film en 2024.',
    category: 'actu',
    difficulty: 'moyen'
  },
  {
    id: 'actu-2',
    question: 'Quelle entreprise a racheté Twitter en 2022 ?',
    options: ['Meta', 'Google', 'Amazon', 'Elon Musk'],
    correctAnswer: 3,
    explanation: 'Elon Musk a racheté Twitter pour 44 milliards de dollars en octobre 2022.',
    category: 'actu',
    difficulty: 'facile'
  },
  {
    id: 'actu-3',
    question: 'Quel pays a remporté la Coupe du Monde 2022 ?',
    options: ['France', 'Brésil', 'Argentine', 'Croatie'],
    correctAnswer: 2,
    explanation: 'L\'Argentine a remporté la Coupe du Monde 2022 au Qatar, battant la France en finale.',
    category: 'actu',
    difficulty: 'facile'
  },
  {
    id: 'actu-4',
    question: 'Quel est le nom du rover qui a atterri sur Mars en 2021 ?',
    options: ['Curiosity', 'Perseverance', 'Opportunity', 'Spirit'],
    correctAnswer: 1,
    explanation: 'Perseverance est arrivé sur Mars en février 2021 avec l\'hélicoptère Ingenuity.',
    category: 'actu',
    difficulty: 'moyen'
  },
  {
    id: 'actu-5',
    question: 'Quelle série Netflix a battu des records en 2021 ?',
    options: ['Stranger Things', 'Squid Game', 'La Casa de Papel', 'The Witcher'],
    correctAnswer: 1,
    explanation: 'Squid Game est devenue la série la plus regardée de l\'histoire de Netflix.',
    category: 'actu',
    difficulty: 'facile'
  },
  {
    id: 'actu-6',
    question: 'Qui a remporté le prix Nobel de littérature 2023 ?',
    options: ['Annie Ernaux', 'Jon Fosse', 'Kazuo Ishiguro', 'Louise Glück'],
    correctAnswer: 1,
    explanation: 'Le dramaturge norvégien Jon Fosse a reçu le prix Nobel de littérature 2023.',
    category: 'actu',
    difficulty: 'difficile'
  },
  {
    id: 'actu-7',
    question: 'Quel pays a organisé les Jeux Olympiques d\'été 2024 ?',
    options: ['Japon', 'France', 'États-Unis', 'Australie'],
    correctAnswer: 1,
    explanation: 'Paris a accueilli les Jeux Olympiques d\'été 2024, 100 ans après les derniers JO parisiens.',
    category: 'actu',
    difficulty: 'facile'
  },
  {
    id: 'actu-8',
    question: 'Quelle IA a été lancée par OpenAI en novembre 2022 ?',
    options: ['DALL-E', 'GPT-3', 'ChatGPT', 'Claude'],
    correctAnswer: 2,
    explanation: 'ChatGPT a été lancé en novembre 2022 et a atteint 100 millions d\'utilisateurs en 2 mois.',
    category: 'actu',
    difficulty: 'facile'
  },
  {
    id: 'actu-9',
    question: 'Quel pays a rejoint l\'OTAN en 2023 ?',
    options: ['Ukraine', 'Suède', 'Finlande', 'Suisse'],
    correctAnswer: 2,
    explanation: 'La Finlande a rejoint l\'OTAN en avril 2023 suite à l\'invasion de l\'Ukraine.',
    category: 'actu',
    difficulty: 'moyen'
  },
  {
    id: 'actu-10',
    question: 'Quel est le nom de la mission spatiale qui a touché le Soleil ?',
    options: ['Solar Probe', 'Parker Solar Probe', 'Helios', 'Solar Orbiter'],
    correctAnswer: 1,
    explanation: 'La Parker Solar Probe de la NASA est devenue le premier objet fabriqué par l\'homme à toucher le Soleil.',
    category: 'actu',
    difficulty: 'difficile'
  },
];

// Questions Média
export const mediaQuestions: QuizQuestion[] = [
  {
    id: 'media-1',
    question: 'Qui est l\'auteur du manga "One Piece" ?',
    options: ['Masashi Kishimoto', 'Eiichirō Oda', 'Akira Toriyama', 'Tite Kubo'],
    correctAnswer: 1,
    explanation: 'Eiichirō Oda écrit et illustre One Piece depuis 1997, avec plus de 1000 chapitres.',
    category: 'media',
    difficulty: 'facile'
  },
  {
    id: 'media-2',
    question: 'Dans quel film trouve-t-on le personnage de Tyler Durden ?',
    options: ['Pulp Fiction', 'Fight Club', 'American Beauty', 'The Matrix'],
    correctAnswer: 1,
    explanation: 'Tyler Durden est le personnage culte de Fight Club (1999) joué par Brad Pitt.',
    category: 'media',
    difficulty: 'moyen'
  },
  {
    id: 'media-3',
    question: 'Quelle série met en scène la famille royale britannique ?',
    options: ['Downton Abbey', 'The Crown', 'Bridgerton', 'Victoria'],
    correctAnswer: 1,
    explanation: 'The Crown retrace le règne d\'Élisabeth II depuis 2016 sur Netflix.',
    category: 'media',
    difficulty: 'facile'
  },
  {
    id: 'media-4',
    question: 'Qui a écrit "Harry Potter" ?',
    options: ['Stephenie Meyer', 'J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin'],
    correctAnswer: 2,
    explanation: 'J.K. Rowling a écrit les 7 tomes de Harry Potter entre 1997 et 2007.',
    category: 'media',
    difficulty: 'facile'
  },
  {
    id: 'media-5',
    question: 'Dans quel animé trouve-t-on les Titans ?',
    options: ['Naruto', 'Attack on Titan', 'Demon Slayer', 'My Hero Academia'],
    correctAnswer: 1,
    explanation: 'Attack on Titan (L\'Attaque des Titans) est un manga d\'Hajime Isayama.',
    category: 'media',
    difficulty: 'facile'
  },
  {
    id: 'media-6',
    question: 'Quel réalisateur a dirigé "Pulp Fiction" ?',
    options: ['Martin Scorsese', 'Quentin Tarantino', 'Steven Spielberg', 'Francis Ford Coppola'],
    correctAnswer: 1,
    explanation: 'Quentin Tarantino a réalisé Pulp Fiction en 1994, Palme d\'or à Cannes.',
    category: 'media',
    difficulty: 'moyen'
  },
  {
    id: 'media-7',
    question: 'Quelle est la saga littéraire la plus vendue après la Bible ?',
    options: ['Le Seigneur des Anneaux', 'Harry Potter', 'Don Quichotte', 'Alice au pays des merveilles'],
    correctAnswer: 1,
    explanation: 'Harry Potter est la saga la plus vendue avec plus de 500 millions d\'exemplaires.',
    category: 'media',
    difficulty: 'moyen'
  },
  {
    id: 'media-8',
    question: 'Dans Breaking Bad, quel est le vrai nom de "Heisenberg" ?',
    options: ['Jesse Pinkman', 'Saul Goodman', 'Walter White', 'Gustavo Fring'],
    correctAnswer: 2,
    explanation: 'Walter White, professeur de chimie, adopte le pseudonyme de Heisenberg.',
    category: 'media',
    difficulty: 'moyen'
  },
  {
    id: 'media-9',
    question: 'Quel studio a produit "Le Voyage de Chihiro" ?',
    options: ['Pixar', 'Studio Ghibli', 'Disney', 'DreamWorks'],
    correctAnswer: 1,
    explanation: 'Le Studio Ghibli, fondé par Hayao Miyazaki, a produit ce chef-d\'œuvre de 2001.',
    category: 'media',
    difficulty: 'facile'
  },
  {
    id: 'media-10',
    question: 'Combien de saisons compte la série "Game of Thrones" ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'Game of Thrones compte 8 saisons diffusées de 2011 à 2019.',
    category: 'media',
    difficulty: 'facile'
  },
  {
    id: 'media-11',
    question: 'Qui a composé la bande-originale du Roi Lion ?',
    options: ['Hans Zimmer', 'John Williams', 'Danny Elfman', 'Howard Shore'],
    correctAnswer: 0,
    explanation: 'Hans Zimmer a composé la musique du Roi Lion et a remporté un Oscar.',
    category: 'media',
    difficulty: 'moyen'
  },
  {
    id: 'media-12',
    question: 'Quel est le premier film de l\'Univers Cinématographique Marvel ?',
    options: ['Iron Man', 'Thor', 'Captain America', 'Hulk'],
    correctAnswer: 0,
    explanation: 'Iron Man (2008) a lancé l\'Univers Cinématographique Marvel avec Robert Downey Jr.',
    category: 'media',
    difficulty: 'facile'
  },
];

// Questions Culture Générale
export const generalQuestions: QuizQuestion[] = [
  {
    id: 'general-1',
    question: 'Quelle est la capitale de l\'Australie ?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
    explanation: 'Canberra est la capitale de l\'Australie depuis 1908.',
    category: 'general',
    difficulty: 'moyen'
  },
  {
    id: 'general-2',
    question: 'Quel est le plus grand océan du monde ?',
    options: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'],
    correctAnswer: 3,
    explanation: 'L\'océan Pacifique couvre environ 165 millions de km².',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-3',
    question: 'Combien de continents existe-t-il ?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'Il y a 7 continents : Afrique, Amérique du Nord, Amérique du Sud, Antarctique, Asie, Europe, Océanie.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-4',
    question: 'Quelle est la formule chimique de l\'eau ?',
    options: ['CO2', 'H2O', 'NaCl', 'O2'],
    correctAnswer: 1,
    explanation: 'H2O représente deux atomes d\'hydrogène et un atome d\'oxygène.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-5',
    question: 'Qui a peint la Joconde ?',
    options: ['Vincent van Gogh', 'Léonard de Vinci', 'Pablo Picasso', 'Michel-Ange'],
    correctAnswer: 1,
    explanation: 'Léonard de Vinci a peint la Joconde entre 1503 et 1519.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-6',
    question: 'Quel est l\'organe le plus grand du corps humain ?',
    options: ['Le foie', 'Le cerveau', 'La peau', 'Les intestins'],
    correctAnswer: 2,
    explanation: 'La peau est l\'organe le plus grand, avec environ 2 m² chez l\'adulte.',
    category: 'general',
    difficulty: 'moyen'
  },
  {
    id: 'general-7',
    question: 'Quelle planète est la plus proche du Soleil ?',
    options: ['Vénus', 'Mercure', 'Mars', 'Terre'],
    correctAnswer: 1,
    explanation: 'Mercure est la planète la plus proche du Soleil.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-8',
    question: 'Quel est le nombre pi (π) arrondi à deux décimales ?',
    options: ['3,12', '3,14', '3,16', '3,18'],
    correctAnswer: 1,
    explanation: 'Pi vaut approximativement 3,14159..., arrondi à 3,14.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-9',
    question: 'Quel animal est le plus grand mammifère du monde ?',
    options: ['L\'éléphant', 'La baleine bleue', 'Le requin blanc', 'L\'orque'],
    correctAnswer: 1,
    explanation: 'La baleine bleue peut atteindre 30 mètres et peser 180 tonnes.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-10',
    question: 'Dans quel pays se trouve la Grande Muraille ?',
    options: ['Japon', 'Chine', 'Corée du Sud', 'Inde'],
    correctAnswer: 1,
    explanation: 'La Grande Muraille de Chine s\'étend sur plus de 21 000 km.',
    category: 'general',
    difficulty: 'facile'
  },
  {
    id: 'general-11',
    question: 'Quel élément chimique a pour symbole "Au" ?',
    options: ['Argent', 'Aluminium', 'Or', 'Argon'],
    correctAnswer: 2,
    explanation: 'Au vient du latin "aurum" signifiant or.',
    category: 'general',
    difficulty: 'moyen'
  },
  {
    id: 'general-12',
    question: 'Combien de dents possède un adulte ?',
    options: ['28', '30', '32', '36'],
    correctAnswer: 2,
    explanation: 'Un adulte a normalement 32 dents, y compris les 4 dents de sagesse.',
    category: 'general',
    difficulty: 'moyen'
  },
];

// Questions Histoire
export const histoireQuestions: QuizQuestion[] = [
  {
    id: 'histoire-1',
    question: 'En quelle année a eu lieu la Révolution française ?',
    options: ['1776', '1789', '1792', '1804'],
    correctAnswer: 1,
    explanation: 'La Révolution française a commencé en 1789 avec la prise de la Bastille.',
    category: 'histoire',
    difficulty: 'facile'
  },
  {
    id: 'histoire-2',
    question: 'Qui était le premier empereur de France ?',
    options: ['Louis XIV', 'Charlemagne', 'Napoléon Bonaparte', 'Jules César'],
    correctAnswer: 2,
    explanation: 'Napoléon Bonaparte s\'est couronné empereur en 1804.',
    category: 'histoire',
    difficulty: 'facile'
  },
  {
    id: 'histoire-3',
    question: 'Quelle guerre a duré de 1914 à 1918 ?',
    options: ['La Seconde Guerre mondiale', 'La Guerre de Cent Ans', 'La Première Guerre mondiale', 'La Guerre de Sécession'],
    correctAnswer: 2,
    explanation: 'La Première Guerre mondiale a fait environ 18 millions de morts.',
    category: 'histoire',
    difficulty: 'facile'
  },
  {
    id: 'histoire-4',
    question: 'Qui a découvert l\'Amérique en 1492 ?',
    options: ['Vasco de Gama', 'Christophe Colomb', 'Magellan', 'Marco Polo'],
    correctAnswer: 1,
    explanation: 'Christophe Colomb a atteint les Amériques le 12 octobre 1492.',
    category: 'histoire',
    difficulty: 'facile'
  },
  {
    id: 'histoire-5',
    question: 'Quelle reine d\'Égypte s\'est alliée avec Jules César ?',
    options: ['Néfertiti', 'Cléopâtre', 'Hatschepsout', 'Néfertari'],
    correctAnswer: 1,
    explanation: 'Cléopâtre VII a eu un fils, Césarion, avec Jules César.',
    category: 'histoire',
    difficulty: 'moyen'
  },
  {
    id: 'histoire-6',
    question: 'En quelle année est tombé le mur de Berlin ?',
    options: ['1987', '1988', '1989', '1990'],
    correctAnswer: 2,
    explanation: 'Le mur de Berlin est tombé le 9 novembre 1989.',
    category: 'histoire',
    difficulty: 'moyen'
  },
  {
    id: 'histoire-7',
    question: 'Qui a construit les pyramides d\'Égypte ?',
    options: ['Les esclaves romains', 'Les extraterrestres', 'Les ouvriers égyptiens', 'Les Hébreux'],
    correctAnswer: 2,
    explanation: 'Les pyramides ont été construites par des ouvriers égyptiens rémunérés.',
    category: 'histoire',
    difficulty: 'moyen'
  },
  {
    id: 'histoire-8',
    question: 'Quelle dynastie a construit la Grande Muraille ?',
    options: ['Han', 'Tang', 'Qin', 'Ming'],
    correctAnswer: 2,
    explanation: 'La première Grande Muraille a été construite sous la dynastie Qin.',
    category: 'histoire',
    difficulty: 'difficile'
  },
  {
    id: 'histoire-9',
    question: 'Qui a écrit "Le Prince", traité de politique ?',
    options: ['Machiavel', 'Platon', 'Aristote', 'Thomas More'],
    correctAnswer: 0,
    explanation: 'Nicolas Machiavel a écrit "Le Prince" en 1513.',
    category: 'histoire',
    difficulty: 'moyen'
  },
  {
    id: 'histoire-10',
    question: 'Quelle bataille a marqué la fin de l\'empire napoléonien ?',
    options: ['Austerlitz', 'Waterloo', 'Iéna', 'Trafalgar'],
    correctAnswer: 1,
    explanation: 'Napoléon a été défait à Waterloo le 18 juin 1815.',
    category: 'histoire',
    difficulty: 'moyen'
  },
  {
    id: 'histoire-11',
    question: 'Quelle civilisation a bâti Machu Picchu ?',
    options: ['Les Aztèques', 'Les Mayas', 'Les Incas', 'Les Olmèques'],
    correctAnswer: 2,
    explanation: 'Machu Picchu est une cité inca construite au XVe siècle.',
    category: 'histoire',
    difficulty: 'moyen'
  },
  {
    id: 'histoire-12',
    question: 'Qui était le premier président des États-Unis ?',
    options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
    correctAnswer: 2,
    explanation: 'George Washington a été le premier président de 1789 à 1797.',
    category: 'histoire',
    difficulty: 'facile'
  },
];

// Toutes les questions par catégorie

// Fonction pour obtenir les 4 questions du jour
export function getDailyQuestions(): QuizQuestion[] {
  const today = new Date().toISOString().split('T')[0];
  
  // Vérifier si on a déjà des questions pour aujourd'hui
  const saved = localStorage.getItem('dailyQuizState');
  if (saved) {
    const parsed: DailyQuizState = JSON.parse(saved);
    if (parsed.date === today) {
      return parsed.questions;
    }
  }
  
  // Générer de nouvelles questions pour aujourd'hui
  // Utiliser la date comme seed pour avoir des questions cohérentes
  const seed = new Date(today).getTime();
  const dailyQuestions: QuizQuestion[] = [
    getSeededQuestion(actuQuestions, seed),
    getSeededQuestion(mediaQuestions, seed + 1),
    getSeededQuestion(generalQuestions, seed + 2),
    getSeededQuestion(histoireQuestions, seed + 3),
  ];
  
  // Sauvegarder
  const quizState: DailyQuizState = {
    date: today,
    questions: dailyQuestions,
    completed: false,
    score: 0,
    answers: [],
  };
  localStorage.setItem('dailyQuizState', JSON.stringify(quizState));
  
  return dailyQuestions;
}

// Fonction pour obtenir une question basée sur un seed
function getSeededQuestion(questions: QuizQuestion[], seed: number): QuizQuestion {
  // Algorithme de seed simple
  const index = Math.abs(seed % questions.length);
  return questions[index];
}

// Fonction pour marquer le quiz comme complété
export function completeDailyQuiz(score: number, answers: number[]): void {
  const saved = localStorage.getItem('dailyQuizState');
  if (saved) {
    const parsed: DailyQuizState = JSON.parse(saved);
    parsed.completed = true;
    parsed.score = score;
    parsed.answers = answers;
    localStorage.setItem('dailyQuizState', JSON.stringify(parsed));
  }
  
  // Mettre à jour le score utilisateur global
  const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
  userStats.dailyQuizzesCompleted = (userStats.dailyQuizzesCompleted || 0) + 1;
  userStats.totalScore = (userStats.totalScore || 0) + score;
  userStats.xp = (userStats.xp || 0) + (score * 10) + (score === 4 ? 50 : 0); // +50 XP bonus pour score parfait
  
  // Vérifier le niveau
  const newLevel = Math.floor(userStats.xp / 3000) + 1;
  if (newLevel > userStats.level) {
    userStats.level = newLevel;
  }
  
  localStorage.setItem('userStats', JSON.stringify(userStats));
}

// Fonction pour vérifier si le quiz du jour est déjà fait
export function isDailyQuizCompleted(): boolean {
  const today = new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem('dailyQuizState');
  if (saved) {
    const parsed: DailyQuizState = JSON.parse(saved);
    return parsed.date === today && parsed.completed;
  }
  return false;
}

// Fonction pour obtenir le score du jour
export function getTodayScore(): number {
  const saved = localStorage.getItem('dailyQuizState');
  if (saved) {
    const parsed: DailyQuizState = JSON.parse(saved);
    return parsed.score || 0;
  }
  return 0;
}

// Fonction pour obtenir l'état du quiz
export function getDailyQuizState(): DailyQuizState | null {
  const saved = localStorage.getItem('dailyQuizState');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}
