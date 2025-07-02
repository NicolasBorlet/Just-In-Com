// Utilitaires pour les optimisations de performance

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const PERFORMANCE_CONFIG = {
  // Cache configuration
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

  // Image optimization
  IMAGE_QUALITY: 75,
  IMAGE_SIZES: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
  },

  // Video optimization
  VIDEO_PRELOAD: 'metadata',

  // Font optimization
  FONT_DISPLAY: 'swap',
  FONT_PRELOAD: true,
} as const;

// Fonction pour optimiser les URLs d'images
export function optimizeImageUrl(url: string, width: number, quality: number = PERFORMANCE_CONFIG.IMAGE_QUALITY): string {
  if (!url) return url;

  // Si c'est déjà une URL optimisée, la retourner
  if (url.includes('_next/image')) return url;

  // Ajouter des paramètres d'optimisation si c'est une URL Strapi
  if (url.includes('hstgr.cloud')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&q=${quality}&f=webp`;
  }

  return url;
}

// Fonction pour précharger les ressources critiques
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Précharger les polices critiques
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Italiana&display=swap',
  ];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Fonction pour optimiser le chargement des vidéos
export function optimizeVideoLoading(videoElement: HTMLVideoElement) {
  if (!videoElement) return;

  videoElement.preload = PERFORMANCE_CONFIG.VIDEO_PRELOAD as any;
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('muted', '');
  videoElement.setAttribute('loop', '');

  // Optimiser pour les appareils mobiles
  if ('connection' in navigator && (navigator as any).connection.effectiveType === 'slow-2g') {
    videoElement.preload = 'none';
  }
}

// Fonction pour mesurer les performances
export function measurePerformance(metric: string, value: number) {
  if (typeof window === 'undefined') return;

  // Envoyer les métriques à Analytics ou les logger
  console.log(`Performance Metric - ${metric}:`, value);

  // Vous pouvez également envoyer ces métriques à votre service d'analytics
  if (window.gtag) {
    window.gtag('event', 'performance', {
      metric_name: metric,
      value: value,
    });
  }
}
