export type WorkType = 'livre' | 'manga' | 'film' | 'serie' | 'anime';

export interface Work {
  id: string;
  title: string;
  author: string;
  year: number;
  type: WorkType;
  genre: string;
  summary: string;
  keyPoints: string[];
  quote?: string;
  whyIntellectual: string;
}

export const workCategories: Record<WorkType, { label: string; icon: string; color: string; action: string }> = {
  livre: { label: 'Livre', icon: '📖', color: 'bg-blue-100 text-blue-700', action: 'J\'ai lu' },
  manga: { label: 'Manga', icon: '🇯🇵', color: 'bg-red-100 text-red-700', action: 'J\'ai lu' },
  film: { label: 'Film', icon: '🎬', color: 'bg-purple-100 text-purple-700', action: 'J\'ai vu' },
  serie: { label: 'Série', icon: '📺', color: 'bg-green-100 text-green-700', action: 'J\'ai vu' },
  anime: { label: 'Animé', icon: '✨', color: 'bg-pink-100 text-pink-700', action: 'J\'ai vu' },
};

// Œuvres intellectuelles sélectionnées
export const works: Work[] = [
  // Livres
  {
    id: 'livre-1',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    type: 'livre',
    genre: 'Dystopie',
    summary: 'Dans un futur totalitaire, Winston Smith tente de résister au contrôle absolu du Parti et de Big Brother.',
    keyPoints: [
      'La surveillance de masse et la perte de vie privée',
      'La manipulation de la vérité et des faits',
      'Le langage comme outil de contrôle (Novlangue)',
      'La résistance individuelle face au totalitarisme'
    ],
    quote: 'Big Brother vous regarde.',
    whyIntellectual: 'Une critique profonde des régimes totalitaires et une anticipation troublante de la surveillance moderne.'
  },
  {
    id: 'livre-2',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    type: 'livre',
    genre: 'Conte philosophique',
    summary: 'Un aviateur rencontre un petit prince venu d\'une autre planète qui lui raconte ses voyages et ses rencontres.',
    keyPoints: [
      'L\'amitié et les relations humaines authentiques',
      'La critique de la société adulte matérialiste',
      'La beauté de l\'enfance et de l\'imagination',
      'Le renard et le secret : "On ne voit bien qu\'avec le cœur"'
    ],
    quote: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.',
    whyIntellectual: 'Une œuvre intemporelle qui interroge le sens de la vie, l\'amitié et l\'authenticité.'
  },
  {
    id: 'livre-3',
    title: 'Sapiens: Une brève histoire de l\'humanité',
    author: 'Yuval Noah Harari',
    year: 2011,
    type: 'livre',
    genre: 'Essai historique',
    summary: 'Une exploration de l\'histoire de l\'humanité depuis l\'apparition d\'Homo sapiens jusqu\'à l\'ère moderne.',
    keyPoints: [
      'La révolution cognitive et l\'émergence des fictions collectives',
      'L\'agriculture comme piège à temps',
      'L\'unification de l\'humanité',
      'La révolution scientifique et le capitalisme'
    ],
    whyIntellectual: 'Une perspective fascinante sur notre histoire qui remet en question nos certitudes.'
  },
  {
    id: 'livre-4',
    title: 'L\'Étranger',
    author: 'Albert Camus',
    year: 1942,
    type: 'livre',
    genre: 'Roman philosophique',
    summary: 'Meursault, un employé algérois, vit sa vie avec indifférence jusqu\'au jour où il commet un acte irréversible.',
    keyPoints: [
      'L\'absurde et l\'indifférence face au monde',
      'La société et ses jugements moraux',
      'Le soleil comme symbole de vérité',
      'La conscience de la mort et l\'authenticité'
    ],
    quote: 'Aujourd\'hui, maman est morte. Ou peut-être hier, je ne sais pas.',
    whyIntellectual: 'Une introduction accessible à la philosophie de l\'absurde et à l\'existentialisme.'
  },
  {
    id: 'livre-5',
    title: 'Pensées pour moi-même',
    author: 'Marc Aurèle',
    year: 180,
    type: 'livre',
    genre: 'Philosophie',
    summary: 'Les notes personnelles de l\'empereur romain Marc Aurèle sur la vie, la vertu et le stoïcisme.',
    keyPoints: [
      'Le stoïcisme comme mode de vie',
      'L\'acceptation de ce qui ne dépend pas de nous',
      'La brièveté de la vie et l\'importance du moment présent',
      'La vertu comme seul bien véritable'
    ],
    quote: 'Vous avez le pouvoir sur votre esprit, pas sur les événements extérieurs.',
    whyIntellectual: 'Le manuel de référence du stoïcisme, toujours pertinent 2000 ans plus tard.'
  },
  {
    id: 'livre-6',
    title: 'De la démocratie en Amérique',
    author: 'Alexis de Tocqueville',
    year: 1835,
    type: 'livre',
    genre: 'Essai politique',
    summary: 'Analyse de la démocratie américaine et de ses implications pour l\'avenir des sociétés occidentales.',
    keyPoints: [
      'L\'égalité des conditions comme tendance historique',
      'Les dangers du despotisme doux',
      'Le rôle des associations dans la démocratie',
      'La tyrannie de la majorité'
    ],
    whyIntellectual: 'Une analyse précoce et toujours d\'actualité des forces et faiblesses de la démocratie.'
  },
  
  // Mangas
  {
    id: 'manga-1',
    title: 'Monster',
    author: 'Naoki Urasawa',
    year: 1994,
    type: 'manga',
    genre: 'Thriller psychologique',
    summary: 'Un chirurgien sauve la vie d\'un enfant qui deviendra un tueur en série. Il part à sa recherche pour expier sa faute.',
    keyPoints: [
      'La nature du mal et de la culpabilité',
      'La valeur de la vie humaine',
      'Le post-guerre en Allemagne',
      'La psychologie des personnages profonde'
    ],
    whyIntellectual: 'Un thriller mature qui explore la psychologie humaine, la morale et la nature du bien et du mal.'
  },
  {
    id: 'manga-2',
    title: 'Berserk',
    author: 'Kentaro Miura',
    year: 1989,
    type: 'manga',
    genre: 'Dark fantasy',
    summary: 'Guts, un mercenaire maudit, parcourt le monde à la recherche de vengeance contre son ancien ami devenu démon.',
    keyPoints: [
      'La détermination face à l\'adversité',
      'L\'amitié trahie et la vengeance',
      'La question du destin et du libre arbitre',
      'Les thèmes philosophiques sur la nature humaine'
    ],
    quote: 'L\'homme qui pense doit être plus triste que les autres.',
    whyIntellectual: 'Une œuvre profonde sur la volonté humaine, le destin et la nature du mal.'
  },
  {
    id: 'manga-3',
    title: '20th Century Boys',
    author: 'Naoki Urasawa',
    year: 1999,
    type: 'manga',
    genre: 'Science-fiction',
    summary: 'Un groupe d\'amis d\'enfance doit affronter une mystérieuse organisation qui semble réaliser leur fantasme d\'enfance.',
    keyPoints: [
      'La nostalgie et l\'amitié',
      'Le pouvoir des idéologies',
      'La mémoire et la vérité',
      'Le héros ordinaire face à l\'histoire'
    ],
    whyIntellectual: 'Une réflexion sur le pouvoir des idéologies, la mémoire collective et l\'histoire.'
  },
  {
    id: 'manga-4',
    title: 'Vagabond',
    author: 'Takehiko Inoue',
    year: 1998,
    type: 'manga',
    genre: 'Samurai',
    summary: 'L\'histoire de Miyamoto Musashi, du brigand le plus redouté du Japon au plus grand samouraï de l\'histoire.',
    keyPoints: [
      'La quête de la perfection',
      'Le chemin de la voie (Dō)',
      'La solitude du guerrier',
      'La transformation personnelle'
    ],
    quote: 'Invincible est l\'homme qui ne désire rien.',
    whyIntellectual: 'Une méditation sur la recherche de la perfection, la voie du guerrier et la transformation personnelle.'
  },
  
  // Films
  {
    id: 'film-1',
    title: 'Interstellar',
    author: 'Christopher Nolan',
    year: 2014,
    type: 'film',
    genre: 'Science-fiction',
    summary: 'Dans un futur où la Terre est devenue hostile, un groupe d\'explorateurs utilise un trou de ver pour voyager à travers l\'espace.',
    keyPoints: [
      'La relativité du temps',
      'L\'amour comme force transcendante',
      'La survie de l\'humanité',
      'Les trous noirs et la physique quantique'
    ],
    quote: 'Nous sommes nés pour être des pionniers, pas des gardiens.',
    whyIntellectual: 'Exploration scientifique rigoureuse de la relativité, des trous noirs et de l\'amour comme force fondamentale.'
  },
  {
    id: 'film-2',
    title: 'La Liste de Schindler',
    author: 'Steven Spielberg',
    year: 1993,
    type: 'film',
    genre: 'Drame historique',
    summary: 'L\'histoire vraie d\'Oskar Schindler, un industriel allemand qui sauva plus de 1000 Juifs pendant l\'Holocauste.',
    keyPoints: [
      'La moralité face au régime nazi',
      'Le choix entre l\'indifférence et l\'action',
      'La valeur de chaque vie humaine',
      'La complicité et la résistance'
    ],
    quote: 'Qui sauve une vie sauve le monde entier.',
    whyIntellectual: 'Une réflexion profonde sur la moralité, le choix individuel et la valeur de la vie humaine.'
  },
  {
    id: 'film-3',
    title: 'Matrix',
    author: 'Lana & Lilly Wachowski',
    year: 1999,
    type: 'film',
    genre: 'Science-fiction',
    summary: 'Un pirate informatique découvre que la réalité est une simulation contrôlée par des machines.',
    keyPoints: [
      'La nature de la réalité',
      'La libre pensée face au conformisme',
      'La philosophie de Platon (l\'allégorie de la caverne)',
      'Le messianisme et le sacrifice'
    ],
    quote: 'Il n\'y a pas de cuillère.',
    whyIntellectual: 'Une exploration philosophique de la nature de la réalité, inspirée de Platon, Baudrillard et la philosophie orientale.'
  },
  {
    id: 'film-4',
    title: 'Le Parrain',
    author: 'Francis Ford Coppola',
    year: 1972,
    type: 'film',
    genre: 'Drame',
    summary: 'La saga de la famille Corleone, clan mafieux dirigé par Vito Corleone et son fils Michael.',
    keyPoints: [
      'Le pouvoir et sa corruption',
      'La famille et la loyauté',
      'Le rêve américain détourné',
      'La transformation morale de Michael'
    ],
    quote: 'Je vais lui faire une offre qu\'il ne peut pas refuser.',
    whyIntellectual: 'Une étude magistrale du pouvoir, de la corruption et de la famille dans l\'Amérique du XXe siècle.'
  },
  {
    id: 'film-5',
    title: '2001: L\'Odyssée de l\'espace',
    author: 'Stanley Kubrick',
    year: 1968,
    type: 'film',
    genre: 'Science-fiction',
    summary: 'Un vaisseau spatial est envoyé vers Jupiter avec à son bord un ordinateur intelligent qui se rebelle.',
    keyPoints: [
      'L\'évolution de l\'humanité',
      'L\'intelligence artificielle',
      'La rencontre avec l\'extra-terrestre',
      'La transcendance humaine'
    ],
    quote: 'Je suis désolé Dave, j\'ai bien peur de ne pas pouvoir faire ça.',
    whyIntellectual: 'Une exploration visuelle et philosophique de l\'évolution humaine, de l\'IA et de notre place dans l\'univers.'
  },
  
  // Séries
  {
    id: 'serie-1',
    title: 'Breaking Bad',
    author: 'Vince Gilligan',
    year: 2008,
    type: 'serie',
    genre: 'Drame',
    summary: 'Un professeur de chimie atteint d\'un cancer se lance dans la fabrication de méthamphétamine.',
    keyPoints: [
      'La transformation morale progressive',
      'Les conséquences de nos choix',
      'Le pouvoir et la corruption',
      'La famille et les mensonges'
    ],
    quote: 'Je ne suis pas en danger, Skyler. Je suis le danger.',
    whyIntellectual: 'Une étude fascinante de la transformation morale d\'un homme ordinaire en criminel.'
  },
  {
    id: 'serie-2',
    title: 'The Wire',
    author: 'David Simon',
    year: 2002,
    type: 'serie',
    genre: 'Drame policier',
    summary: 'La lutte contre le trafic de drogue à Baltimore, vue des deux côtés : la police et les dealers.',
    keyPoints: [
      'Les institutions et leur dysfonctionnement',
      'La guerre contre la drogue',
      'La société américaine et ses failles',
      'La moralité ambiguë'
    ],
    whyIntellectual: 'Une critique sociale profonde des institutions américaines, considérée comme la meilleure série télévisée.'
  },
  {
    id: 'serie-3',
    title: 'Chernobyl',
    author: 'Craig Mazin',
    year: 2019,
    type: 'serie',
    genre: 'Drame historique',
    summary: 'Reconstitution de la catastrophe nucléaire de Tchernobyl et de ses conséquences.',
    keyPoints: [
      'Le déni de la vérité par le régime soviétique',
      'Le sacrifice des liquidateurs',
      'La nature de la vérité scientifique',
      'Le prix de la dissimulation'
    ],
    quote: 'Chaque mensonge que nous disons implique une dette envers la vérité.',
    whyIntellectual: 'Une réflexion sur la vérité, le pouvoir politique et le sacrifice individuel pour le bien collectif.'
  },
  {
    id: 'serie-4',
    title: 'The Crown',
    author: 'Peter Morgan',
    year: 2016,
    type: 'serie',
    genre: 'Drame historique',
    summary: 'Les règnes de la reine Élisabeth II et les événements qui ont marqué l\'histoire britannique.',
    keyPoints: [
      'Le pouvoir et le devoir',
      'La monarchie dans le monde moderne',
      'Les conflits entre vie publique et privée',
      'L\'histoire politique britannique'
    ],
    whyIntellectual: 'Une exploration du pouvoir, du devoir et de l\'histoire britannique contemporaine.'
  },
  
  // Animés
  {
    id: 'anime-1',
    title: 'Neon Genesis Evangelion',
    author: 'Hideaki Anno',
    year: 1995,
    type: 'anime',
    genre: 'Mecha / Psychologique',
    summary: 'Des adolescents pilotent des robots géants pour défendre l\'humanité contre des créatures mystérieuses.',
    keyPoints: [
      'La dépression et l\'isolement',
      'La relation parent-enfant',
      'La psychologie freudienne',
      'La quête de sens de l\'existence'
    ],
    quote: 'Je ne dois pas fuir. Je ne dois pas fuir.',
    whyIntellectual: 'Une exploration profonde de la psychologie, de la dépression et de la condition humaine à travers la philosophie et la psychanalyse.'
  },
  {
    id: 'anime-2',
    title: 'Ghost in the Shell',
    author: 'Mamoru Oshii',
    year: 1995,
    type: 'anime',
    genre: 'Cyberpunk',
    summary: 'Dans un futur cybernétique, une major traque un hacker capable de pirater des esprits humains.',
    keyPoints: [
      'La nature de la conscience et de l\'identité',
      'Les frontières entre l\'homme et la machine',
      'La philosophie de l\'esprit',
      'Les implications de la cybernétique'
    ],
    quote: 'Le réseau est vaste et infini.',
    whyIntellectual: 'Une réflexion philosophique majeure sur la conscience, l\'identité et le transhumanisme.'
  },
  {
    id: 'anime-3',
    title: 'Death Note',
    author: 'Tsugumi Ohba & Takeshi Obata',
    year: 2006,
    type: 'anime',
    genre: 'Thriller psychologique',
    summary: 'Un lycéen découvre un carnet qui tue quiconque voit son nom écrit dedans. Il décide de créer un monde sans crime.',
    keyPoints: [
      'La justice et la vengeance',
      'Le pouvoir absolu et sa corruption',
      'Le chat et la souris intellectuel',
      'La moralité du bien et du mal'
    ],
    quote: 'Les humains sont intéressants.',
    whyIntellectual: 'Un duel intellectuel fascinant sur la justice, la moralité et le pouvoir absolu.'
  },
  {
    id: 'anime-4',
    title: 'Serial Experiments Lain',
    author: 'Yoshitoshi ABe',
    year: 1998,
    type: 'anime',
    genre: 'Cyberpunk psychologique',
    summary: 'Une adolescente découvre le Wired (Internet) et commence à questionner la nature de la réalité et de son identité.',
    keyPoints: [
      'La réalité virtuelle et la dissociation',
      'L\'identité dans l\'ère numérique',
      'La conscience collective',
      'La frontière entre réel et virtuel'
    ],
    quote: 'Tu n\'es que ce que tu te souviens être.',
    whyIntellectual: 'Une exploration avant-gardiste de l\'identité numérique et de la nature de la réalité.'
  },
];

