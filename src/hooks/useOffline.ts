import { useState, useEffect, useCallback } from 'react';

interface OfflineState {
  isOnline: boolean;
  isInstalled: boolean;
  canInstall: boolean;
  install: () => Promise<void>;
}

export function useOffline(): OfflineState {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Gérer les changements de connexion
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Gérer l'installation
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Gérer l'installation complétée
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Enregistrer le service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker enregistré:', registration);
        })
        .catch((error) => {
          console.log('Erreur Service Worker:', error);
        });
    }
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  return {
    isOnline,
    isInstalled,
    canInstall: !!deferredPrompt && !isInstalled,
    install,
  };
}

// Fonction pour télécharger du contenu pour le mode hors-ligne
export function downloadContentForOffline(contentId: string, content: unknown): void {
  const offlineContent = JSON.parse(localStorage.getItem('offlineContent') || '{}');
  offlineContent[contentId] = {
    data: content,
    downloadedAt: new Date().toISOString(),
  };
  localStorage.setItem('offlineContent', JSON.stringify(offlineContent));
}

// Fonction pour récupérer du contenu hors-ligne
export function getOfflineContent(contentId: string): unknown | null {
  const offlineContent = JSON.parse(localStorage.getItem('offlineContent') || '{}');
  return offlineContent[contentId]?.data || null;
}

// Fonction pour vérifier si du contenu est disponible hors-ligne
export function isContentAvailableOffline(contentId: string): boolean {
  const offlineContent = JSON.parse(localStorage.getItem('offlineContent') || '{}');
  return !!offlineContent[contentId];
}

// Télécharger tout le contenu pour le mode hors-ligne
export function downloadAllContent(): void {
  // Quiz
  const dailyQuiz = localStorage.getItem('dailyQuizState');
  if (dailyQuiz) {
    downloadContentForOffline('dailyQuiz', JSON.parse(dailyQuiz));
  }

  // Mythologie
  const dailyMythology = localStorage.getItem('dailyMythology');
  if (dailyMythology) {
    downloadContentForOffline('dailyMythology', JSON.parse(dailyMythology));
  }

  // Works
  const viewedWorks = localStorage.getItem('viewedWorks');
  if (viewedWorks) {
    downloadContentForOffline('viewedWorks', JSON.parse(viewedWorks));
  }

  // User stats
  const userStats = localStorage.getItem('userStats');
  if (userStats) {
    downloadContentForOffline('userStats', JSON.parse(userStats));
  }

  // Marquer comme téléchargé
  localStorage.setItem('contentDownloaded', 'true');
  localStorage.setItem('contentDownloadedAt', new Date().toISOString());
}

// Vérifier si le contenu a été téléchargé
export function isAllContentDownloaded(): boolean {
  return localStorage.getItem('contentDownloaded') === 'true';
}
