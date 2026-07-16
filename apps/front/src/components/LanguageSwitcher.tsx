'use client';

import { usePathname } from 'next/navigation';
import { getPathWithLocale } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const pathname = usePathname();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath = getPathWithLocale(pathname, newLocale);
    window.location.href = newPath;
  };

  const currentLanguage = pathname.split('/')[1] || 'fr';

  return (
    <div className="language-switcher">
      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="bg-transparent border-none focus:outline-none cursor-pointer text-sm"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
