
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import AddProjectModal from './AddProjectModal';
import { PlusCircle, Info, Target, LayoutDashboard, BarChart3 } from 'lucide-react';
import { Condition } from '../types';

const Dashboard: React.FC = () => {
  const { projects } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    projects.length > 0 ? projects[0].id : null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  // Resumen de condiciones
  const counts = projects.reduce((acc, p) => {
    acc[p.currentCondition] = (acc[p.currentCondition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Resumen de Estado Global */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {Object.values(Condition).map((cond) => (
            <div key={cond} className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl text-center">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">{cond}</div>
                <div className="text-xl font-black text-white">{counts[cond] || 0}</div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center text-gray-200">
                    <LayoutDashboard size={20} className="mr-2 text-teal-500" />
                    Panel de Control
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold p-2 rounded-lg transition duration-300 shadow-lg shadow-teal-900/40"
                    title="Crear Nuevo Proyecto"
                    >
                    <PlusCircle size={24} />
                </button>
            </div>
          
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-18rem)] pr-2 custom-scrollbar">
            {projects.length > 0 ? (
                projects.map(project => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProjectId === project.id}
                    onSelect={() => setSelectedProjectId(project.id)}
                />
                ))
            ) : (
                <div className="text-center py-10 text-gray-400 bg-gray-800 border border-dashed border-gray-600 rounded-xl">
                    <Info size={32} className="mx-auto mb-2 text-gray-600" />
                    <p className="font-semibold">Sin proyectos activos</p>
                    <p className="text-xs px-4">Crea tu primer proyecto para empezar a medir tu éxito.</p>
                </div>
            )}
            </div>
        </div>

        <div className="lg:col-span-2">
          {selectedProject ? (
            <ProjectDetail project={selectedProject} key={selectedProject.id} />
          ) : (
             <div className="flex items-center justify-center h-[500px] bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700">
                <div className="text-center text-gray-500">
                    <BarChart3 size={64} className="mx-auto mb-4 opacity-20" />
                    <h3 className="text-xl font-bold">Selecciona un objetivo</h3>
                    <p className="text-sm">Analiza tus tendencias y aplica fórmulas ganadoras.</p>
                </div>
             </div>
          )}
        </div>
      </div>
      <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
