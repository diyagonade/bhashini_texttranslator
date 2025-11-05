import { ChevronDown } from 'lucide-react';

export function LanguageSelector({
  label,
  selectedLanguage,
  languages,
  onLanguageChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={selectedLanguage.code}
          onChange={(e) => {
            const lang = languages.find((l) => l.code === e.target.value);
            if (lang) onLanguageChange(lang);
          }}
          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer transition-all"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name} ({lang.nativeName})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}