import { useState } from 'react';
import { Header } from './components/Header';
import { TranslationModes } from './components/TranslationModes';
import { LanguageSelector } from './components/LanguageSelector';
import { TextTranslator } from './components/TextTranslator';
import { VoiceTranslator } from './components/VoiceTranslator';
import { DocumentTranslator } from './components/DocumentTranslator';
import { StatsSection } from './components/StatsSection';
import { languages } from './data/languages';
import { ArrowLeftRight } from 'lucide-react';

function App() {
  const [activeMode, setActiveMode] = useState('text');
  const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
  const [targetLanguage, setTargetLanguage] = useState(languages[1]);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Breaking Language Barriers with{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              AI
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience seamless translation across 22+ Indian languages. Powered by the National
            Language Translation Mission.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
          <div className="flex justify-center mb-6">
            <TranslationModes activeMode={activeMode} onModeChange={setActiveMode} />
          </div>

          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end mb-8">
            <LanguageSelector
              label="Source Language"
              selectedLanguage={sourceLanguage}
              languages={languages}
              onLanguageChange={setSourceLanguage}
            />

            <button
              onClick={handleSwapLanguages}
              className="mb-1 p-3 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-all"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>

            <LanguageSelector
              label="Target Language"
              selectedLanguage={targetLanguage}
              languages={languages}
              onLanguageChange={setTargetLanguage}
            />
          </div>

          {activeMode === 'text' && (
            <TextTranslator sourceLanguage={sourceLanguage} targetLanguage={targetLanguage} />
          )}
          {activeMode === 'voice' && (
            <VoiceTranslator sourceLanguage={sourceLanguage} targetLanguage={targetLanguage} />
          )}
          {activeMode === 'document' && (
            <DocumentTranslator sourceLanguage={sourceLanguage} targetLanguage={targetLanguage} />
          )}
        </div>

        <StatsSection />

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Empowering Digital India</h3>
          <p className="text-orange-50 mb-6 max-w-2xl mx-auto">
            Join millions of users accessing the internet in their native language. Bhashini is
            making digital services accessible to everyone, everywhere.
          </p>
          <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl">
            Learn More About Bhashini
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 Digital India Bhashini. A National Language Translation Mission initiative.</p>
            <p className="mt-2">Ministry of Electronics & Information Technology, Government of India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;