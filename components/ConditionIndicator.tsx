
import React from 'react';
import { Condition } from '../types';
import { CONDITION_COLORS } from '../constants';

interface ConditionIndicatorProps {
  condition: Condition;
}

const ConditionIndicator: React.FC<ConditionIndicatorProps> = ({ condition }) => {
  const colorClass = CONDITION_COLORS[condition] || 'bg-gray-500';

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white whitespace-nowrap ${colorClass}`}>
      {condition}
    </span>
  );
};

export default ConditionIndicator;
