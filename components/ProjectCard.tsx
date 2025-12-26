
import React from 'react';
import { Project } from '../types';
import ConditionIndicator from './ConditionIndicator';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelect }) => {
  const lastValue = project.stats.length > 0 ? project.stats[project.stats.length - 1].value : 0;
  const prevValue = project.stats.length > 1 ? project.stats[project.stats.length - 2].value : lastValue;
  
  const isUp = lastValue > prevValue;
  const isDown = lastValue < prevValue;

  const cardClasses = `
    p-4 rounded-xl cursor-pointer transition-all duration-300 ease-out border
    ${isSelected 
      ? 'bg-teal-900/30 border-teal-500 shadow-lg shadow-teal-500/20 translate-x-2' 
      : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-500 shadow-md'}
  `;

  return (
    <div className={cardClasses} onClick={onSelect}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-white truncate max-w-[150px]">{project.name}</h3>
        <ConditionIndicator condition={project.currentCondition} />
      </div>
      
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Último Dato</span>
            <div className="flex items-center space-x-2">
                <span className="text-xl font-mono font-black text-teal-400">{lastValue}</span>
                <span className="text-xs text-gray-400">{project.statisticName}</span>
            </div>
        </div>
        
        <div className={`p-1.5 rounded-full ${isUp ? 'bg-green-900/30 text-green-400' : isDown ? 'bg-red-900/30 text-red-400' : 'bg-gray-700 text-gray-400'}`}>
            {isUp && <TrendingUp size={18} />}
            {isDown && <TrendingDown size={18} />}
            {!isUp && !isDown && <Minus size={18} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
