
import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Statistic } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StatisticsChartProps {
  stats: Statistic[];
  statisticName: string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ stats, statisticName }) => {
  const [viewDate, setViewDate] = useState(new Date('2026-01-01T12:00:00Z'));

  useEffect(() => {
    if (stats.length > 0) {
      const sortedStats = [...stats].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setViewDate(new Date(sortedStats[0].date));
    } else {
      setViewDate(new Date('2026-01-01T12:00:00Z'));
    }
  }, [stats]);

  const { filteredData, monthDomain, weekTicks } = useMemo(() => {
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();

    const startDate = new Date(viewYear, viewMonth, 1);
    const endDate = new Date(viewYear, viewMonth + 1, 0);
    endDate.setHours(23, 59, 59, 999);
    
    const lastDayOfMonth = endDate.getDate();

    const data = stats
      .map(s => ({ ...s, dateObj: new Date(s.date) }))
      .filter(s => s.dateObj >= startDate && s.dateObj <= endDate)
      .map(s => ({
        fullDate: s.dateObj.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        day: s.dateObj.getDate(),
        [statisticName]: s.value,
      }));

    const ticks = [1, 8, 15, 22];
    if (lastDayOfMonth >= 29) {
        ticks.push(29);
    }
      
    return { 
        filteredData: data, 
        monthDomain: [1, lastDayOfMonth],
        weekTicks: ticks
    };
  }, [stats, viewDate, statisticName]);

  const handlePrevious = () => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const getDisplayTitle = () => {
    const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' });
    return formatter.format(viewDate);
  };
  
  const formatWeekTick = (tick: number, index: number) => `Sem ${index + 1}`;

  if (stats.length === 0) {
    return (
        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900/50 rounded-lg">
            <p>Aún no hay datos. Añade un dato para ver el gráfico.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-4 mb-2">
        <button
          onClick={handlePrevious}
          className="p-1 rounded-full text-gray-400 bg-gray-700/50 hover:bg-gray-600/50 hover:text-white transition"
          title="Mes Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-sm font-bold text-teal-300 tracking-wider uppercase">
          {getDisplayTitle()}
        </h4>
        <button
          onClick={handleNext}
          className="p-1 rounded-full text-gray-400 bg-gray-700/50 hover:bg-gray-600/50 hover:text-white transition"
          title="Siguiente Mes"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis 
                dataKey="day" 
                type="number"
                domain={monthDomain}
                ticks={weekTicks}
                tickFormatter={formatWeekTick}
                stroke="#A0AEC0" 
                fontSize={12} 
            />
            <YAxis stroke="#A0AEC0" fontSize={12} />
            <Tooltip
                contentStyle={{ backgroundColor: '#2D3748', borderColor: '#4A5568', color: '#E2E8F0' }}
                itemStyle={{ color: '#63B3ED' }}
                labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                        return payload[0].payload.fullDate;
                    }
                    return `Día ${label}`;
                }}
            />
            <Legend wrapperStyle={{ color: '#E2E8F0', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey={statisticName}
              stroke="#4FD1C5"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            >
              <LabelList
                dataKey={statisticName}
                position="top"
                fill="#4FD1C5"
                fontSize={12}
                fontWeight="bold"
                offset={12}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsChart;
