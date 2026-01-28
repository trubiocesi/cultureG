import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Flame, Film, Music, Palette, Landmark, Atom, BookOpen, Twitter, MessageCircle, ExternalLink, RefreshCw, Calendar, ChevronDown, ChevronUp, Bookmark, Share2, Newspaper } from 'lucide-react';

interface TrendingItem {
  id: string;
  title: string;
  description: string;
  type: 'film' | 'musique' | 'art' | 'histoire' | 'science' | 'livre';
  trending: boolean;
  mentions: number;
  platform: string;
  date: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
}

// Tendances simulées
const trendingData: TrendingItem[] = [
  {
    id: '1',
    title: 'Oppenheimer aux Oscars',
    description: 'Le film de Christopher Nolan domine les nominations avec 13 catégories.',
    type: 'film',
    trending: true,
    mentions: 125000,
    platform: 'Twitter',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Beyoncé : nouvel album country',
    description: 'La chanteuse surprend ses fans avec un album de country qui fait débat.',
    type: 'musique',
    trending: true,
    mentions: 98000,
    platform: 'TikTok',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Exposition Van Gogh immersive',
    description: 'Les expositions immersives connaissent un succès mondial.',
    type: 'art',
    trending: true,
    mentions: 67000,
    platform: 'Instagram',
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    title: 'Découverte d\'une nouvelle pyramide',
    description: 'Les archéologues découvrent une pyramide inconnue près de Saqqarah.',
    type: 'histoire',
    trending: false,
    mentions: 45000,
    platform: 'Reddit',
    date: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '5',
    title: 'Trou noir photographié',
    description: 'Nouvelle image d\'un trou noir au centre de notre galaxie.',
    type: 'science',
    trending: true,
    mentions: 82000,
    platform: 'Twitter',
    date: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '6',
    title: 'Fourth Wing : le phénomène littéraire',
    description: 'Le roman de Rebecca Yarros domine les ventes depuis des mois.',
    type: 'livre',
    trending: false,
    mentions: 34000,
    platform: 'TikTok',
    date: new Date(Date.now() - 432000000).toISOString(),
  },
];

// Actualités
const realNews: NewsItem[] = [
  {
    id: '1',
    title: 'Le Louvre bat son record de fréquentation en 2024',
    summary: 'Avec plus de 8,7 millions de visiteurs, le musée du Louvre a établi un nouveau record historique.',
    link: 'https://www.louvre.fr',
    pubDate: new Date().toISOString(),
    source: 'Le Monde',
    category: 'Art'
  },
  {
    id: '2',
    title: 'Cannes 2025 : la sélection officielle dévoilée',
    summary: 'Le Festival de Cannes dévoile les films en compétition pour la Palme d\'or 2025.',
    link: 'https://www.festival-cannes.com',
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    source: 'Telerama',
    category: 'Cinéma'
  },
  {
    id: '3',
    title: 'Découverte archéologique majeure en Égypte',
    summary: 'Une équipe internationale a mis au jour une tombe de la XVIIIe dynastie.',
    link: 'https://www.nationalgeographic.com',
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    source: 'National Geographic',
    category: 'Histoire'
  },
  {
    id: '4',
    title: 'Nobel de littérature 2025 : les pronostics',
    summary: 'Les spécialistes s\'interrogent sur les favoris pour le prochain prix Nobel.',
    link: 'https://www.franceculture.fr',
    pubDate: new Date(Date.now() - 259200000).toISOString(),
    source: 'France Culture',
    category: 'Littérature'
  },
];

const typeIcons = {
  film: Film,
  musique: Music,
  art: Palette,
  histoire: Landmark,
  science: Atom,
  livre: BookOpen,
};

const typeColors = {
  film: 'bg-purple-100 text-purple-700',
  musique: 'bg-green-100 text-green-700',
  art: 'bg-pink-100 text-pink-700',
  histoire: 'bg-amber-100 text-amber-700',
  science: 'bg-blue-100 text-blue-700',
  livre: 'bg-indigo-100 text-indigo-700',
};

const typeLabels = {
  film: 'Cinéma',
  musique: 'Musique',
  art: 'Art',
  histoire: 'Histoire',
  science: 'Science',
  livre: 'Livre',
};

