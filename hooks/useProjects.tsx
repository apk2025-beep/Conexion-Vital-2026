
import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { Project, Statistic } from '../types';
import useLocalStorage from './useLocalStorage';
import { determineCondition } from '../services/conditionLogic';
import { v4 as uuidv4 } from 'uuid';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'stats' | 'currentCondition'>) => void;
  getProject: (id: string) => Project | undefined;
  addStatistic: (projectId: string, statistic: Omit<Statistic, 'date'>) => void;
  removeStatistic: (projectId: string, date: string) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const generateExampleStats = () => {
    const stats = [
        // Q1 2026
        { date: new Date('2026-01-15T12:00:00Z').toISOString(), value: 450 },
        { date: new Date('2026-01-22T12:00:00Z').toISOString(), value: 480 },
        { date: new Date('2026-02-05T12:00:00Z').toISOString(), value: 550 },
        { date: new Date('2026-02-19T12:00:00Z').toISOString(), value: 530 },
        { date: new Date('2026-03-05T12:00:00Z').toISOString(), value: 680 },
        { date: new Date('2026-03-12T12:00:00Z').toISOString(), value: 710 },
        // Q2 2026
        { date: new Date('2026-04-02T12:00:00Z').toISOString(), value: 700 },
        { date: new Date('2026-04-16T12:00:00Z').toISOString(), value: 750 },
        { date: new Date('2026-04-30T12:00:00Z').toISOString(), value: 1000 },
    ];
    return stats;
};
const exampleStats = generateExampleStats();


const exampleProjects: Project[] = [
  {
    id: 'example-1',
    name: 'Ejemplo: Ingresos Mensuales 2026',
    description: 'Seguimiento de ingresos para mejorar el rendimiento del negocio durante el año fiscal 2026.',
    statisticName: 'Ingresos ($)',
    stats: exampleStats,
    currentCondition: determineCondition(exampleStats)
  }
];


export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);

  const initializedProjects = useMemo(() => {
    const storedProjects = localStorage.getItem('projects');
    if (!storedProjects || JSON.parse(storedProjects).length === 0) {
      localStorage.setItem('projects', JSON.stringify(exampleProjects));
      return exampleProjects;
    }
    return JSON.parse(storedProjects);
  }, []);

  const [internalProjects, setInternalProjects] = useState<Project[]>(initializedProjects);

  React.useEffect(() => {
    setProjects(internalProjects);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalProjects]);
  

  const addProject = (projectData: Omit<Project, 'id' | 'stats' | 'currentCondition'>) => {
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      stats: [],
      currentCondition: determineCondition([]),
    };
    setInternalProjects(prev => [...prev, newProject]);
  };

  const getProject = (id: string) => {
    return internalProjects.find(p => p.id === id);
  };

  const addStatistic = (projectId: string, statistic: Omit<Statistic, 'date'>) => {
    setInternalProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const newStats: Statistic[] = [...p.stats, { ...statistic, date: new Date().toISOString() }]
             .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          return { ...p, stats: newStats, currentCondition: determineCondition(newStats) };
        }
        return p;
      })
    );
  };

  const removeStatistic = (projectId: string, date: string) => {
    setInternalProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const newStats = p.stats.filter(s => s.date !== date);
          return { ...p, stats: newStats, currentCondition: determineCondition(newStats) };
        }
        return p;
      })
    );
  };

  const updateProject = (updatedProject: Project) => {
    setInternalProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  }

  const deleteProject = (projectId: string) => {
    setInternalProjects(prev => prev.filter(p => p.id !== projectId));
  }

  const value = { projects: internalProjects, addProject, getProject, addStatistic, removeStatistic, updateProject, deleteProject };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects debe ser usado dentro de un ProjectProvider');
  }
  return context;
};
