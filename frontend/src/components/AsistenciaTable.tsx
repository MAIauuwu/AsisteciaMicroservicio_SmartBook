import { Link } from 'react-router-dom';
import { Asistencia } from '../types/asistencia';
import EstadoBadge from './EstadoBadge';

interface AsistenciaTableProps {
  asistencias: Asistencia[];
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function AsistenciaTable({ asistencias, onDelete, loading = false }: AsistenciaTableProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
        <p className="mt-4 text-sm text-gray-500">Cargando asistencias...</p>
      </div>
    );
  }

  if (asistencias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-gray-500 text-lg font-medium">No hay registros de asistencia</p>
        <p className="text-gray-400 text-sm mt-1">Crea una nueva asistencia para comenzar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Entrada</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Salida</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                #{asistencia.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-600">
                      {asistencia.userId.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{asistencia.userId}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {new Date(asistencia.fecha).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {asistencia.horaEntrada || <span className="text-gray-300">—</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {asistencia.horaSalida || <span className="text-gray-300">—</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <EstadoBadge estado={asistencia.estado} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    to={`/asistencias/${asistencia.id}`}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/asistencias/${asistencia.id}/editar`}
                    className="px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => onDelete(asistencia.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
