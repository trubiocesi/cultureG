import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Newspaper, BookOpen, Landmark, TrendingUp, User, Trophy, Flame } from 'lucide-react';
import type { Category, UserStats } from '@/types';
import { QuizSection } from '@/sections/QuizSection';
import { NewsSection } from '@/sections/NewsSection';
import { LiterarySection } from '@/sections/LiterarySection';
import { MythologySection } from '@/sections/MythologySection';
import { PopularSection } from '@/sections/PopularSection';
import { PersonalSection } from '@/sections/PersonalSection';

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'quiz', label: 'Quiz', icon: Brain },
  { id: 'actualites', label: 'Actus', icon: Newspaper },
  { id: 'oeuvres', label: 'Œuvres', icon: BookOpen },
  { id: 'mythologie', label: 'Mytho', icon: Landmark },
  { id: 'populaire', label: 'Tendances', icon: TrendingUp },
  { id: 'personnel', label: 'Profil', icon: User },
];

const defaultStats: UserStats = {
  quizzesCompleted: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  streakDays: 1,
  favoriteCategory: 'Art',
  level: 1,
  xp: 0,
};

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('quiz');
  const [userStats, setUserStats] = useState<UserStats>(defaultStats);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger les stats utilisateur
    const saved = localStorage.getItem('userStats');
    if (saved) {
      setUserStats(JSON.parse(saved));
    } else {
      localStorage.setItem('userStats', JSON.stringify(defaultStats));
    }
    setIsLoaded(true);
  }, []);

  const updateStats = (newStats: Partial<UserStats>) => {
    const updated = { ...userStats, ...newStats };
    setUserStats(updated);
    localStorage.setItem('userStats', JSON.stringify(updated));
  };

  const renderSection = () => {
    switch (activeCategory) {
      case 'quiz':
        return <QuizSection onStatsUpdate={updateStats} />;
      case 'actualites':
        return <NewsSection />;
      case 'oeuvres':
        return <LiterarySection onStatsUpdate={updateStats} />;
      case 'mythologie':
        return <MythologySection />;
      case 'populaire':
        return <PopularSection />;
      case 'personnel':
        return <PersonalSection stats={userStats} />;
      default:
        return <QuizSection onStatsUpdate={updateStats} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">Culture Générale</h1>
                <p className="text-xs text-gray-500">Apprends chaque jour</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium text-orange-700">{userStats.streakDays}j</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-full">
                <Trophy className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-medium text-purple-700">{userStats.level}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200/50 safe-area-pb">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around items-center py-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-400 hover:text-gray-600'
                    }
                  `}
                >
                  <div className={`
                    relative p-2 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-transparent'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gray-900 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
