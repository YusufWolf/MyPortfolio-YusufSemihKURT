import { useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import trTranslations from '../locales/tr.json';

type Language = 'en' | 'tr';

const translations: Record<Language, any> = {
  en: enTranslations,
  tr: trTranslations,
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('language') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value !== undefined ? value : key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  return { language, t, toggleLanguage, setLanguage };
}

