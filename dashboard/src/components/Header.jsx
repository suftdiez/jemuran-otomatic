import { Wifi, WifiOff, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header = ({ isConnected }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      {/* Left - Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Jemuran Otomatis
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          IoT Monitoring Dashboard
        </p>
      </div>

      {/* Right - Status & Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Connection Status */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-theme ${
          isConnected 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-emerald-500 animate-pulse-dot' : 'bg-red-500'
          }`} />
          <span>{isConnected ? 'Online' : 'Offline'}</span>
          {isConnected ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
