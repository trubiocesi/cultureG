import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, Sparkles, Target, Zap, Trophy, Calendar, Flame, Star, ArrowLeft } from 'lucide-react';
import { 
  getDailyQuestions, 
  completeDailyQuiz, 
  isDailyQuizCompleted, 
  getTodayScore,
  quizCategories,
  type QuizCategory 
} from '@/data/quizData';
import type { QuizQuestion } from '@/types';

const categoryOrder: QuizCategory[] = ['actu', 'media', 'general', 'histoire'];

interface QuizHistory {
  date: string;
  completed: boolean;
  score: number;
  answers: number[];
  questions: QuizQuestion[];
}

interface QuizSectionProps {
  onStatsUpdate?: (stats: Partial<{ xp: number; level: number; dailyQuizzesCompleted: number }>) => void;
}

export function QuizSection({ onStatsUpdate }: QuizSectionProps) {
  const [view, setView] = useState<'daily' | 'calendar'>('daily');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [todayScore, setTodayScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    loadDailyQuiz();
    loadQuizHistory();
  }, []);

  const loadDailyQuiz = () => {
    const dailyQs = getDailyQuestions();
    setQuestions(dailyQs);
    setIsCompleted(isDailyQuizCompleted());
    setTodayScore(getTodayScore());
  };

  const loadQuizHistory = () => {
    const history: QuizHistory[] = [];
    // Charger l'historique depuis localStorage
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const saved = localStorage.getItem(`quiz_${dateStr}`);
      if (saved) {
        history.push(JSON.parse(saved));
      }
    }
    setQuizHistory(history);
  };

  const saveQuizResult = (finalScore: number, finalAnswers: number[]) => {
    const today = new Date().toISOString().split('T')[0];
    const result: QuizHistory = {
      date: today,
      completed: true,
      score: finalScore,
      answers: finalAnswers,
      questions: questions,
    };
    localStorage.setItem(`quiz_${today}`, JSON.stringify(result));
    loadQuizHistory();
  };

  const currentQuestion = questions[currentIndex];
  const currentCategory = currentQuestion?.category as QuizCategory;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    } else {
      // Quiz terminé
      const finalAnswers = [...answers, selectedAnswer!];
      const finalScore = finalAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index]?.correctAnswer ? 1 : 0);
      }, 0);
      
      completeDailyQuiz(finalScore, finalAnswers);
      saveQuizResult(finalScore, finalAnswers);
      setShowCelebration(true);
      setIsCompleted(true);
      setTodayScore(finalScore);
      
      // Mettre à jour les stats
      if (onStatsUpdate) {
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        onStatsUpdate({
          xp: userStats.xp,
          level: userStats.level,
          dailyQuizzesCompleted: userStats.dailyQuizzesCompleted,
        });
      }
    }
  };

  const handleDateClick = (dateStr: string) => {
    const saved = localStorage.getItem(`quiz_${dateStr}`);
    if (saved) {
      setSelectedDate(dateStr);
    }
  };

  const handleRetakeQuiz = (dateStr: string) => {
    const saved = localStorage.getItem(`quiz_${dateStr}`);
    if (saved) {
      const historyItem: QuizHistory = JSON.parse(saved);
      setQuestions(historyItem.questions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setShowExplanation(false);
      setShowCelebration(false);
      setAnswers([]);
      setSelectedDate(null);
      setView('daily');
      setIsCompleted(false);
    }
  };

  const getCategoryLabel = (cat: string) => {
    return quizCategories[cat as QuizCategory]?.label || cat;
  };

  const getCategoryColor = (cat: string) => {
    return quizCategories[cat as QuizCategory]?.color || 'text-gray-700';
  };

  const getCategoryBgColor = (cat: string) => {
    return quizCategories[cat as QuizCategory]?.bgColor || 'bg-gray-100';
  };

  const getCategoryIcon = (cat: string) => {
    return quizCategories[cat as QuizCategory]?.icon || '📚';
  };

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Premier jour du mois
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();
    
    // Nombre de jours dans le mois
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Jours vides avant le début du mois
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = i === today.getDate();
      const historyItem = quizHistory.find(h => h.date === dateStr);
      
      days.push({
        day: i,
        dateStr,
        isToday,
        completed: historyItem?.completed || false,
        score: historyItem?.score,
      });
    }
    
    return days;
  };

  // VUE DÉTAIL D'UN QUIZ PASSÉ
  if (selectedDate) {
    const saved = localStorage.getItem(`quiz_${selectedDate}`);
    if (saved) {
      const historyItem: QuizHistory = JSON.parse(saved);
      const isToday = selectedDate === new Date().toISOString().split('T')[0];
      
      return (
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <button
              onClick={() => setSelectedDate(null)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au calendrier
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-6 text-center ${
              historyItem.score === 4
                ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500'
                : historyItem.score >= 2
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
                : 'bg-gradient-to-br from-gray-500 to-gray-700'
            }`}
          >
            <div className="text-5xl mb-3">{historyItem.score === 4 ? '🏆' : historyItem.score >= 2 ? '🎉' : '👍'}</div>
            <h2 className="text-xl font-bold text-white mb-1">
              {historyItem.score === 4 ? 'Parfait !' : historyItem.score >= 2 ? 'Bravo !' : 'Continue !'}
            </h2>
            <p className="text-white/80 text-sm mb-4">
              Quiz du {new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-white/80 text-xs mb-1">Score</p>
              <p className="text-4xl font-bold text-white">{historyItem.score}/4</p>
              <div className="flex justify-center gap-1.5 mt-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < historyItem.score ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Récapitulatif</h3>
            <div className="space-y-2">
              {historyItem.questions.map((q, i) => {
                const userAnswer = historyItem.answers[i];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div key={q.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-lg">{getCategoryIcon(q.category)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{q.question}</p>
                      <p className="text-[10px] text-gray-500">{getCategoryLabel(q.category)}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {!isToday && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleRetakeQuiz(selectedDate)}
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Refaire ce quiz
            </motion.button>
          )}
        </div>
      );
    }
  }

  // VUE CALENDRIER
  if (view === 'calendar') {
    const calendarDays = generateCalendarDays();
    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setView('daily')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au quiz
            </button>
            <h2 className="font-semibold text-gray-900 text-sm">
              {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, i) => (
              <div key={i} className="text-center text-xs text-gray-400 font-medium py-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (!day) {
                return <div key={i} className="aspect-square" />;
              }
              
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => day.completed && handleDateClick(day.dateStr)}
                  disabled={!day.completed}
                  className={`
                    aspect-square rounded-xl flex flex-col items-center justify-center relative
                    ${day.isToday 
                      ? 'ring-2 ring-blue-500 ring-offset-1' 
                      : ''
                    }
                    ${day.completed
                      ? day.score === 4
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                        : day.score && day.score >= 2
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                        : 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
                      : day.isToday
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  <span className="text-sm font-medium">{day.day}</span>
                  {day.completed && (
                    <span className="text-[8px]">{day.score}/4</span>
                  )}
                  {day.isToday && !day.completed && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Légende */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Légende</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-400 to-orange-500" />
              <span className="text-xs text-gray-600">Score parfait (4/4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-purple-500" />
              <span className="text-xs text-gray-600">Bon score (2-3/4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-400 to-gray-600" />
              <span className="text-xs text-gray-600">Score à améliorer (0-1/4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100" />
              <span className="text-xs text-gray-600">Aujourd'hui</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Écran de félicitations
  if (showCelebration) {
    const finalAnswers = [...answers, selectedAnswer!];
    const finalScore = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
    const isPerfect = finalScore === 4;
    const xpGained = finalScore * 10 + (isPerfect ? 50 : 0);
    
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-6 text-center ${
            isPerfect 
              ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500' 
              : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-4"
          >
            <div className="text-5xl">{isPerfect ? '🏆' : '🎉'}</div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-1"
          >
            {isPerfect ? 'Parfait !' : 'Bravo !'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 text-sm mb-4"
          >
            Quiz du jour terminé
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4"
          >
            <p className="text-white/80 text-xs mb-1">Ton score</p>
            <p className="text-4xl font-bold text-white">{finalScore}/4</p>
            <div className="flex justify-center gap-1.5 mt-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < finalScore ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-white/90 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            +{xpGained} XP gagnés
          </motion.div>
          
          {isPerfect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-3 bg-yellow-300/30 rounded-xl p-3"
            >
              <p className="text-yellow-100 text-xs font-medium flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                Score parfait ! +50 XP bonus
              </p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Récapitulatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Récapitulatif</h3>
          <div className="space-y-2">
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                  <span className="text-lg">{getCategoryIcon(q.category)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{q.question}</p>
                    <p className="text-[10px] text-gray-500">{getCategoryLabel(q.category)}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setView('calendar')}
          className="w-full py-3 px-4 bg-white text-gray-700 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-gray-200"
        >
          <Calendar className="w-4 h-4" />
          Voir le calendrier
        </motion.button>
      </div>
    );
  }

  // Écran si déjà complété aujourd'hui
  if (isCompleted && !showCelebration) {
    return (
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold">Quiz complété !</h2>
              <p className="text-white/80 text-sm">Tu as déjà fait ton quiz aujourd'hui</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-white/80 text-xs">Score d'aujourd'hui</p>
            <p className="text-2xl font-bold">{todayScore}/4</p>
          </div>
        </motion.div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-gray-500">Score</span>
            </div>
            <p className="text-xl font-semibold text-gray-900">{todayScore}/4</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-500">Série</span>
            </div>
            <p className="text-xl font-semibold text-gray-900">7j</p>
          </motion.div>
        </div>
        
        {/* Calendar Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setView('calendar')}
          className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Voir le calendrier
        </motion.button>
      </div>
    );
  }

  if (questions.length === 0) {
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Quiz du jour</h2>
          <button
            onClick={() => setView('calendar')}
            className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Calendar className="w-4 h-4" />
          </button>
        </div>
        
        {/* Indicateurs de catégories */}
        <div className="flex gap-1.5">
          {categoryOrder.map((cat, i) => {
            const isActive = currentCategory === cat;
            const isPast = categoryOrder.indexOf(currentCategory) > i;
            
            return (
              <div
                key={cat}
                className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-gray-900' 
                    : isPast 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                }`}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between mt-2">
          {categoryOrder.map((cat) => {
            const isActive = currentCategory === cat;
            const isPast = categoryOrder.indexOf(currentCategory) > categoryOrder.indexOf(cat);
            
            return (
              <span
                key={cat}
                className={`text-xs transition-colors ${
                  isActive ? 'font-medium text-gray-900' : isPast ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {getCategoryIcon(cat)}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-xl p-3 shadow-sm"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] text-gray-500">Score</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{score}/{currentIndex + (showResult ? 1 : 0)}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-3 shadow-sm"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[10px] text-gray-500">Question</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{currentIndex + 1}/4</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-xl p-3 shadow-sm"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-[10px] text-gray-500">Catégorie</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{getCategoryIcon(currentCategory)}</p>
        </motion.div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          {/* Question Header */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryBgColor(currentCategory)} ${getCategoryColor(currentCategory)}`}>
              {getCategoryIcon(currentCategory)} {getCategoryLabel(currentCategory)}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {currentQuestion.difficulty === 'facile' ? '⭐' : currentQuestion.difficulty === 'moyen' ? '⭐⭐' : '⭐⭐⭐'}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-base font-semibold text-gray-900 mb-5">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    w-full p-3.5 rounded-xl border-2 text-left transition-all duration-200
                    ${showResult 
                      ? isCorrectAnswer 
                        ? 'border-green-500 bg-green-50' 
                        : isSelected 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-100 bg-gray-50 opacity-50'
                      : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      showResult 
                        ? isCorrectAnswer 
                          ? 'text-green-700' 
                          : isSelected 
                            ? 'text-red-700' 
                            : 'text-gray-500'
                        : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                    {showResult && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      >
                        {isCorrectAnswer ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : isSelected ? (
                          <X className="w-4 h-4 text-red-500" />
                        ) : null}
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-blue-50 rounded-xl"
              >
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Explication : </span>
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <button
                onClick={handleNext}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-sm"
              >
                {currentIndex < questions.length - 1 ? (
                  <>
                    Question suivante
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Voir mon score
                    <Trophy className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
