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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (asistencias.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay registros de asistencia</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asistencia.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asistencia.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(asistencia.fecha).toLocaleDateString('es-ES')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asistencia.horaEntrada || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asistencia.horaSalida || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <EstadoBadge estado={asistencia.estado} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Link to={`/asistencias/${asistencia.id}`} className="text-indigo-600 hover:text-indigo-900">
                  Ver
                </Link>
                <Link to={`/asistencias/${asistencia.id}/editar`} className="text-yellow-600 hover:text-yellow-900">
                  Editar
                </Link>
                <button
                  onClick={() => onDelete(asistencia.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
