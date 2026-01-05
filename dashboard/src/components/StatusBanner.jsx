import { CloudRain, Sun, Home } from 'lucide-react';

const StatusBanner = ({ posisi, status_hujan }) => {
  const isRaining = status_hujan === 'Hujan';
  const isOutside = posisi === 'Di Luar';

  const getStatus = () => {
    if (isRaining) {
      return {
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        border: 'border-rose-200 dark:border-rose-800',
        text: 'text-rose-800 dark:text-rose-300',
        icon: CloudRain,
        iconBg: 'bg-rose-100 dark:bg-rose-900/40',
        iconColor: 'text-rose-600 dark:text-rose-400',
        title: 'Hujan Terdeteksi',
        subtitle: 'Jemuran diamankan ke dalam ruangan'
      };
    }
    
    if (isOutside) {
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        text: 'text-emerald-800 dark:text-emerald-300',
        icon: Sun,
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        title: 'Cuaca Cerah',
        subtitle: 'Menjemur dengan sinar matahari'
      };
    }

    return {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: Home,
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: 'Mode Standby',
      subtitle: 'Jemuran tersimpan di dalam'
    };
  };

  const status = getStatus();
  const Icon = status.icon;

  return (
    <div className={`w-full p-4 rounded-lg border ${status.bg} ${status.border} mb-6 animate-fade-in transition-theme`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${status.iconBg}`}>
          <Icon className={`w-6 h-6 ${status.iconColor}`} />
        </div>
        <div>
          <h2 className={`text-lg font-semibold ${status.text}`}>
            {status.title}
          </h2>
          <p className={`text-sm ${status.text} opacity-80`}>
            {status.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;
