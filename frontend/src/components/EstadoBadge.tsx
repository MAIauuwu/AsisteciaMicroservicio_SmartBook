import { ESTADOS, EstadoAsistencia } from '../types/asistencia';

interface EstadoBadgeProps {
  estado: string;
}

export default function EstadoBadge({ estado }: EstadoBadgeProps) {
  const estadoConfig = ESTADOS.find(e => e.value === estado.toUpperCase());
  const colorClass = estadoConfig?.color || 'bg-gray-100 text-gray-800';
  const label = estadoConfig?.label || estado;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
