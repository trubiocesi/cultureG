import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Quote, BookOpen, Star, RotateCcw, Filter } from 'lucide-react';
import { 
  works, 
  workCategories, 
  getRandomWork, 
  markWorkAsViewed, 
  getViewedWorks,
  type Work,
  type WorkType 
} from '@/data/worksData';

interface LiterarySectionProps {
  onStatsUpdate?: (stats: Partial<{ xp: number; level: number; worksViewed: number }>) => void;
}

const workTypes: WorkType[] = ['livre', 'manga', 'film', 'serie', 'anime'];

export function LiterarySection({ onStatsUpdate }: LiterarySectionProps) {
  const [currentWork, setCurrentWork] = useState<Work | null>(null);
  const [viewedWorks, setViewedWorks] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState<WorkType | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [justViewed, setJustViewed] = useState(false);

  useEffect(() => {
    const viewed = getViewedWorks();
    setViewedWorks(viewed);
    
    // Charger une œuvre aléatoire non vue
    const work = getRandomWork(viewed, selectedType || undefined);
    setCurrentWork(work);
  }, [selectedType]);

  const handleMarkAsViewed = () => {
    if (!currentWork) return;
    
    markWorkAsViewed(currentWork.id);
    const updatedViewed = [...viewedWorks, currentWork.id];
    setViewedWorks(updatedViewed);
    setJustViewed(true);
    
    // Mettre à jour les stats
    if (onStatsUpdate) {
      const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      onStatsUpdate({
        xp: userStats.xp,
        level: userStats.level,
        worksViewed: userStats.worksViewed,
      });
    }
    
    // Proposer une nouvelle œuvre après 2 secondes
    setTimeout(() => {
      const nextWork = getRandomWork(updatedViewed, selectedType || undefined);
      setCurrentWork(nextWork);
      setJustViewed(false);
    }, 2000);
  };

  const handleNextWork = () => {
    const nextWork = getRandomWork(viewedWorks, selectedType || undefined);
    setCurrentWork(nextWork);
    setExpanded(false);
  };

  const getProgress = () => {
    return Math.round((viewedWorks.length / works.length) * 100);
  };

  if (!currentWork) {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm text-center"
        >
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Tu as tout vu !
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Tu as exploré toutes nos recommandations.
          </p>
          <button
            onClick={() => {
              setViewedWorks([]);
              localStorage.setItem('viewedWorks', '[]');
              const work = getRandomWork([], selectedType || undefined);
              setCurrentWork(work);
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </button>
        </motion.div>
      </div>
    );
  }

  const category = workCategories[currentWork.type];
  const isViewed = viewedWorks.includes(currentWork.id);

  return (
    <div className="space-y-3">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Découvrir</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-xl transition-colors ${showFilters ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <span className="text-xs text-gray-500">{viewedWorks.length}/{works.length}</span>
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-3 shadow-sm"
          >
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedType === null 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tout
              </button>
              {workTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type === selectedType ? null : type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                    selectedType === type 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{workCategories[type].icon}</span>
                  {workCategories[type].label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work Card */}
      <motion.div
        key={currentWork.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${category.color} flex items-center gap-1`}>
              <span>{category.icon}</span>
              {category.label}
            </div>
            {isViewed && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                <Check className="w-3 h-3" />
                Vu
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{currentWork.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <BookOpen className="w-4 h-4" />
            <span>{currentWork.author}</span>
            <span className="text-gray-400">•</span>
            <span>{currentWork.year}</span>
          </div>
          
          <p className="text-xs text-gray-500 bg-amber-50 rounded-lg p-2.5 mb-3">
            <span className="font-medium text-amber-700">Pourquoi c'est intellectuel :</span>{' '}
            {currentWork.whyIntellectual}
          </p>

          {/* Summary */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {currentWork.summary}
          </p>

          {/* Expand Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {expanded ? 'Voir moins' : 'Voir plus'}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100"
            >
              <div className="p-5 pt-4 space-y-4">
                {/* Key Points */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    Points clés
                  </h4>
                  <ul className="space-y-1.5">
                    {currentWork.keyPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                {currentWork.quote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4"
                  >
                    <Quote className="w-4 h-4 text-amber-400 mb-2" />
                    <p className="text-sm text-gray-800 italic">
                      "{currentWork.quote}"
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="p-5 pt-0">
          {justViewed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 text-green-700 rounded-xl p-3 text-center text-sm font-medium"
            >
              <Check className="w-5 h-5 inline mr-1" />
              +25 XP ! Prochaine œuvre...
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleMarkAsViewed}
                disabled={isViewed}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                  isViewed
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isViewed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Déjà vu
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {category.action}
                  </>
                )}
              </button>
              
              <button
                onClick={handleNextWork}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-500">Œuvres vues</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">{viewedWorks.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-gray-500">Progression</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">{getProgress()}%</p>
        </div>
      </motion.div>
    </div>
  );
}
