export type MythologyCategory = 'oeuvre' | 'sculpture' | 'philosophie' | 'astronomie' | 'histoire';

export interface MythologyItem {
  id: string;
  title: string;
  author?: string;
  date: string;
  category: MythologyCategory;
  description: string;
  keyFacts: string[];
  whyImportant: string;
  image?: string;
  quote?: string;
}

export const mythologyCategories: Record<MythologyCategory, { label: string; icon: string; color: string }> = {
  oeuvre: { label: 'Œuvre littéraire', icon: '📜', color: 'bg-amber-100 text-amber-700' },
  sculpture: { label: 'Sculpture', icon: '🏛️', color: 'bg-stone-100 text-stone-700' },
  philosophie: { label: 'Philosophie', icon: '🤔', color: 'bg-blue-100 text-blue-700' },
  astronomie: { label: 'Astronomie', icon: '⭐', color: 'bg-indigo-100 text-indigo-700' },
  histoire: { label: 'Histoire', icon: '⚔️', color: 'bg-red-100 text-red-700' },
};

// Items de mythologie grecque et romaine
export const mythologyItems: MythologyItem[] = [
  // Œuvres littéraires
  {
    id: 'myth-oeuvre-1',
    title: 'L\'Odyssée',
    author: 'Homère',
    date: 'VIIIe siècle av. J.-C.',
    category: 'oeuvre',
    description: 'Le retour mouvementé d\'Ulysse (Odysseus) vers Ithaque après la guerre de Troie. Un voyage de dix ans parsemé d\'épreuves et de rencontres mythiques.',
    keyFacts: [
      'Ulysse affronte Cyclope, Circé et les sirènes',
      'Son épouse Pénélope attend fidèlement son retour',
      'Télémaque part à sa recherche',
      'Le récit est structuré en 24 chants'
    ],
    whyImportant: 'Fondement de la littérature occidentale, modèle du voyage initiatique et de l\'héroïsme.',
    quote: 'Dis-moi, Muse, l\'homme aux mille ruses qui tant de fois erra...'
  },
  {
    id: 'myth-oeuvre-2',
    title: 'L\'Iliade',
    author: 'Homère',
    date: 'VIIIe siècle av. J.-C.',
    category: 'oeuvre',
    description: 'Le récit de la colère d\'Achille pendant la guerre de Troie. L\'un des plus grands poèmes épiques de l\'Antiquité.',
    keyFacts: [
      'Achille refuse de combattre après un affront d\'Agamemnon',
      'Hector, prince troyen, défend sa ville',
      'La mort de Patrocle pousse Achille à reprendre les armes',
      'Le cheval de Troie n\'est mentionné que brièvement'
    ],
    whyImportant: 'Première œuvre majeure de la civilisation occidentale, exploration de la gloire et de la mort.'
  },
  {
    id: 'myth-oeuvre-3',
    title: 'Les Métamorphoses',
    author: 'Ovide',
    date: '8 ap. J.-C.',
    category: 'oeuvre',
    description: 'Un poème en 15 livres racontant les transformations des êtres dans la mythologie gréco-romaine.',
    keyFacts: [
      'Plus de 250 mythes interconnectés',
      'Le thème central est le changement de forme',
      'De la création du monde jusqu\'à l\'apothéose de César',
      'Source majeure pour les artistes de la Renaissance'
    ],
    whyImportant: 'Bible mythologique de l\'Antiquité, source d\'inspiration inépuisable pour l\'art occidental.'
  },
  {
    id: 'myth-oeuvre-4',
    title: 'La Théogonie',
    author: 'Hésiode',
    date: 'VIIe siècle av. J.-C.',
    category: 'oeuvre',
    description: 'Poème décrivant les origines et la généalogie des dieux grecs, de Chaos à Zeus.',
    keyFacts: [
      'Naissance des dieux depuis le Chaos originel',
      'La lutte entre Cronos et Ouranos',
      'La victoire de Zeus sur les Titans',
      'Les Muses inspirent le poète'
    ],
    whyImportant: 'Texte fondateur de la mythologie grecque, systématisation des croyances religieuses.'
  },
  
  // Sculptures
  {
    id: 'myth-sculpt-1',
    title: 'Vénus de Milo',
    author: 'Alexandros d\'Antioche',
    date: '130-100 av. J.-C.',
    category: 'sculpture',
    description: 'Statue de marbre représentant Aphrodite (Vénus), déesse de l\'amour et de la beauté. Ses bras manquants ajoutent à son mystère.',
    keyFacts: [
      'Découverte en 1820 sur l\'île de Milo',
      'Haute de 2,04 mètres',
      'Sculptée en marbre de Paros',
      'Au Louvre depuis son acquisition par la France'
    ],
    whyImportant: 'Symbole universel de la beauté féminine, chef-d\'œuvre de l\'art hellénistique.'
  },
  {
    id: 'myth-sculpt-2',
    title: 'Le Discobole',
    author: 'Myron',
    date: '450 av. J.-C. (original)',
    category: 'sculpture',
    description: 'Athlète grec au moment précis du lancer du disque. Parfait exemple de l\'équilibre entre mouvement et repos.',
    keyFacts: [
      'L\'original en bronze est perdu',
      'Connu par des copies romaines en marbre',
      'Représente l\'idéal athlétique grec',
      'Exemple du "moment juste" dans l\'art'
    ],
    whyImportant: 'Incarne l\'idéal de beauté et d\'harmonie du corps athlétique dans la Grèce antique.'
  },
  {
    id: 'myth-sculpt-3',
    title: 'La Victoire de Samothrace',
    author: 'Inconnu',
    date: '190 av. J.-C.',
    category: 'sculpture',
    description: 'Niké (Victoire) debout sur la proue d\'un navire. Ses ailes déployées suggèrent un atterrissage.',
    keyFacts: [
      'Découverte en 1863 sur l\'île de Samothrace',
      'Haute de 2,75 mètres avec sa base',
      'Probablement une offrande pour une victoire navale',
      'Considérée comme le plus grand chef-d\'œuvre hellénistique'
    ],
    whyImportant: 'Expression suprême du mouvement et de la victoire dans la sculpture antique.'
  },
  {
    id: 'myth-sculpt-4',
    title: 'Le Laocoon',
    author: 'Agesandros, Athénodoros, Polydoros',
    date: 'Ier siècle av. J.-C.',
    category: 'sculpture',
    description: 'Le prêtre Laocoon et ses deux fils luttant contre les serpents marins envoyés par les dieux.',
    keyFacts: [
      'Découvert à Rome en 1506',
      'Michel-Ange s\'en serait inspiré',
      'Illustre la punition divine',
      'Exemple de pathos (émotion) dans l\'art'
    ],
    whyImportant: 'Chef-d\'œuvre de l\'expression de la souffrance, influence majeure sur l\'art occidental.'
  },
  
  // Philosophie
  {
    id: 'myth-philo-1',
    title: 'Le Mythe de la Caverne',
    author: 'Platon',
    date: 'IVe siècle av. J.-C.',
    category: 'philosophie',
    description: 'Allégorie célèbre où des prisonniers voient uniquement des ombres, prenant l\'illusion pour la réalité.',
    keyFacts: [
      'Les prisonniers voient des ombres projetées sur un mur',
      'Un prisonnier s\'échappe et découvre le vrai monde',
      'Il retourne avertir les autres mais est moqué',
      'Métaphore de la quête de la connaissance'
    ],
    whyImportant: 'Fondement de la théorie platonicienne des Idées, métaphore de l\'illumination philosophique.',
    quote: 'L\'essentiel n\'est pas de vivre, mais de bien vivre.'
  },
  {
    id: 'myth-philo-2',
    title: 'L\'Apologie de Socrate',
    author: 'Platon',
    date: '399 av. J.-C.',
    category: 'philosophie',
    description: 'Discours de défense de Socrate lors de son procès pour impiété et corruption de la jeunesse.',
    keyFacts: [
      'Socrate est accusé de ne pas croire aux dieux de la cité',
      'Il prétend n\'être que le plus sage car il sait qu\'il ne sait rien',
      'Condamné à mort par empoisonnement au cicuta',
      'Refuse de s\'enfuir malgré la possibilité'
    ],
    whyImportant: 'Fondement de la philosophie morale, portrait du philosophe en chercheur de vérité.',
    quote: 'Une vie sans examen ne vaut pas la peine d\'être vécue.'
  },
  {
    id: 'myth-philo-3',
    title: 'La Méditation',
    author: 'Marc Aurèle',
    date: '161-180 ap. J.-C.',
    category: 'philosophie',
    description: 'Notes personnelles de l\'empereur romain sur le stoïcisme, la vertu et la vie.',
    keyFacts: [
      'Écrites en grec malgré la nationalité latine',
      'Jamais destinées à la publication',
      '12 livres de réflexions personnelles',
      'Guide pratique du stoïcisme'
    ],
    whyImportant: 'Manuel de sagesse pratique, l\'un des plus grands textes de philosophie morale.',
    quote: 'Vous avez le pouvoir sur votre esprit, pas sur les événements extérieurs.'
  },
  {
    id: 'myth-philo-4',
    title: 'L\'Éthique à Nicomaque',
    author: 'Aristote',
    date: 'IVe siècle av. J.-C.',
    category: 'philosophie',
    description: 'Traité sur la vertu et le bonheur. Définit la vertu comme un juste milieu entre deux excès.',
    keyFacts: [
      'La vertu est une habitude choisie',
      'Le juste milieu entre deux vices',
      'Le bonheur est l\'activité de l\'âme selon la vertu',
      'L\'amitié est essentielle à la vie bonne'
    ],
    whyImportant: 'Fondement de l\'éthique occidentale, définition classique de la vertu et du bonheur.'
  },
  
  // Astronomie
  {
    id: 'myth-astro-1',
    title: 'L\'Almageste',
    author: 'Claude Ptolémée',
    date: '150 ap. J.-C.',
    category: 'astronomie',
    description: 'Traité d\'astronomie qui a dominé la pensée occidentale pendant 1400 ans. Système géocentrique.',
    keyFacts: [
      'La Terre est au centre de l\'univers',
      'Les planètes décrivent des épicycles',
      'Tables pour prédire les positions des astres',
      'Influencé par la pensée aristotélicienne'
    ],
    whyImportant: 'Ouvrage fondamental de l\'astronomie antique, référence jusqu\'à Copernic.'
  },
  {
    id: 'myth-astro-2',
    title: 'Constellations du Zodiaque',
    author: 'Tradition grecque',
    date: 'Ve siècle av. J.-C.',
    category: 'astronomie',
    description: 'Les 12 constellations du zodiaque et leur signification astrologique et mythologique.',
    keyFacts: [
      'Bélier, Taureau, Gémeaux, Cancer, Lion, Vierge',
      'Balance, Scorpion, Sagittaire, Capricorne, Verseau, Poissons',
      'Chacune associée à un mythe',
      'Utilisées pour la navigation et l\'astrologie'
    ],
    whyImportant: 'Système de compréhension du ciel qui a influencé l\'astronomie et la culture occidentale.'
  },
  {
    id: 'myth-astro-3',
    title: 'Antikythera',
    author: 'Inconnu (ingénieurs grecs)',
    date: '100 av. J.-C.',
    category: 'astronomie',
    description: 'Mécanisme de bronze découvert dans une épave, considéré comme le premier ordinateur analogique.',
    keyFacts: [
      'Prédit les éclipses solaires et lunaires',
      'Calcule les positions des planètes',
      'Plus de 30 engrenages en bronze',
      'Technologie comparable à celle du XVIIIe siècle'
    ],
    whyImportant: 'Témoigne du niveau technologique exceptionnel de la Grèce antique.'
  },
  
  // Histoire
  {
    id: 'myth-hist-1',
    title: 'La Bataille des Thermopyles',
    author: 'Hérodote (chroniqueur)',
    date: '480 av. J.-C.',
    category: 'histoire',
    description: '300 Spartiates menés par Léonidas résistent à l\'armée perse de Xerxès Ier pendant trois jours.',
    keyFacts: [
      '300 Spartiates contre 100 000 à 300 000 Perses',
      'Léonidas et ses hommes meurent tous',
      'Permet aux Grecs de se regrouper',
      'Symbole du sacrifice pour la liberté'
    ],
    whyImportant: 'Symbole universel du courage et du sacrifice pour la liberté face à l\'oppression.',
    quote: 'Molon labe (Viens les chercher) - Léonidas'
  },
  {
    id: 'myth-hist-2',
    title: 'La Guerre du Péloponnèse',
    author: 'Thucydide',
    date: '431-404 av. J.-C.',
    category: 'histoire',
    description: 'Conflit entre Athènes et Sparte pour la domination de la Grèce. Décrit par Thucydide.',
    keyFacts: [
      'Athènes (démocratie) vs Sparte (oligarchie)',
      'Guerre totale pendant 27 ans',
      'Fin de l\'âge d\'or athénien',
      'Leçons sur le pouvoir et la réalpolitik'
    ],
    whyImportant: 'Premier récit historique analytique, fondement de la théorie des relations internationales.'
  },
  {
    id: 'myth-hist-3',
    title: 'Alexandre le Grand',
    author: 'Histoire',
    date: '356-323 av. J.-C.',
    category: 'histoire',
    description: 'Roi de Macédoine qui a conquis un empire s\'étendant de la Grèce à l\'Inde en 13 ans.',
    keyFacts: [
      'Élève d\'Aristote',
      'Conquête de l\'Empire perse',
      'Fondation de plus de 70 villes',
      'Mort à 32 ans à Babylone'
    ],
    whyImportant: 'A hellénisé le monde antique, répandant la culture grecque jusqu\'en Asie centrale.'
  },
  {
    id: 'myth-hist-4',
    title: 'L\'Incendie de Rome',
    author: 'Tacite (chroniqueur)',
    date: '64 ap. J.-C.',
    category: 'histoire',
    description: 'Grand incendie de Rome sous Néron. Le tyran aurait joué de la lyre pendant que la ville brûlait.',
    keyFacts: [
      'Dura 6 jours et 7 nuits',
      'Deux tiers de Rome détruits',
      'Néron accuse les chrétiens',
      'Première persécution systématique'
    ],
    whyImportant: 'Symbole de la tyrannie impériale et du pouvoir arbitraire sur la vie des citoyens.'
  }
];

