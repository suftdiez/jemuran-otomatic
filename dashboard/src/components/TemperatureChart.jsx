import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTheme } from '../hooks/useTheme';

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].value.toFixed(1)}°C
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {payload[0].payload.time}
          </p>
        </div>
      );
    }
    return null;
  };

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
        <div className="text-right">
          <span className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
            {currentTemp?.toFixed(1) ?? '--'}
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">°C</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history.length > 0 ? history : [{ value: currentTemp || 0, time: 'Now' }]}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
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
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#tempGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureChart;
