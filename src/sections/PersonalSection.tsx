import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, BookOpen, Brain, CheckCircle2, 
  Calendar, Star, Trophy, Flame, TrendingUp,
  Image, Library, Grid3X3, List,
  Palette, ArrowLeft, Medal, Target,
  Wifi, WifiOff, Download, Check
} from 'lucide-react';
import type { UserStats } from '@/types';
import { works, workCategories } from '@/data/worksData';
import { mythologyItems } from '@/data/mythologyData';
import { useOffline, downloadAllContent, isAllContentDownloaded } from '@/hooks/useOffline';

interface PersonalSectionProps {
  stats: UserStats;
}

interface DailyStats {
  dailyQuizzesCompleted: number;
  totalScore: number;
  streakDays: number;
  worksViewed: number;
  mythologyViewed: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

// Système de niveaux
const LEVELS = [
  { level: 1, title: 'Débutant', minXP: 0, color: 'from-gray-400 to-gray-500' },
  { level: 2, title: 'Curieux', minXP: 3000, color: 'from-green-400 to-green-500' },
  { level: 3, title: 'Apprenti', minXP: 6000, color: 'from-blue-400 to-blue-500' },
  { level: 4, title: 'Étudiant', minXP: 10000, color: 'from-indigo-400 to-indigo-500' },
  { level: 5, title: 'Érudit', minXP: 15000, color: 'from-purple-400 to-purple-500' },
  { level: 6, title: 'Savant', minXP: 22000, color: 'from-pink-400 to-pink-500' },
  { level: 7, title: 'Sage', minXP: 30000, color: 'from-orange-400 to-orange-500' },
  { level: 8, title: 'Expert', minXP: 40000, color: 'from-red-400 to-red-500' },
  { level: 9, title: 'Maître', minXP: 55000, color: 'from-yellow-400 to-yellow-500' },
  { level: 10, title: 'Grand Maître', minXP: 75000, color: 'from-amber-400 to-amber-500' },
];

export function PersonalSection({ stats }: PersonalSectionProps) {
  const [activeView, setActiveView] = useState<'main' | 'galerie' | 'bibliotheque' | 'badges'>('main');
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    dailyQuizzesCompleted: 0,
    totalScore: 0,
    streakDays: 1,
    worksViewed: 0,
    mythologyViewed: 0,
  });
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [viewedWorks, setViewedWorks] = useState<string[]>([]);
  const [viewedMythology, setViewedMythology] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [contentDownloaded, setContentDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const { isOnline } = useOffline();

  useEffect(() => {
    const saved = localStorage.getItem('userStats');
    if (saved) {
      const parsed = JSON.parse(saved);
      setDailyStats({
        dailyQuizzesCompleted: parsed.dailyQuizzesCompleted || 0,
        totalScore: parsed.totalScore || 0,
        streakDays: parsed.streakDays || 1,
        worksViewed: parsed.worksViewed || 0,
        mythologyViewed: parsed.mythologyViewed || 0,
      });
    }
    
    const dailyQuiz = localStorage.getItem('dailyQuizState');
    if (dailyQuiz) {
      const parsed = JSON.parse(dailyQuiz);
      const today = new Date().toISOString().split('T')[0];
      setTodayCompleted(parsed.date === today && parsed.completed);
    }

    const works = JSON.parse(localStorage.getItem('viewedWorks') || '[]');
    setViewedWorks(works);

    const mythology = JSON.parse(localStorage.getItem('viewedMythology') || '[]');
    setViewedMythology(mythology);

    setContentDownloaded(isAllContentDownloaded());
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    downloadAllContent();
    setTimeout(() => {
      setContentDownloaded(true);
      setIsDownloading(false);
    }, 1500);
  };

  // Obtenir le niveau actuel
  const getCurrentLevel = () => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (stats.xp >= LEVELS[i].minXP) {
        return LEVELS[i];
      }
    }
    return LEVELS[0];
  };

  // Obtenir le prochain niveau
  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevelIndex = LEVELS.findIndex(l => l.level === currentLevel.level) + 1;
    return LEVELS[nextLevelIndex] || null;
  };

  // Calculer la progression vers le prochain niveau
  const getLevelProgress = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;
    
    const xpInCurrentLevel = stats.xp - currentLevel.minXP;
    const xpNeededForNext = nextLevel.minXP - currentLevel.minXP;
    return Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));
  };

  // Badges
  const badges: Badge[] = [
    { 
      id: 'explorer', 
      name: 'Explorateur d\'art', 
      description: 'Découvrir 5 œuvres d\'art', 
      icon: Palette, 
      unlocked: dailyStats.worksViewed >= 5,
      progress: Math.min(dailyStats.worksViewed, 5),
      maxProgress: 5
    },
    { 
      id: 'philosopher', 
      name: 'Philosophe', 
      description: 'Découvrir 10 trésors de mythologie', 
      icon: Brain, 
      unlocked: dailyStats.mythologyViewed >= 10,
      progress: Math.min(dailyStats.mythologyViewed, 10),
      maxProgress: 10
    },
    { 
      id: 'historian', 
      name: 'Historien', 
      description: 'Compléter 7 quiz consécutifs', 
      icon: BookOpen, 
      unlocked: dailyStats.streakDays >= 7,
      progress: Math.min(dailyStats.streakDays, 7),
      maxProgress: 7
    },
    { 
      id: 'master', 
      name: 'Maître', 
      description: 'Atteindre le niveau 10', 
      icon: Trophy, 
      unlocked: getCurrentLevel().level >= 10,
      progress: getCurrentLevel().level,
      maxProgress: 10
    },
    { 
      id: 'perfect', 
      name: 'Score Parfait', 
      description: 'Obtenir 4/4 à un quiz', 
      icon: Star, 
      unlocked: dailyStats.totalScore >= 4
    },
    { 
      id: 'streak30', 
      name: 'Série de 30 jours', 
      description: '30 jours consécutifs de quiz', 
      icon: Flame, 
      unlocked: dailyStats.streakDays >= 30,
      progress: dailyStats.streakDays,
      maxProgress: 30
    },
  ];

  // Défis hebdomadaires
  const challenges: Challenge[] = [
    {
      id: 'c1',
      title: 'Lecteur assidu',
      description: 'Lire 3 œuvres cette semaine',
      reward: 50,
      completed: dailyStats.worksViewed >= 3,
      progress: Math.min(dailyStats.worksViewed, 3),
      maxProgress: 3
    },
    {
      id: 'c2',
      title: 'Score parfait x3',
      description: 'Obtenir 3 scores parfaits (4/4)',
      reward: 100,
      completed: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'c3',
      title: 'Explorateur de mythologie',
      description: 'Découvrir 5 trésors mythologiques',
      reward: 75,
      completed: dailyStats.mythologyViewed >= 5,
      progress: Math.min(dailyStats.mythologyViewed, 5),
      maxProgress: 5
    },
  ];

  const averageScore = dailyStats.dailyQuizzesCompleted > 0
    ? Math.round((dailyStats.totalScore / (dailyStats.dailyQuizzesCompleted * 4)) * 100)
    : 0;

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const levelProgress = getLevelProgress();

  // Galerie - œuvres d'art (sculptures de mythologie)
  const artWorks = mythologyItems.filter(item => item.category === 'sculpture');
  const viewedArt = artWorks.filter(item => viewedMythology.includes(item.id));

  // Bibliothèque - tous les works
  const libraryWorks = works.filter(work => viewedWorks.includes(work.id));
  const filteredLibrary = filterType 
    ? libraryWorks.filter(w => w.type === filterType)
    : libraryWorks;

  // VUE GALERIE
  if (activeView === 'galerie') {
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <button
            onClick={() => setActiveView('main')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-6 h-6" />
            <h2 className="font-semibold text-lg">Ma Galerie</h2>
          </div>
          <p className="text-white/80 text-sm">
            {viewedArt.length} œuvre{viewedArt.length > 1 ? 's' : ''} découverte{viewedArt.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {viewedArt.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <Palette className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucune œuvre d'art découverte</p>
            <p className="text-gray-400 text-xs mt-1">Explore la section Mythologie !</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {viewedArt.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="w-full h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-4xl">🏛️</span>
                </div>
                <h3 className="font-medium text-sm text-gray-900 truncate">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.date}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // VUE BIBLIOTHÈQUE
  if (activeView === 'bibliotheque') {
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveView('main')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <Library className="w-6 h-6" />
            <h2 className="font-semibold text-lg">Ma Bibliothèque</h2>
          </div>
          <p className="text-white/80 text-sm">
            {libraryWorks.length} œuvre{libraryWorks.length > 1 ? 's' : ''} dans ta collection
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setFilterType(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filterType === null ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Tout
          </button>
          {['livre', 'manga', 'film', 'serie', 'anime'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? null : type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap capitalize ${
                filterType === type ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {filteredLibrary.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucune œuvre dans ta bibliothèque</p>
            <p className="text-gray-400 text-xs mt-1">Explore la section Œuvres !</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredLibrary.map((work, index) => {
              const category = workCategories[work.type];
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className={`w-full h-24 rounded-lg flex items-center justify-center mb-3 ${category.color}`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 truncate">{work.title}</h3>
                  <p className="text-xs text-gray-500">{work.author}</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLibrary.map((work, index) => {
              const category = workCategories[work.type];
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${category.color}`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 truncate">{work.title}</h3>
                    <p className="text-xs text-gray-500">{work.author}</p>
                  </div>
                  <span className="text-xs text-gray-400">{work.year}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // VUE BADGES
  if (activeView === 'badges') {
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <button
            onClick={() => setActiveView('main')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <Medal className="w-6 h-6" />
            <h2 className="font-semibold text-lg">Mes Badges</h2>
          </div>
          <p className="text-white/80 text-sm">
            {badges.filter(b => b.unlocked).length}/{badges.length} badges débloqués
          </p>
        </motion.div>

        {/* Badges */}
        <div className="space-y-2">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl p-4 shadow-sm ${!badge.unlocked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    badge.unlocked 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-900">{badge.name}</h3>
                      {badge.unlocked && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </div>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                    {badge.progress !== undefined && badge.maxProgress && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {badge.progress}/{badge.maxProgress}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Défis hebdomadaires */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Défis hebdomadaires
          </h3>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div key={challenge.id} className={`p-3 rounded-xl ${challenge.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-medium ${challenge.completed ? 'text-green-700' : 'text-gray-700'}`}>
                    {challenge.title}
                  </h4>
                  <span className="text-xs text-amber-600 font-medium">+{challenge.reward} XP</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{challenge.description}</p>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-gray-400'}`}
                    style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {challenge.progress}/{challenge.maxProgress}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // VUE PRINCIPALE
  return (
    <div className="space-y-3">
      {/* Status bar - Online/Offline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-3 shadow-sm flex items-center justify-between ${
          isOnline ? 'bg-green-50' : 'bg-amber-50'
        }`}
      >
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-amber-600" />
          )}
          <span className={`text-xs font-medium ${isOnline ? 'text-green-700' : 'text-amber-700'}`}>
            {isOnline ? 'En ligne' : 'Hors ligne'}
          </span>
        </div>
        {!contentDownloaded && isOnline && (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium"
          >
            {isDownloading ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Téléchargement...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Télécharger
              </>
            )}
          </button>
        )}
        {contentDownloaded && (
          <span className="flex items-center gap-1 text-xs text-green-600">
            <Check className="w-3.5 h-3.5" />
            Disponible hors-ligne
          </span>
        )}
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${currentLevel.color} rounded-2xl p-5 text-white`}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <User className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold">{currentLevel.title}</h2>
            <p className="text-white/80 text-xs">Niveau {currentLevel.level} • {stats.xp} XP</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-300">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-semibold">{dailyStats.streakDays}j</span>
            </div>
            <p className="text-white/60 text-[10px]">série</p>
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-white/70">Niveau {currentLevel.level}</span>
            <span className="text-white/70">{nextLevel ? `Niveau ${nextLevel.level}` : 'Max'}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-white/60 text-[10px] mt-1">
            {nextLevel 
              ? `${nextLevel.minXP - stats.xp} XP pour le prochain niveau`
              : 'Niveau maximum atteint !'}
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onClick={() => setActiveView('galerie')}
          className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <Image className="w-5 h-5 text-pink-600" />
          </div>
          <span className="text-[10px] font-medium text-gray-700">Galerie</span>
          <span className="text-[10px] text-gray-400">{viewedArt.length}</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setActiveView('bibliotheque')}
          className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Library className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] font-medium text-gray-700">Bibliothèque</span>
          <span className="text-[10px] text-gray-400">{libraryWorks.length}</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => setActiveView('badges')}
          className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Medal className="w-5 h-5 text-yellow-600" />
          </div>
          <span className="text-[10px] font-medium text-gray-700">Badges</span>
          <span className="text-[10px] text-gray-400">{badges.filter(b => b.unlocked).length}</span>
        </motion.button>
      </div>

      {/* Daily Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Objectifs du jour</h3>
        
        <div className="space-y-2">
          <div className={`flex items-center gap-3 p-3 rounded-xl ${todayCompleted ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${todayCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <Brain className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${todayCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                Quiz du jour
              </p>
              <p className="text-[10px] text-gray-500">
                {todayCompleted ? 'Complété !' : '4 questions à répondre'}
              </p>
            </div>
            {todayCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          </div>
          
          <div className={`flex items-center gap-3 p-3 rounded-xl ${dailyStats.worksViewed > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dailyStats.worksViewed > 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${dailyStats.worksViewed > 0 ? 'text-green-700' : 'text-gray-700'}`}>
                Découvrir une œuvre
              </p>
              <p className="text-[10px] text-gray-500">
                {dailyStats.worksViewed > 0 ? `${dailyStats.worksViewed} vue(s)` : 'Livre, film ou manga'}
              </p>
            </div>
            {dailyStats.worksViewed > 0 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] text-gray-500">Quiz complétés</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">{dailyStats.dailyQuizzesCompleted}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-[10px] text-gray-500">Score moyen</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">{averageScore || 0}%</p>
        </motion.div>
      </div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Cette semaine
          </h3>
        </div>
        
        <div className="flex gap-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => {
            const isActive = i < 5;
            const isToday = i === 4;
            return (
              <div key={i} className="flex-1">
                <div 
                  className={`
                    h-10 rounded-xl flex items-center justify-center mb-1 transition-colors
                    ${isActive 
                      ? isToday
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 ring-2 ring-blue-300'
                        : 'bg-gradient-to-br from-blue-500 to-purple-500'
                      : 'bg-gray-100'
                    }
                  `}
                >
                  {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <p className={`text-[10px] text-center ${isToday ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                  {day}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
