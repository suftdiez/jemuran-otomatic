import { useState, useEffect } from 'react';
import { 
  Sun, Moon, Wifi, CloudRain, Home, Thermometer, 
  Droplets, Lightbulb, RotateCcw, Loader2, Check, 
  AlertCircle, Shirt
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import useJemuranData from './hooks/useJemuranData';
import { db, ref, set } from './firebase';

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = ({ isConnected }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-slate-100">
          Jemuran Otomatis
        </h1>
      </div>

      {/* Right: Theme Toggle + Live Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
          isConnected 
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse-live' : 'bg-red-500'}`} />
          {isConnected ? 'Live' : 'Offline'}
          <Wifi className="w-3.5 h-3.5" />
        </div>
      </div>
    </nav>
  );
};

// ============================================
// STATUS BANNER (HERO SECTION)
// ============================================
const StatusBanner = ({ posisi, status_hujan }) => {
  const isRaining = status_hujan === 'Hujan';
  const isOutside = posisi === 'Di Luar';

  const getStatus = () => {
    if (isRaining) {
      return {
        gradient: 'from-red-500 to-rose-600',
        icon: CloudRain,
        title: 'Hujan Terdeteksi!',
        subtitle: 'Servo menutup atap - Jemuran diamankan'
      };
    }
    if (isOutside) {
      return {
        gradient: 'from-emerald-400 to-teal-500',
        icon: Sun,
        title: 'Cuaca Cerah',
        subtitle: 'Servo membuka atap - Menjemur dengan matahari'
      };
    }
    return {
      gradient: 'from-blue-500 to-indigo-600',
      icon: Home,
      title: 'Mode Standby',
      subtitle: 'Servo menutup atap - Jemuran tersimpan di dalam'
    };
  };

  const status = getStatus();
  const Icon = status.icon;

  return (
    <div className={`w-full p-5 bg-gradient-to-r ${status.gradient} mb-6`}>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{status.title}</h2>
          <p className="text-white/80 text-sm mt-0.5">{status.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SENSOR CARD COMPONENT
// ============================================
const SensorCard = ({ icon: Icon, title, value, unit, iconBg, iconColor }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800 dark:text-slate-100 tabular-nums">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-gray-500 dark:text-slate-400">{unit}</span>
            )}
          </div>
        </div>
        <div className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

// ============================================
// TEMPERATURE CHART
// ============================================
const TemperatureChart = ({ currentTemp }) => {
  const { isDark } = useTheme();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (currentTemp !== undefined && currentTemp !== null) {
      setHistory(prev => {
        const newHistory = [...prev, { 
          value: currentTemp, 
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }];
        if (newHistory.length > 20) newHistory.shift();
        return newHistory;
      });
    }
  }, [currentTemp]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-slate-100">Temperature Trends</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400">Real-time monitoring</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20">
          <Thermometer className="w-4 h-4 text-rose-500" />
          <span className="text-lg font-bold text-rose-600 dark:text-rose-400 tabular-nums">
            {currentTemp?.toFixed(1) ?? '--'}°C
          </span>
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history.length > 0 ? history : [{ value: currentTemp || 25, time: 'Now' }]}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e5e7eb'} vertical={false} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#6b7280' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#6b7280' }}
              width={35}
            />
            <Tooltip 
              contentStyle={{ 
                background: isDark ? '#1e293b' : '#fff', 
                border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#f43f5e" 
              strokeWidth={2} 
              fill="url(#tempGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================================
// CONTROL BUTTONS
// ============================================
const ControlButtons = () => {
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendCommand = async (perintah, mode, type) => {
    setLoading(type);
    try {
      await set(ref(db, '/jemuran/perintah'), perintah);
      await set(ref(db, '/jemuran/mode'), mode);
      setSuccess(type);
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      alert('Gagal mengirim perintah');
    } finally {
      setLoading(null);
    }
  };

  const buttons = [
    { id: 'in', label: 'Masuk', sublabel: 'Mode Manual', icon: Home, gradient: 'from-blue-500 to-blue-600', hoverGradient: 'hover:from-blue-600 hover:to-blue-700', cmd: 'MASUK', mode: 'Manual' },
    { id: 'out', label: 'Keluar', sublabel: 'Mode Manual', icon: Sun, gradient: 'from-emerald-500 to-emerald-600', hoverGradient: 'hover:from-emerald-600 hover:to-emerald-700', cmd: 'KELUAR', mode: 'Manual' },
    { id: 'auto', label: 'Auto', sublabel: 'Mode Otomatis', icon: RotateCcw, gradient: 'from-orange-500 to-amber-500', hoverGradient: 'hover:from-orange-600 hover:to-amber-600', cmd: 'AUTO', mode: 'Otomatis' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-100 mb-4 text-center">Panel Kontrol</h3>
      <div className="flex items-center justify-center gap-4">
        {buttons.map(btn => {
          const Icon = btn.icon;
          const isLoading = loading === btn.id;
          const isSuccess = success === btn.id;
          
          return (
            <button
              key={btn.id}
              onClick={() => sendCommand(btn.cmd, btn.mode, btn.id)}
              disabled={loading !== null}
              className={`group relative flex flex-col items-center justify-center w-28 h-20 rounded-xl bg-gradient-to-br ${btn.gradient} ${btn.hoverGradient} text-white shadow-lg shadow-gray-200 dark:shadow-slate-900/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 mb-1">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                 isSuccess ? <Check className="w-4 h-4" /> : 
                 <Icon className="w-4 h-4" />}
              </div>
              <span className="text-sm font-semibold">{isSuccess ? 'OK!' : btn.label}</span>
              <span className="text-[10px] text-white/70">{btn.sublabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// SKELETON LOADER
// ============================================
const SkeletonLoader = () => (
  <div className="bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
    <div className="mx-6 py-4">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg animate-shimmer" />
          <div className="w-40 h-6 rounded-lg animate-shimmer" />
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg animate-shimmer" />
          <div className="w-20 h-10 rounded-lg animate-shimmer" />
        </div>
      </div>
      <div className="h-20 rounded-xl animate-shimmer mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-xl animate-shimmer" />)}
      </div>
      <div className="h-[420px] rounded-xl animate-shimmer mb-6" />
      <div className="flex justify-center gap-4 mb-12">
        {[1,2,3].map(i => <div key={i} className="h-10 w-28 rounded-lg animate-shimmer" />)}
      </div>
    </div>
  </div>
);

// ============================================
// MAIN DASHBOARD
// ============================================
const Dashboard = () => {
  const { data, loading, error, isConnected } = useJemuranData();

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg max-w-sm border border-gray-100 dark:border-slate-800">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2">Koneksi Error</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error}</p>
          <button onClick={() => location.reload()} className="h-10 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      
      {/* ===== HEADER (Full Width - Buttons at Far Right) ===== */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="pl-8 pr-12 py-3">
          <Navbar isConnected={isConnected} />
        </div>
      </header>

      {/* ===== MAIN CONTENT (Full Width + Fill Height) ===== */}
      <main className="flex-1 px-12 py-4 bg-white dark:bg-slate-900">
          {/* Status Banner */}
          <StatusBanner 
            posisi={data?.posisi || 'Di Dalam'} 
            status_hujan={data?.status_hujan || 'Kering'} 
          />

          {/* Sensor Grid - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SensorCard
              icon={data?.status_hujan === 'Hujan' ? CloudRain : Sun}
              title="Cuaca"
              value={data?.status_hujan === 'Hujan' ? 'Hujan' : 'Cerah'}
              iconBg={data?.status_hujan === 'Hujan' ? 'bg-rose-100 dark:bg-rose-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}
              iconColor={data?.status_hujan === 'Hujan' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}
            />
            <SensorCard
              icon={Home}
              title="Posisi Atap"
              value={data?.posisi === 'Di Luar' ? 'Terbuka' : 'Tertutup'}
              iconBg="bg-indigo-100 dark:bg-indigo-900/30"
              iconColor="text-indigo-600 dark:text-indigo-400"
            />
            <SensorCard
              icon={Lightbulb}
              title="Cahaya"
              value={data?.cahaya?.toFixed(0) ?? '0'}
              unit="Lux"
              iconBg="bg-yellow-100 dark:bg-yellow-900/30"
              iconColor="text-yellow-600 dark:text-yellow-400"
            />
            <SensorCard
              icon={Droplets}
              title="Kelembapan"
              value={data?.kelembapan?.toFixed(1) ?? '0'}
              unit="%"
              iconBg="bg-sky-100 dark:bg-sky-900/30"
              iconColor="text-sky-600 dark:text-sky-400"
            />
          </div>

          {/* Temperature Chart */}
          <TemperatureChart currentTemp={data?.suhu} />

          {/* Control Panel */}
          <div className="mt-6">
            <ControlButtons />
          </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-4">
        <p className="text-center text-xs text-gray-400 dark:text-slate-500">
          Jemuran Otomatis © 2024 • ESP32 + Firebase + React
        </p>
      </footer>
    </div>
  );
};

// ============================================
// APP ENTRY
// ============================================
function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
