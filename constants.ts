
import { Condition, FormulaStep } from './types';

export const CONDITIONS_DATA: Record<Condition, { description: string; formula: Omit<FormulaStep, 'completed'>[] }> = {
  [Condition.Power]: {
    description: "Estado de abundancia y éxito sostenido al más alto nivel.",
    formula: [
      { id: 'p1', text: "No te desconectes: Mantén la presencia personal en áreas críticas (ej. no dejes de supervisar a tus clientes más grandes)." },
      { id: 'p2', text: "Registra tus líneas de éxito: Documenta exactamente qué procesos trajeron el éxito (ej. crea manuales de 'Ventas Maestras')." },
      { id: 'p3', text: "Prepara el relevo: Haz que tu puesto sea transferible para que puedas ascender (ej. entrena a un asistente en tus tareas clave)." },
      { id: 'p4', text: "Simplifica y fortalece: Elimina burocracia innecesaria que frene la velocidad de producción." }
    ]
  },
  [Condition.Affluence]: {
    description: "Crecimiento explosivo y tendencia ascendente vertical.",
    formula: [
      { id: 'a1', text: "Economiza con rigor: Asegura las ganancias y evita gastos innecesarios (ej. NO compres lujos ahora, ahorra el 40% de lo ingresado)." },
      { id: 'a2', text: "Paga todas las deudas: Limpia tus balances financieros (ej. liquida tarjetas de crédito, paga proveedores por adelantado)." },
      { id: 'a3', text: "Invierte en producción: Refuerza las herramientas que generan dinero (ej. compra mejores equipos, amplía tu inventario, mejora tu software)." },
      { id: 'a4', text: "Refuerza la causa: Identifica qué campaña o acción causó el éxito e intensifícala (ej. si un anuncio funcionó, duplica su presupuesto)." }
    ]
  },
  [Condition.Normal]: {
    description: "Crecimiento constante y estable. Estado de salud organizacional.",
    formula: [
      { id: 'n1', text: "No cambies nada: Si el sistema funciona, mantén la estructura actual sin experimentos drásticos." },
      { id: 'n2', text: "Ética suave: Corrige errores pequeños con comunicación, no con sanciones (ej. una charla rápida para ajustar detalles)." },
      { id: 'n3', text: "Investiga el éxito: Cada vez que un dato suba, averigua '¿Por qué pasó?' y repítelo (ej. 'esta semana llamamos a más prospectos, sigamos así')." },
      { id: 'n4', text: "Corrige lo que baja: Si un dato cae mínimamente, actúa rápido (ej. revisa si un anuncio se desactivó por error)." }
    ]
  },
  [Condition.Emergency]: {
    description: "Tendencia plana o descenso ligero. Señal de alerta inmediata.",
    formula: [
      { id: 'e1', text: "PROMOCIONA Y PRODUCE: Aumenta masivamente la visibilidad (ej. lanza 3 campañas nuevas, haz 50 llamadas de ventas hoy mismo)." },
      { id: 'e2', text: "Cambia tu base de operación: Haz algo diferente para romper la inercia (ej. cambia el mensaje de tus anuncios, prueba un nuevo canal de ventas)." },
      { id: 'e3', text: "RECORTA GASTOS: Elimina todo lo que no sea vital para sobrevivir (ej. cancela suscripciones innecesarias, reduce gastos de oficina)." },
      { id: 'e4', text: "Prepárate para entregar: Asegúrate de que puedes cumplir con lo que promocionas (ej. limpia tu bandeja de entrada, organiza tu agenda)." },
      { id: 'e5', text: "Disciplina: Sé estricto con los horarios y objetivos diarios (ej. reuniones de control cada mañana)." }
    ]
  },
  [Condition.Danger]: {
    description: "Descenso marcado. Situación de crisis que requiere intervención.",
    formula: [
      { id: 'd1', text: "Intervención Directa: El líder debe bajar al área y manejarla personalmente (ej. el dueño debe ponerse a vender o a fabricar)." },
      { id: 'd2', text: "Maneja el peligro: Detén las pérdidas inmediatas (ej. corta un contrato que drena dinero, atiende personalmente al cliente que quiere irse)." },
      { id: 'd3', text: "Asigna Condición de Peligro: Informa a todos que estamos en crisis y no hay margen de error." },
      { id: 'd4', text: "Reorganiza: Cambia a las personas o los procesos que no funcionan (ej. mueve a alguien de puesto, cambia el proveedor que falla)." },
      { id: 'd5', text: "Establece políticas firmes: Crea reglas que impidan que esto se repita (ej. 'ningún pago se hace sin autorización del director')." }
    ]
  },
  [Condition.NonExistence]: {
    description: "Inicio de un nuevo proyecto o caída total. Punto cero.",
    formula: [
      { id: 'ne1', text: "Encuentra comunicación: Abre canales para que la gente te vea (ej. crea tu web, abre WhatsApp Business, consigue un teléfono)." },
      { id: 'ne2', text: "Date a conocer: Sal al mercado agresivamente (ej. envía 100 emails de presentación, asiste a 2 eventos, publica 5 veces al día)." },
      { id: 'ne3', text: "Averigua qué necesitan: No adivines, pregunta al mercado (ej. haz encuestas, habla con clientes potenciales sobre sus problemas)." },
      { id: 'ne4', text: "Produce y entrega: Haz algo real y entrégalo (ej. crea tu primer prototipo, ofrece tu primera consultoría gratuita para ganar testimonios)." }
    ]
  }
};

export const CONDITION_COLORS: Record<Condition, string> = {
    [Condition.Power]: 'bg-purple-600 shadow-purple-900/40',
    [Condition.Affluence]: 'bg-green-600 shadow-green-900/40',
    [Condition.Normal]: 'bg-blue-600 shadow-blue-900/40',
    [Condition.Emergency]: 'bg-yellow-500 text-yellow-950 shadow-yellow-900/40',
    [Condition.Danger]: 'bg-orange-600 shadow-orange-900/40',
    [Condition.NonExistence]: 'bg-red-600 shadow-red-900/40',
};
