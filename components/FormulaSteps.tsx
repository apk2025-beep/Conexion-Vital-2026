
import React, { useState, useEffect } from 'react';
import { Project, FormulaStep } from '../types';
import { useProjects } from '../hooks/useProjects';
import { CONDITIONS_DATA } from '../constants';

interface FormulaStepsProps {
    project: Project;
}

const FormulaSteps: React.FC<FormulaStepsProps> = ({ project }) => {
    const { updateProject } = useProjects();
    const formulaTemplate = CONDITIONS_DATA[project.currentCondition].formula;

    const [steps, setSteps] = useState<FormulaStep[]>(() => 
        formulaTemplate.map(templateStep => ({ ...templateStep, completed: false }))
    );

    useEffect(() => {
        // Este efecto reinicia la lista de pasos cuando la condición del proyecto cambia.
        const newFormulaTemplate = CONDITIONS_DATA[project.currentCondition].formula;
        setSteps(newFormulaTemplate.map(ts => ({ ...ts, completed: false })));
    }, [project.currentCondition]);

    const handleToggleStep = (stepId: string) => {
        const newSteps = steps.map(step =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        setSteps(newSteps);
        // NOTA: En una app real, podrías querer guardar esto con un debounce o un botón.
        // Por simplicidad, guardamos en cada cambio.
        // updateProject({ ...project, formulaProgress: newSteps });
    };

    return (
        <ul className="space-y-3">
            {steps.map((step, index) => (
                <li key={step.id} className="flex items-start">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => handleToggleStep(step.id)}
                            className="form-checkbox h-5 w-5 text-teal-500 bg-gray-800 border-gray-600 rounded focus:ring-teal-500"
                        />
                        <span className={`ml-3 text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                            <strong>Paso {index + 1}:</strong> {step.text}
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    );
}

export default FormulaSteps;
