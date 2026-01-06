const SensorCard = ({ icon: Icon, label, value, unit, color, subtext }) => {
  const colorClasses = {
    teal: {
      iconBg: 'from-teal-500 to-emerald-600',
      iconGlow: 'bg-teal-500',
      text: 'text-teal-600',
      value: 'text-teal-800'
    },
    blue: {
      iconBg: 'from-blue-500 to-indigo-600',
      iconGlow: 'bg-blue-500',
      text: 'text-blue-600',
      value: 'text-blue-800'
    },
    amber: {
      iconBg: 'from-amber-500 to-orange-600',
      iconGlow: 'bg-amber-500',
      text: 'text-amber-600',
      value: 'text-amber-800'
    },
    rose: {
      iconBg: 'from-rose-500 to-pink-600',
      iconGlow: 'bg-rose-500',
      text: 'text-rose-600',
      value: 'text-rose-800'
    },
    // NEW: Slate color for Mendung
    slate: {
      iconBg: 'from-slate-500 to-gray-600',
      iconGlow: 'bg-slate-500',
      text: 'text-slate-600',
      value: 'text-slate-800'
    }
  };

  const colors = colorClasses[color] || colorClasses.teal;

  return (
    <div className="relative overflow-hidden rounded-2xl glass-card glass-card-hover p-5 lg:p-6">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/50 to-transparent blur-2xl transform translate-x-8 -translate-y-8" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2} />
            </div>
            {/* Icon Glow */}
            <div className={`absolute inset-0 rounded-xl ${colors.iconGlow} blur-lg opacity-30`} />
          </div>
          <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider bg-white/50 px-3 py-1 rounded-full`}>
            {label}
          </span>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1.5">
          <span className={`text-4xl lg:text-5xl font-bold ${colors.value} number-transition`}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className={`text-xl lg:text-2xl font-semibold ${colors.text} opacity-70`}>
            {unit}
          </span>
        </div>

        {/* Subtext */}
        {subtext && (
          <p className={`mt-3 text-sm font-medium ${colors.text} opacity-80 flex items-center gap-2`}>
            <span className={`w-1.5 h-1.5 rounded-full ${colors.iconGlow}`} />
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export default SensorCard;
