import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ExternalLink, ChevronDown, ChevronUp, Bookmark, Share2, RefreshCw } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
}

// Actualités culturelles

// Actualités réelles (simulées pour l'exemple, en production on utiliserait une API)
const realNews: NewsItem[] = [
  {
    id: '1',
    title: 'Le Louvre bat son record de fréquentation en 2024',
    summary: 'Avec plus de 8,7 millions de visiteurs, le musée du Louvre a établi un nouveau record historique, dépassant son précédent record de 2018.',
    link: 'https://www.louvre.fr',
    pubDate: new Date().toISOString(),
    source: 'Le Monde',
    category: 'Art'
  },
  {
    id: '2',
    title: 'Cannes 2025 : la sélection officielle dévoilée',
    summary: 'Le Festival de Cannes dévoile les films en compétition pour la Palme d\'or 2025, avec une forte présence du cinéma européen.',
    link: 'https://www.festival-cannes.com',
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    source: 'Telerama',
    category: 'Cinéma'
  },
  {
    id: '3',
    title: 'Découverte archéologique majeure en Égypte',
    summary: 'Une équipe internationale a mis au jour une tombe de la XVIIIe dynastie contenant des artefacts inestimables près de Louxor.',
    link: 'https://www.nationalgeographic.com',
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    source: 'National Geographic',
    category: 'Histoire'
  },
  {
    id: '4',
    title: 'Nobel de littérature 2025 : les pronostics',
    summary: 'Les spécialistes s\'interrogent sur les favoris pour le prochain prix Nobel, avec une tendance vers les voix non occidentales.',
    link: 'https://www.franceculture.fr',
    pubDate: new Date(Date.now() - 259200000).toISOString(),
    source: 'France Culture',
    category: 'Littérature'
  },
  {
    id: '5',
    title: 'Nouveau record pour le marché de l\'art contemporain',
    summary: 'Les ventes aux enchères atteignent des sommets avec une œuvre de Basquiat vendue plus de 85 millions de dollars.',
    link: 'https://www.beauxarts.com',
    pubDate: new Date(Date.now() - 345600000).toISOString(),
    source: 'Beaux Arts',
    category: 'Art'
  },
  {
    id: '6',
    title: 'Netflix annonce une série sur la vie de Marie Curie',
    summary: 'La plateforme de streaming prépare une série biographique ambitieuse sur la célèbre scientifique, avec une actrice française.',
    link: 'https://www.netflix.com',
    pubDate: new Date(Date.now() - 432000000).toISOString(),
    source: 'Les Inrocks',
    category: 'Série'
  },
  {
    id: '7',
    title: 'Restauration de Notre-Dame : les dernières avancées',
    summary: 'Les travaux de restauration de la cathédrale Notre-Dame progressent avec la réinstallation des vitraux et des sculptures.',
    link: 'https://www.notredamedeparis.fr',
    pubDate: new Date(Date.now() - 518400000).toISOString(),
    source: 'Le Monde',
    category: 'Patrimoine'
  },
  {
    id: '8',
    title: 'Le retour du vinyle : une tendance qui s\'accélère',
    summary: 'Les ventes de disques vinyles dépassent à nouveau celles des CD, signe d\'une appétence croissante pour le physique.',
    link: 'https://www.lesinrocks.com',
    pubDate: new Date(Date.now() - 604800000).toISOString(),
    source: 'Les Inrocks',
    category: 'Musique'
  },
];

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setIsLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      setNews(realNews);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 500);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Actualités</h2>
            <p className="text-xs text-gray-500">
              Mis à jour {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button
            onClick={loadNews}
            className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* News List */}
      <div className="space-y-3">
        {news.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {/* News Header */}
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

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="border-t border-gray-100"
                >
                  <div className="p-4 pt-3">
                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                      {item.summary}
                    </p>
                    
                    {/* Actions */}
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

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-4"
      >
        <p className="text-xs text-gray-400">
          Sources : Le Monde, France Culture, Telerama, Beaux Arts
        </p>
      </motion.div>
    </div>
  );
}
