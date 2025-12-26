
export enum Condition {
  Power = 'Poder',
  Affluence = 'Afluencia',
  Normal = 'Normal',
  Emergency = 'Emergencia',
  Danger = 'Peligro',
  NonExistence = 'Inexistencia',
}

export interface FormulaStep {
  id: string;
  text: string;
  completed: boolean;
}

export interface Statistic {
  date: string; // ISO string format
  value: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  statisticName: string; // e.g., "Ingresos Semanales", "Palabras Escritas"
  stats: Statistic[];
  currentCondition: Condition;
}
