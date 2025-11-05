import { Type, Mic, FileText } from 'lucide-react';

export function TranslationModes({ activeMode, onModeChange }) {
  const modes = [
    { id: 'text', label: 'Text', icon: Type },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'document', label: 'Document', icon: FileText },
  ];

  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      {modes.map((mode) => {
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeMode === mode.id
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}