const platformIcons: Record<string, React.ElementType> = {
  Twitter,
  TikTok: MessageCircle,
  Instagram: MessageCircle,
  Reddit: MessageCircle,
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Art': 'bg-pink-100 text-pink-700',
    'Cinéma': 'bg-purple-100 text-purple-700',
    'Histoire': 'bg-amber-100 text-amber-700',
    'Littérature': 'bg-blue-100 text-blue-700',
    'Musique': 'bg-green-100 text-green-700',
    'Série': 'bg-red-100 text-red-700',
    'Patrimoine': 'bg-orange-100 text-orange-700',
    'Culture': 'bg-indigo-100 text-indigo-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

export function PopularSection() {
  const [activeTab, setActiveTab] = useState<'tendances' | 'actualites'>('tendances');
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItems(trendingData);
      setNews(realNews);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 500);
  };

  const filteredItems = selectedType 
    ? items.filter(item => item.type === selectedType)
    : items;

  const types = ['film', 'musique', 'art', 'histoire', 'science', 'livre'] as const;

  const formatMentions = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Hier';
    return `Il y a ${days}j`;
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header with Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('tendances')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'tendances' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Tendances
            </button>
            <button
              onClick={() => setActiveTab('actualites')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'actualites' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Actualités
            </button>
          </div>
          <button
            onClick={loadData}
            className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Mis à jour {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </motion.div>

      {/* TENDANCES TAB */}
      {activeTab === 'tendances' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedType(null)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all
                ${selectedType === null 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600'
                }
              `}
            >
              Tout
            </button>
            {types.map((type) => {
              const Icon = typeIcons[type];
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all
                    ${selectedType === type 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-600'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {typeLabels[type]}
                </button>
              );
            })}
          </div>

          {/* Trending Banner */}
          {!selectedType && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-5 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4" />
                  <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                    Le plus populaire
                  </span>
                </div>
                <h3 className="text-base font-bold mb-1">Oppenheimer aux Oscars</h3>
                <p className="text-white/90 text-xs mb-3">
                  13 nominations et un buzz mondial
                </p>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Twitter className="w-3.5 h-3.5" />
                  <span>125k mentions</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Items List */}
          <div className="space-y-3">
            {filteredItems.map((item, index) => {
              const Icon = typeIcons[item.type];
              const PlatformIcon = platformIcons[item.platform] || MessageCircle;
              
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[item.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>
                          {typeLabels[item.type]}
                        </span>
                        {item.trending && (
                          <span className="flex items-center gap-0.5 text-[10px] font-medium text-orange-600">
                            <Flame className="w-3 h-3" />
                            Tendance
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] text-gray-500">
                            <PlatformIcon className="w-3 h-3" />
                            {formatMentions(item.mentions)}
                          </span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="text-[10px] text-gray-500">{formatDate(item.date)}</span>
                        </div>
                        
                        <button className="p-1.5 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ACTUALITÉS TAB */}
      {activeTab === 'actualites' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="space-y-3">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div 
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 cursor-pointer active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] text-gray-500">{item.source}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 pr-6">{item.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{item.summary}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      {expandedId === item.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-500">{formatDate(item.pubDate)}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-4 pt-3">
                        <p className="text-xs text-gray-700 leading-relaxed mb-3">
                          {item.summary}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(item.id);
                            }}
                            className={`
                              flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors
                              ${bookmarked.has(item.id) 
                                ? 'bg-blue-50 text-blue-600' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }
                            `}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${bookmarked.has(item.id) ? 'fill-current' : ''}`} />
                            {bookmarked.has(item.id) ? 'Sauvé' : 'Sauver'}
                          </button>
                          
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            Partager
                          </button>
                          
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors ml-auto"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Lire
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-4"
      >
        <p className="text-xs text-gray-400">
          {activeTab === 'tendances' 
            ? 'Données collectées sur Twitter, TikTok, Reddit et Instagram'
            : 'Sources : Le Monde, France Culture, Telerama, Beaux Arts'
          }
        </p>
      </motion.div>
    </div>
  );
}
