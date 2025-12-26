
import { Statistic, Condition } from '../types';

export const determineCondition = (stats: Statistic[]): Condition => {
  if (stats.length < 2) {
    return Condition.NonExistence;
  }

  // Ordenar estadísticas por fecha para asegurar el orden cronológico
  const sortedStats = [...stats].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Analizar la tendencia de los últimos 4 puntos de datos, o menos si no hay suficientes
  const relevantStats = sortedStats.slice(-4);
  
  if (relevantStats.length < 2) {
      return Condition.NonExistence;
  }

  const firstValue = relevantStats[0].value;
  const lastValue = relevantStats[relevantStats.length - 1].value;

  // Evitar división por cero
  if (firstValue === 0 && lastValue > 0) {
    return Condition.Affluence;
  }
  if (firstValue === 0 && lastValue === 0) {
      return Condition.Emergency;
  }

  const overallChange = (lastValue - firstValue) / Math.abs(firstValue);
  
  // También revisar el cambio más reciente
  const recentFirst = relevantStats.length > 2 ? relevantStats[relevantStats.length - 2].value : firstValue;
  const recentLast = lastValue;
  const recentChange = recentFirst === 0 ? (recentLast > 0 ? 1 : 0) : (recentLast - recentFirst) / Math.abs(recentFirst);

  // PODER: Rendimiento alto y sostenido. Simplificado: último valor muy alto y tendencia normal o mejor.
  // Esto es una simplificación; una verdadera condición de "Poder" necesitaría más contexto histórico.
  if (overallChange > 0.5 && lastValue > (sortedStats.reduce((acc, s) => acc + s.value, 0) / sortedStats.length) * 2) {
      return Condition.Power;
  }

  // AFLUENCIA: Subida pronunciada
  if (overallChange > 0.20 || recentChange > 0.25) {
    return Condition.Affluence;
  }

  // NORMAL: Subida ligera
  if (overallChange > 0.02) {
    return Condition.Normal;
  }

  // EMERGENCIA: Estable o ligera bajada
  if (overallChange > -0.05) {
    return Condition.Emergency;
  }

  // PELIGRO: Bajada
  if (overallChange > -0.20) {
    return Condition.Danger;
  }

  // INEXISTENCIA: Bajada pronunciada
  return Condition.NonExistence;
};
