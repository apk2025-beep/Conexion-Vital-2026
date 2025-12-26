
import React from 'react';
import { Target } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <div className="bg-teal-500 p-2 rounded-lg">
                <Target size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Gestor de Condiciones Pro</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
