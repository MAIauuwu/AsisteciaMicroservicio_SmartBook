import { ESTADOS, EstadoAsistencia } from '../types/asistencia';

interface EstadoBadgeProps {
  estado: string;
  size?: 'sm' | 'md';
}

export default function EstadoBadge({ estado, size = 'sm' }: EstadoBadgeProps) {
  const estadoConfig = ESTADOS.find((e) => e.value === estado.toUpperCase());
  const bgColor = estadoConfig?.bgColor || 'bg-gray-100';
  const color = estadoConfig?.color || 'text-gray-800';
  const label = estadoConfig?.label || estado;
  const icon = estadoConfig?.icon || '';

  const sizeClasses = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 ${sizeClasses} font-medium rounded-full ${bgColor} ${color}`}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
