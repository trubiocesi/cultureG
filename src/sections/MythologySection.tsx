import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Quote, BookOpen, RotateCcw, Sparkles, Landmark, ArrowLeft, Eye } from 'lucide-react';
import { 
  mythologyItems, 
  mythologyCategories, 
  getDailyMythologyItem, 
  markMythologyAsViewed, 
  getViewedMythology,
  getNextMythologyItem,
  type MythologyCategory 
} from '@/data/mythologyData';

const categoryOrder: MythologyCategory[] = ['oeuvre', 'sculpture', 'philosophie', 'astronomie', 'histoire'];

export function MythologySection() {
  const [currentItem, setCurrentItem] = useState(mythologyItems[0]);
  const [viewedItems, setViewedItems] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [justViewed, setJustViewed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof mythologyItems[0] | null>(null);

  useEffect(() => {
    const viewed = getViewedMythology();
    setViewedItems(viewed);
    
    const dailyItem = getDailyMythologyItem();
    setCurrentItem(dailyItem);
  }, []);

  const handleMarkAsViewed = () => {
    if (viewedItems.includes(currentItem.id)) return;
    
    markMythologyAsViewed(currentItem.id);
    const updatedViewed = [...viewedItems, currentItem.id];
    setViewedItems(updatedViewed);
    setJustViewed(true);
    
    setTimeout(() => {
      const nextItem = getNextMythologyItem(updatedViewed);
      if (nextItem) {
        setCurrentItem(nextItem);
        setJustViewed(false);
        setExpanded(false);
      }
    }, 2000);
  };

  const handleNextItem = () => {
    const nextItem = getNextMythologyItem(viewedItems);
    if (nextItem) {
      setCurrentItem(nextItem);
      setExpanded(false);
    }
  };

  const handleItemClick = (item: typeof mythologyItems[0]) => {
    setSelectedItem(item);
  };

  const handleBackFromDetail = () => {
    setSelectedItem(null);
  };

  const getProgress = () => {
    return Math.round((viewedItems.length / mythologyItems.length) * 100);
  };

  const isViewed = viewedItems.includes(currentItem.id);
  const category = mythologyCategories[currentItem.category];

  // Vue détaillée d'un item
  if (selectedItem) {
    const itemCategory = mythologyCategories[selectedItem.category];
    const itemViewed = viewedItems.includes(selectedItem.id);

    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <button
            onClick={handleBackFromDetail}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${itemCategory.color} flex items-center gap-1`}>
                <span>{itemCategory.icon}</span>
                {itemCategory.label}
              </div>
              {itemViewed && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Vu
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{selectedItem.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <BookOpen className="w-4 h-4" />
              <span>{selectedItem.author || 'Anonyme'}</span>
              <span className="text-gray-400">•</span>
              <span>{selectedItem.date}</span>
            </div>
            
            <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5 mb-3">
              <span className="font-medium">Pourquoi c'est important :</span>{' '}
              {selectedItem.whyImportant}
            </p>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {selectedItem.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  Points clés
                </h4>
                <ul className="space-y-1.5">
                  {selectedItem.keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedItem.quote && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                  <Quote className="w-4 h-4 text-amber-400 mb-2" />
                  <p className="text-sm text-gray-800 italic">
                    "{selectedItem.quote}"
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-5 pt-0">
            {!itemViewed ? (
              <button
                onClick={() => {
                  markMythologyAsViewed(selectedItem.id);
                  setViewedItems([...viewedItems, selectedItem.id]);
                  handleBackFromDetail();
                }}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Check className="w-4 h-4" />
                J'ai découvert
              </button>
            ) : (
              <div className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Déjà découvert
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Vue "Tous les trésors"
  if (showAll) {
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Tous les trésors</h2>
            <button
              onClick={() => setShowAll(false)}
              className="text-xs text-blue-600 font-medium"
            >
              Retour
            </button>
          </div>
        </motion.div>

        <div className="space-y-2">
          {mythologyItems.map((item, index) => {
            const itemCategory = mythologyCategories[item.category];
            const itemViewed = viewedItems.includes(item.id);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity:1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleItemClick(item)}
                className="bg-white rounded-xl p-3 shadow-sm cursor-pointer active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{itemCategory.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-[10px] text-gray-500">{item.author || item.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    {itemViewed && (
                      <span className="text-green-500">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-5 text-white"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold">Mythologie</h2>
            <p className="text-white/80 text-xs">Trésors grecs & romains</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <span className="text-xs font-medium">{viewedItems.length}/{mythologyItems.length}</span>
        </div>
      </motion.div>

      {/* Category Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-3 shadow-sm"
      >
        <div className="flex justify-between">
          {categoryOrder.map((cat) => {
            const isCurrent = currentItem.category === cat;
            const catInfo = mythologyCategories[cat];
            
            return (
              <div key={cat} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                  isCurrent ? catInfo.color : 'bg-gray-100 text-gray-400'
                }`}>
                  {catInfo.icon}
                </div>
                <span className={`text-[8px] ${isCurrent ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  {catInfo.label.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Item Card */}
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-5">
          {/* Header */}
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
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{currentItem.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <BookOpen className="w-4 h-4" />
            <span>{currentItem.author || 'Anonyme'}</span>
            <span className="text-gray-400">•</span>
            <span>{currentItem.date}</span>
          </div>
          
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5 mb-3">
            <span className="font-medium">Pourquoi c'est important :</span>{' '}
            {currentItem.whyImportant}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {currentItem.description}
          </p>

          {/* Expand Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {expanded ? 'Voir moins' : 'En savoir plus'}
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
                {/* Key Facts */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    Points clés
                  </h4>
                  <ul className="space-y-1.5">
                    {currentItem.keyFacts.map((fact, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                {currentItem.quote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4"
                  >
                    <Quote className="w-4 h-4 text-amber-400 mb-2" />
                    <p className="text-sm text-gray-800 italic">
                      "{currentItem.quote}"
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
              <Sparkles className="w-4 h-4 inline mr-1" />
              +15 XP ! Découverte suivante...
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
                    Déjà découvert
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    J'ai découvert
                  </>
                )}
              </button>
              
              <button
                onClick={handleNextItem}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* See All Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setShowAll(true)}
        className="w-full py-3 px-4 bg-white text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors border border-gray-200"
      >
        Voir tous les trésors ({mythologyItems.length})
      </motion.button>
    </div>
  );
}
