import { useState } from 'react';
import { ArrowRight, Copy, Volume2, X } from 'lucide-react';

export function TextTranslator({ sourceLanguage, targetLanguage }) {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    setError('');

    try {
      // Using MyMemory Translation API (Free, no API key needed)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLanguage.code}|${targetLanguage.code}`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setError('Translation failed. Please try again.');
        setTranslatedText('');
      }
    } catch (err) {
      setError('Translation service unavailable. Please check your internet connection.');
      setTranslatedText('');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Show a toast notification
    alert('Copied to clipboard!');
  };

  const handleSpeak = (text, langCode) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map language codes to speech synthesis codes
      const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'bn': 'bn-IN',
        'te': 'te-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN',
        'gu': 'gu-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN',
        'pa': 'pa-IN',
        'or': 'or-IN',
        'as': 'as-IN',
      };
      
      utterance.lang = langMap[langCode] || langCode;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm font-medium">{error}</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Source Text</span>
            {sourceText && (
              <button
                onClick={() => {
                  setSourceText('');
                  setTranslatedText('');
                  setError('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={`Enter text in ${sourceLanguage.name}...`}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={() => handleSpeak(sourceText, sourceLanguage.code)}
              disabled={!sourceText}
              className="p-2 text-gray-400 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Listen to source text"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Translated Text</span>
            {translatedText && (
              <button
                onClick={() => handleCopy(translatedText)}
                className="text-gray-400 hover:text-orange-600 transition-colors"
                title="Copy translation"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="w-full h-48 p-4 bg-gray-50 border border-gray-300 rounded-lg overflow-y-auto">
            {isTranslating ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                  <p className="text-sm text-gray-600">Translating...</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">
                {translatedText || `Translation will appear here in ${targetLanguage.name}...`}
              </p>
            )}
          </div>
          {translatedText && (
            <div className="absolute bottom-3 right-3">
              <button
                onClick={() => handleSpeak(translatedText, targetLanguage.code)}
                className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                title="Listen to translation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isTranslating}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isTranslating ? 'Translating...' : 'Translate'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}