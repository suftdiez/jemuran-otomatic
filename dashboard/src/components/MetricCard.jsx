const MetricCard = ({ icon: Icon, title, value, unit, iconColor }) => {
  return (
    <div className="card p-5 transition-theme">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {unit}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
