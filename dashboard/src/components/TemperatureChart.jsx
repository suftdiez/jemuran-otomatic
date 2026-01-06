import { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTheme } from '../hooks/useTheme';
import { Thermometer } from 'lucide-react';

const TemperatureChart = ({ currentTemp }) => {
  const { isDark } = useTheme();
  const [history, setHistory] = useState([]);

  // Temperature threshold for color change
  const TEMP_THRESHOLD = 27;

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

  // Dynamic color based on temperature
  const chartColors = useMemo(() => {
    const isHot = (currentTemp ?? 0) >= TEMP_THRESHOLD;
    return {
      stroke: isHot ? '#f43f5e' : '#0ea5e9',      // Rose-500 or Sky-500
      fillStart: isHot ? '#f43f5e' : '#0ea5e9',   // Gradient start
      fillEnd: isHot ? '#fb7185' : '#38bdf8',     // Gradient end (lighter)
      badge: isHot 
        ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' 
        : 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
      label: isHot ? 'Panas' : 'Dingin',
      icon: isHot ? 'text-rose-500' : 'text-sky-500'
    };
  }, [currentTemp]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const temp = payload[0].value;
      const isHot = temp >= TEMP_THRESHOLD;
      return (
        <div className={`px-3 py-2 rounded-lg shadow-lg border ${
          isHot 
            ? 'bg-rose-50 dark:bg-rose-900/50 border-rose-200 dark:border-rose-700' 
            : 'bg-sky-50 dark:bg-sky-900/50 border-sky-200 dark:border-sky-700'
        }`}>
          <p className={`text-sm font-bold ${isHot ? 'text-rose-700 dark:text-rose-300' : 'text-sky-700 dark:text-sky-300'}`}>
            {temp.toFixed(1)}°C
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {payload[0].payload.time}
          </p>
        </div>
      );
    }
    return null;
  };

  // Generate unique gradient ID to avoid conflicts
  const gradientId = `tempGradient-${chartColors.stroke.replace('#', '')}`;

  return (
    <div className="card p-6 transition-theme">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Suhu Real-time
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitoring suhu lingkungan
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Temperature Status Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${chartColors.badge}`}>
            <Thermometer className={`w-3.5 h-3.5 ${chartColors.icon}`} />
            {chartColors.label}
          </div>
          {/* Current Temperature */}
          <div className="text-right">
            <span className={`text-3xl font-bold tabular-nums ${
              (currentTemp ?? 0) >= TEMP_THRESHOLD 
                ? 'text-rose-600 dark:text-rose-400' 
                : 'text-sky-600 dark:text-sky-400'
            }`}>
              {currentTemp?.toFixed(1) ?? '--'}
            </span>
            <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">°C</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history.length > 0 ? history : [{ value: currentTemp || 0, time: 'Now' }]}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.fillStart} stopOpacity={0.4} />
                <stop offset="100%" stopColor={chartColors.fillEnd} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#e5e7eb'} 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
              domain={['auto', 'auto']}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColors.stroke}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: chartColors.stroke, 
                stroke: '#fff', 
                strokeWidth: 2,
                className: 'drop-shadow-lg'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-500" />
          <span>Dingin (&lt; {TEMP_THRESHOLD}°C)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span>Panas (≥ {TEMP_THRESHOLD}°C)</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureChart;

