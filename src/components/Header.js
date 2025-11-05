import { Languages } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
              <Languages className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bhashini</h1>
              <p className="text-xs text-gray-500">National Language Translation Mission</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">API</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
}