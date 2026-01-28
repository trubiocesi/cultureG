import type { QuizQuestion, NewsItem, LiteraryWork, PopularItem, PersonalSuggestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Qui a peint la Joconde ?',
    options: ['Vincent van Gogh', 'Léonard de Vinci', 'Pablo Picasso', 'Michel-Ange'],
    correctAnswer: 1,
    explanation: 'La Joconde a été peinte par Léonard de Vinci entre 1503 et 1519.',
    category: 'Art',
    difficulty: 'facile'
  },
  {
    id: '2',
    question: 'Quelle est la capitale de l\'Australie ?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
    explanation: 'Canberra est la capitale de l\'Australie depuis 1908.',
    category: 'Géographie',
    difficulty: 'moyen'
  },
  {
    id: '3',
    question: 'Qui a écrit "Les Misérables" ?',
    options: ['Émile Zola', 'Gustave Flaubert', 'Victor Hugo', 'Alexandre Dumas'],
    correctAnswer: 2,
    explanation: 'Les Misérables est un roman de Victor Hugo publié en 1862.',
    category: 'Littérature',
    difficulty: 'facile'
  },
  {
    id: '4',
    question: 'En quelle année a eu lieu la Révolution française ?',
    options: ['1789', '1792', '1776', '1804'],
    correctAnswer: 0,
    explanation: 'La Révolution française a commencé en 1789 avec la prise de la Bastille.',
    category: 'Histoire',
    difficulty: 'facile'
  },
  {
    id: '5',
    question: 'Quel est le plus grand océan du monde ?',
    options: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'],
    correctAnswer: 3,
    explanation: 'L\'océan Pacifique est le plus grand océan, couvrant environ 165 millions de km².',
    category: 'Géographie',
    difficulty: 'facile'
  },
  {
    id: '6',
    question: 'Qui a découvert la pénicilline ?',
    options: ['Louis Pasteur', 'Alexander Fleming', 'Marie Curie', 'Robert Koch'],
    correctAnswer: 1,
    explanation: 'Alexander Fleming a découvert la pénicilline en 1928.',
    category: 'Science',
    difficulty: 'moyen'
  },
  {
    id: '7',
    question: 'Quelle est la formule chimique de l\'eau ?',
    options: ['CO2', 'H2O', 'NaCl', 'O2'],
    correctAnswer: 1,
    explanation: 'L\'eau a pour formule chimique H2O (deux atomes d\'hydrogène et un atome d\'oxygène).',
    category: 'Science',
    difficulty: 'facile'
  },
  {
    id: '8',
    question: 'Qui a composé la Symphonie n°9 "Ode à la joie" ?',
    options: ['Mozart', 'Bach', 'Beethoven', 'Haydn'],
    correctAnswer: 2,
    explanation: 'L\'Ode à la joie est la dernière symphonie de Ludwig van Beethoven, composée entre 1822 et 1824.',
    category: 'Musique',
    difficulty: 'moyen'
  }
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Le Louvre inaugure une nouvelle exposition sur l\'art égyptien',
    summary: 'Une collection inédite de artefacts antiques est présentée pour la première fois.',
    content: 'Le musée du Louvre a inauguré hier une exposition majeure consacrée à l\'art égyptien antique. Cette présentation met en lumière plus de 200 pièces rarement montrées au public, dont des sarcophages, des bijoux et des papyrus datant de plus de 3000 ans.',
    date: '2026-01-25',
    source: 'Le Monde',
    category: 'Art'
  },
  {
    id: '2',
    title: 'Découverte archéologique majeure en Grèce',
    summary: 'Des fouilles ont révélé un théâtre antique parfaitement conservé.',
    content: 'Une équipe d\'archéologues grecs et internationaux a découvert un théâtre antique datant du IVe siècle avant J.-C. près d\'Athènes. Le site exceptionnellement bien conservé pourrait changer notre compréhension du théâtre classique grec.',
    date: '2026-01-24',
    source: 'National Geographic',
    category: 'Histoire'
  },
  {
    id: '3',
    title: 'Le Prix Goncourt 2025 récompense un roman sur l\'intelligence artificielle',
    summary: 'Une œuvre futuriste explore les implications éthiques de l\'IA.',
    content: 'Le prestigieux Prix Goncourt a été attribué cette année à un roman d\'anticipation qui interroge les rapports entre l\'homme et la machine. L\'auteur, âgé de 34 ans, est le plus jeune lauréat depuis 30 ans.',
    date: '2026-01-22',
    source: 'France Culture',
    category: 'Littérature'
  },
  {
    id: '4',
    title: 'NASA : nouvelles images spectaculaires de Jupiter',
    summary: 'Le télescope James Webb révèle les secrets de la grande planète gazeuse.',
    content: 'Les dernières images capturées par le télescope spatial James Webb montrent Jupiter sous un jour nouveau. Les scientifiques ont pu observer en détail les tempêtes polaires et les aurores boréales de la planète.',
    date: '2026-01-20',
    source: 'Science & Vie',
    category: 'Science'
  }
];

