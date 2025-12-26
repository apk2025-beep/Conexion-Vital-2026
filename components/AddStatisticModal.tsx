
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { X } from 'lucide-react';

interface AddStatisticModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  statisticName: string;
}

const AddStatisticModal: React.FC<AddStatisticModalProps> = ({ isOpen, onClose, projectId, statisticName }) => {
  const [value, setValue] = useState('');
  const { addStatistic } = useProjects();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      addStatistic(projectId, { value: numericValue });
      setValue('');
      onClose();
    } else {
        alert('Por favor, introduce un número válido.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Añadir Nuevo Dato</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-300">
              Valor para "{statisticName}"
            </label>
            <input
              id="value"
              type="number"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white p-2"
              placeholder="Introduce el valor numérico"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Se creará un nuevo punto de dato con la fecha de hoy.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mr-2 transition">
              Cancelar
            </button>
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition">
              Añadir Dato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStatisticModal;
