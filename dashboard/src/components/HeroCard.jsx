import { Sun, CloudRain, Home, Shirt, AlertTriangle, Umbrella, CloudSun } from 'lucide-react';

const HeroCard = ({ posisi, status_hujan }) => {
  const isRaining = status_hujan === 'Hujan';
  const isOutside = posisi === 'Di Luar';
  
  // Determine the visual state
  const getCardState = () => {
    if (isRaining) {
      return {
        gradient: 'from-rose-500/10 via-red-500/5 to-orange-500/10',
        glowClass: 'animate-pulse-glow',
        iconBg: 'from-rose-500 to-red-600',
        icon: CloudRain,
        secondaryIcon: Umbrella,
        title: 'Hujan Terdeteksi!',
        subtitle: isOutside ? 'Jemuran perlu dimasukkan' : 'Jemuran aman di dalam',
        textColor: 'text-rose-800',
        subtitleColor: 'text-rose-600',
        accentColor: 'text-rose-500',
        badgeBg: 'bg-rose-100 text-rose-700 border-rose-200'
      };
    }
    
    if (isOutside) {
      return {
        gradient: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10',
        glowClass: '',
        iconBg: 'from-emerald-500 to-teal-600',
        icon: Sun,
        secondaryIcon: Shirt,
        title: 'Cuaca Cerah ☀️',
        subtitle: 'Jemuran sedang dijemur di luar',
        textColor: 'text-emerald-800',
        subtitleColor: 'text-emerald-600',
        accentColor: 'text-amber-500',
        badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-200'
      };
    }
    
    return {
      gradient: 'from-blue-500/10 via-indigo-500/5 to-violet-500/10',
      glowClass: '',
      iconBg: 'from-blue-500 to-indigo-600',
      icon: Home,
      secondaryIcon: CloudSun,
      title: 'Jemuran Tersimpan',
      subtitle: 'Aman di dalam ruangan',
      textColor: 'text-blue-800',
      subtitleColor: 'text-blue-600',
      accentColor: 'text-blue-500',
      badgeBg: 'bg-blue-100 text-blue-700 border-blue-200'
    };
  };

  const state = getCardState();
  const IconComponent = state.icon;
  const SecondaryIcon = state.secondaryIcon;

  return (
    <div className={`relative overflow-hidden rounded-3xl glass-card p-6 lg:p-8 h-full ${state.glowClass}`}>
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${state.gradient} pointer-events-none`} />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-3xl transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-white/30 to-transparent blur-2xl transform -translate-x-1/4 translate-y-1/4" />

      <div className="relative flex flex-col h-full">
        {/* Top Badge */}
        <div className="flex items-center justify-between mb-6">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${state.badgeBg}`}>
            <SecondaryIcon className="w-3.5 h-3.5" />
            Status Jemuran
          </span>
          <span className={`text-xs font-medium ${state.subtitleColor} opacity-70`}>
            Real-time
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          {/* Animated Icon */}
          <div className="relative mb-6">
            <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br ${state.iconBg} flex items-center justify-center shadow-2xl animate-float`}>
              <IconComponent className="w-12 h-12 lg:w-16 lg:h-16 text-white" strokeWidth={1.5} />
            </div>
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${state.iconBg} blur-xl opacity-40`} />
          </div>

          {/* Text */}
          <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold ${state.textColor} mb-2 text-center`}>
            {state.title}
          </h2>
          <p className={`text-base lg:text-lg ${state.subtitleColor} font-medium text-center`}>
            {state.subtitle}
          </p>
        </div>

        {/* Bottom Status Pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium ${state.subtitleColor}`}>
            <span className={`w-2 h-2 rounded-full ${isOutside ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            Posisi: {posisi}
          </span>
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium ${state.subtitleColor}`}>
            <span className={`w-2 h-2 rounded-full ${isRaining ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            Cuaca: {status_hujan}
          </span>
        </div>
      </div>

      {/* Rain Animation Overlay */}
      {isRaining && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-6 bg-gradient-to-b from-blue-400/60 to-transparent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: `float ${1 + Math.random()}s ease-in-out infinite reverse`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCard;