// Fonction pour obtenir l'item du jour
export function getDailyMythologyItem(): MythologyItem {
  const today = new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem('dailyMythology');
  
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === today) {
      return parsed.item;
    }
  }
  
  // Nouvel item pour aujourd'hui
  const viewedItems = JSON.parse(localStorage.getItem('viewedMythology') || '[]');
  const availableItems = mythologyItems.filter(item => !viewedItems.includes(item.id));
  
  const itemsToChoose = availableItems.length > 0 ? availableItems : mythologyItems;
  const seed = new Date(today).getTime();
  const index = seed % itemsToChoose.length;
  const item = itemsToChoose[index];
  
  localStorage.setItem('dailyMythology', JSON.stringify({ date: today, item }));
  return item;
}

// Fonction pour marquer comme vu
export function markMythologyAsViewed(itemId: string): void {
  const viewedItems = JSON.parse(localStorage.getItem('viewedMythology') || '[]');
  if (!viewedItems.includes(itemId)) {
    viewedItems.push(itemId);
    localStorage.setItem('viewedMythology', JSON.stringify(viewedItems));
  }
  
  // Mettre à jour les stats
  const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
  userStats.mythologyViewed = (userStats.mythologyViewed || 0) + 1;
  userStats.xp = (userStats.xp || 0) + 15;
  localStorage.setItem('userStats', JSON.stringify(userStats));
}

// Fonction pour obtenir les items vus
export function getViewedMythology(): string[] {
  return JSON.parse(localStorage.getItem('viewedMythology') || '[]');
}

// Fonction pour obtenir le prochain item
export function getNextMythologyItem(excludeIds: string[] = []): MythologyItem | null {
  const availableItems = mythologyItems.filter(item => !excludeIds.includes(item.id));
  if (availableItems.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableItems.length);
  return availableItems[randomIndex];
}
