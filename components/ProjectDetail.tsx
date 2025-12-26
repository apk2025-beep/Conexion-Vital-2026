
import React, { useState } from 'react';
import { Project } from '../types';
import { useProjects } from '../hooks/useProjects';
import { CONDITIONS_DATA } from '../constants';
import StatisticsChart from './StatisticsChart';
import AddStatisticModal from './AddStatisticModal';
import FormulaSteps from './FormulaSteps';
import { Plus, Trash2, AlertTriangle, History, Calendar } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const { deleteProject, removeStatistic } = useProjects();
  const [isAddStatModalOpen, setIsAddStatModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const conditionData = CONDITIONS_DATA[project.currentCondition];

  const handleDelete = () => {
    if (showDeleteConfirm) {
        deleteProject(project.id);
    } else {
        setShowDeleteConfirm(true);
    }
  }

  // Ordenar estadísticas de más reciente a más antigua para la tabla
  const sortedHistory = [...project.stats].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6 flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{project.name}</h2>
          <p className="text-gray-400">{project.description}</p>
        </div>
        <div>
          <button
            onClick={() => setIsAddStatModalOpen(true)}
            className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mr-2 shadow-lg shadow-teal-900/20"
          >
            <Plus size={20} />
            <span>Añadir Dato</span>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-700">
        <div className="h-64 md:h-80">
            <StatisticsChart stats={project.stats} statisticName={project.statisticName} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="mr-2">Condición Actual:</span>
                <span className="text-teal-400">{project.currentCondition}</span>
            </h3>
            <p className="text-sm text-gray-300 mb-4 italic">"{conditionData.description}"</p>
            <h4 className="font-semibold mb-3 text-teal-200 uppercase text-xs tracking-wider">Fórmula de Ejecución:</h4>
            <FormulaSteps project={project} />
          </div>

          <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
                <History size={18} className="mr-2 text-teal-400" />
                Historial de Registros
            </h3>
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {sortedHistory.length > 0 ? (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
                            <tr>
                                <th className="px-3 py-2">Fecha</th>
                                <th className="px-3 py-2">Valor</th>
                                <th className="px-3 py-2 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedHistory.map((stat) => (
                                <tr key={stat.date} className="border-b border-gray-700 hover:bg-gray-600/30 transition">
                                    <td className="px-3 py-2 flex items-center">
                                        <Calendar size={14} className="mr-2 text-gray-500" />
                                        {new Date(stat.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-2 font-mono font-bold text-teal-300">
                                        {stat.value}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <button 
                                            onClick={() => removeStatistic(project.id, stat.date)}
                                            className="text-gray-500 hover:text-red-400 transition"
                                            title="Eliminar este registro"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 py-4 italic">No hay registros históricos.</p>
                )}
            </div>
          </div>
      </div>

       <div className="flex justify-end pt-4 border-t border-gray-700">
            {!showDeleteConfirm ? (
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center space-x-2 text-sm text-red-400 hover:text-red-300 transition"
                >
                    <Trash2 size={16} />
                    <span>Eliminar Proyecto</span>
                </button>
            ) : (
                <div className="flex items-center space-x-4">
                    <p className="text-sm text-yellow-400 flex items-center"><AlertTriangle size={16} className="mr-2"/> ¿Eliminar todo el proyecto?</p>
                    <button onClick={handleDelete} className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md transition">Sí, Eliminar</button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="text-sm bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-md transition">Cancelar</button>
                </div>
            )}
        </div>
      <AddStatisticModal 
        isOpen={isAddStatModalOpen} 
        onClose={() => setIsAddStatModalOpen(false)} 
        projectId={project.id}
        statisticName={project.statisticName}
      />
    </div>
  );
};

export default ProjectDetail;
