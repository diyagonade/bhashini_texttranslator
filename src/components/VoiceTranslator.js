import { useState, useRef } from 'react';
import { Mic, Square, Volume2, Loader2 } from 'lucide-react';

export function VoiceTranslator({ sourceLanguage, targetLanguage }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  const handleStartRecording = () => {
    setError('');
    
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    // Create new recognition instance
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = getLanguageCode(sourceLanguage.code);
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setTranscript('');
      setTranslation('');
    };

    recognitionRef.current.onresult = async (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsRecording(false);
      setIsProcessing(true);

      // Translate the recognized speech
      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(speechResult)}&langpair=${sourceLanguage.code}|${targetLanguage.code}`
        );
        
        const data = await response.json();
        
        if (data.responseStatus === 200) {
          const translatedText = data.responseData.translatedText;
          setTranslation(translatedText);
          
          // Automatically speak the translation
          speakText(translatedText, targetLanguage.code);
        } else {
          setError('Translation failed. Please try again.');
        }
      } catch (err) {
        setError('Translation service unavailable.');
        console.error('Translation error:', err);
      } finally {
        setIsProcessing(false);
      }
    };

    recognitionRef.current.onerror = (event) => {
      setIsRecording(false);
      setIsProcessing(false);
      setError(`Error: ${event.error}. Please try again.`);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    // Start recording
    recognitionRef.current.start();
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const speakText = (text, langCode) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(langCode);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayTranslation = () => {
    if (translation) {
      speakText(translation, targetLanguage.code);
    }
  };

  // Map language codes to speech recognition/synthesis codes
  const getLanguageCode = (code) => {
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
    return langMap[code] || code;
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Voice Translation</h3>
            <p className="text-sm text-gray-600">
              Speak in {sourceLanguage.name} and get instant translation in {targetLanguage.name}
            </p>
          </div>

          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isProcessing}
            className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all shadow-lg ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : isRecording ? (
              <Square className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>

          <div className="text-center">
            {isRecording && (
              <div className="flex items-center gap-2 text-red-600 font-medium">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Listening...
              </div>
            )}
            {isProcessing && (
              <div className="text-gray-600 font-medium">Processing and translating...</div>
            )}
            {!isRecording && !isProcessing && (
              <div className="text-gray-500 text-sm">
                {transcript ? 'Click to record again' : 'Click the microphone to start speaking'}
              </div>
            )}
          </div>
        </div>
      </div>

      {(transcript || translation) && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Recognized Speech</span>
              <span className="text-xs text-gray-500">{sourceLanguage.name}</span>
            </div>
            <p className="text-gray-900">{transcript}</p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Translation</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{targetLanguage.name}</span>
                <button
                  onClick={handlePlayTranslation}
                  className="p-1 text-orange-600 hover:text-orange-700 transition-colors"
                  disabled={!translation}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-900">{translation}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Volume2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Voice Translation Features</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Real-time speech recognition in multiple languages</li>
              <li>Instant translation with audio output</li>
              <li>Works best in Chrome, Edge, or Safari browsers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}