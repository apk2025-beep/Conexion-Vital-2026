
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { X } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [statisticName, setStatisticName] = useState('');
  const { addProject } = useProjects();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description && statisticName) {
      addProject({ name, description, statisticName });
      setName('');
      setDescription('');
      setStatisticName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Crear Nuevo Proyecto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre del Proyecto</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white p-2"
              placeholder="Ej: Mi Rutina de Ejercicio"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white p-2"
              placeholder="Una breve descripción de qué trata este proyecto."
              required
            />
          </div>
          <div>
            <label htmlFor="statisticName" className="block text-sm font-medium text-gray-300">Estadística a Medir</label>
            <input
              id="statisticName"
              type="text"
              value={statisticName}
              onChange={(e) => setStatisticName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white p-2"
              placeholder="Ej: Kilos levantados, Palabras escritas"
              required
            />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mr-2 transition">
              Cancelar
            </button>
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition">
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