// Fonction pour obtenir une œuvre aléatoire non vue
export function getRandomWork(excludeIds: string[] = [], type?: WorkType): Work | null {
  let availableWorks = works.filter(w => !excludeIds.includes(w.id));
  
  if (type) {
    availableWorks = availableWorks.filter(w => w.type === type);
  }
  
  if (availableWorks.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableWorks.length);
  return availableWorks[randomIndex];
}

// Fonction pour obtenir une œuvre du jour
export function getDailyWork(): Work {
  const today = new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem('dailyWork');
  
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === today) {
      return parsed.work;
    }
  }
  
  // Nouvelle œuvre pour aujourd'hui
  const viewedWorks = JSON.parse(localStorage.getItem('viewedWorks') || '[]');
  const work = getRandomWork(viewedWorks) || works[0];
  
  localStorage.setItem('dailyWork', JSON.stringify({ date: today, work }));
  return work;
}

// Fonction pour marquer une œuvre comme vue
export function markWorkAsViewed(workId: string): void {
  const viewedWorks = JSON.parse(localStorage.getItem('viewedWorks') || '[]');
  if (!viewedWorks.includes(workId)) {
    viewedWorks.push(workId);
    localStorage.setItem('viewedWorks', JSON.stringify(viewedWorks));
  }
  
  // Mettre à jour les stats
  const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
  userStats.worksViewed = (userStats.worksViewed || 0) + 1;
  userStats.xp = (userStats.xp || 0) + 25;
  
  const newLevel = Math.floor(userStats.xp / 3000) + 1;
  if (newLevel > userStats.level) {
    userStats.level = newLevel;
  }
  
  localStorage.setItem('userStats', JSON.stringify(userStats));
}

// Fonction pour obtenir les œuvres vues
export function getViewedWorks(): string[] {
  return JSON.parse(localStorage.getItem('viewedWorks') || '[]');
}