export const literaryWorks: LiteraryWork[] = [
  {
    id: '1',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    genre: 'Conte philosophique',
    summary: 'Un aviateur rencontre un petit prince venu d\'une autre planète qui lui raconte ses voyages et ses rencontres.',
    keyPoints: [
      'L\'amitié et les relations humaines',
      'La critique de la société adulte',
      'La beauté de l\'enfance et de l\'imagination',
      'Le renard et le secret : "On ne voit bien qu\'avec le cœur"'
    ],
    quote: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    genre: 'Dystopie',
    summary: 'Dans un futur totalitaire, Winston Smith tente de résister au contrôle absolu du Parti et de Big Brother.',
    keyPoints: [
      'La surveillance de masse',
      'La manipulation de la vérité',
      'La résistance individuelle',
      'Le langage comme outil de contrôle'
    ],
    quote: 'Big Brother vous regarde.'
  },
  {
    id: '3',
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    year: 1856,
    genre: 'Roman réaliste',
    summary: 'Emma Bovary, insatisfaite de sa vie de province, cherche l\'amour et le luxe, la conduisant à sa perte.',
    keyPoints: [
      'Le réalisme littéraire',
      'La critique de la bourgeoisie',
      'Le romantisme vs la réalité',
      'Les conséquences de l\'idéalisme'
    ],
    quote: 'Madame Bovary, c\'est moi.'
  },
  {
    id: '4',
    title: 'L\'Étranger',
    author: 'Albert Camus',
    year: 1942,
    genre: 'Roman philosophique',
    summary: 'Meursault, un employé algérois, vit sa vie avec indifférence jusqu\'au jour où il commet un acte irréversible.',
    keyPoints: [
      'L\'absurde et l\'indifférence',
      'La société et ses jugements',
      'Le soleil comme symbole',
      'La conscience de la mort'
    ],
    quote: 'Aujourd\'hui, maman est morte. Ou peut-être hier, je ne sais pas.'
  },
  {
    id: '5',
    title: 'À la recherche du temps perdu',
    author: 'Marcel Proust',
    year: 1913,
    genre: 'Roman',
    summary: 'Une exploration profonde de la mémoire, du temps et de la société française à travers les yeux du narrateur.',
    keyPoints: [
      'La mémoire involontaire',
      'La madeleine de Proust',
      'L\'observation de la société',
      'Le temps et sa perception'
    ],
    quote: 'Le véritable paradis est un paradis qu\'on a perdu.'
  }
];

export const popularItems: PopularItem[] = [
  {
    id: '1',
    title: 'Renaissance : L\'âge d\'or de l\'art italien',
    description: 'Découvrez les maîtres de la Renaissance : Léonard, Michel-Ange, Raphaël...',
    type: 'art',
    trending: true
  },
  {
    id: '2',
    title: 'La Révolution industrielle',
    description: 'Comment le monde est passé de l\'agriculture à l\'industrie.',
    type: 'histoire',
    trending: true
  },
  {
    id: '3',
    title: 'Les grands compositeurs classiques',
    description: 'Mozart, Beethoven, Bach : leur vie et leur œuvre.',
    type: 'musique',
    trending: false
  },
  {
    id: '4',
    title: 'Cinéma français : La Nouvelle Vague',
    description: 'Godard, Truffaut et les autres révolutionnaires du 7ème art.',
    type: 'film',
    trending: true
  },
  {
    id: '5',
    title: 'Les découvertes scientifiques du XXe siècle',
    description: 'Relativité, quantique, ADN : les révolutions qui ont changé notre vision du monde.',
    type: 'science',
    trending: false
  }
];

export const personalSuggestions: PersonalSuggestion[] = [
  {
    id: '1',
    title: 'Quiz : Les chefs-d\'œuvre de la peinture',
    description: 'Testez vos connaissances sur les plus grands tableaux de l\'histoire.',
    type: 'quiz',
    reason: 'Basé sur votre intérêt pour l\'art',
    completed: false
  },
  {
    id: '2',
    title: 'Lire : Les Misérables (résumé)',
    description: 'Un résumé détaillé du chef-d\'œuvre de Victor Hugo.',
    type: 'article',
    reason: 'Vous aimez la littérature classique',
    completed: false
  },
  {
    id: '3',
    title: 'Quiz : Géographie du monde',
    description: 'Capitales, fleuves et montagnes : êtes-vous incollable ?',
    type: 'quiz',
    reason: 'Pour diversifier vos connaissances',
    completed: true
  },
  {
    id: '4',
    title: 'Découvrir : L\'Origine du monde de Courbet',
    description: 'L\'histoire fascinante d\'un tableau controversé.',
    type: 'article',
    reason: 'Recommandé pour les amateurs d\'art',
    completed: false
  }
];

export const categoryIcons: Record<string, string> = {
  'Art': '🎨',
  'Histoire': '📜',
  'Géographie': '🌍',
  'Science': '🔬',
  'Littérature': '📚',
  'Musique': '🎵',
  'Cinéma': '🎬',
  'Philosophie': '🤔',
  'Sport': '⚽',
  'Politique': '🏛️'
};

export const difficultyColors = {
  facile: 'bg-green-100 text-green-700',
  moyen: 'bg-yellow-100 text-yellow-700',
  difficile: 'bg-red-100 text-red-700'
};
