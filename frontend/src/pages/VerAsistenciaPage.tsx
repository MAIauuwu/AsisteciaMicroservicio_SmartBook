import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Asistencia, ESTADOS } from '../types/asistencia';
import * as asistenciaService from '../services/asistenciaService';
import EstadoBadge from '../components/EstadoBadge';

export default function VerAsistenciaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asistencia, setAsistencia] = useState<Asistencia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAsistencia = async () => {
      try {
        setLoading(true);
        const data = await asistenciaService.getAsistenciaById(Number(id));
        setAsistencia(data);
      } catch {
        setError('Asistencia no encontrada');
      } finally {
        setLoading(false);
      }
    };

    fetchAsistencia();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !asistencia) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error || 'Asistencia no encontrada'}</p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const estadoConfig = ESTADOS.find(e => e.value === asistencia.estado);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Detalle de Asistencia</h1>
        <Link
          to={`/asistencias/${asistencia.id}/editar`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
        >
          Editar
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">ID: #{asistencia.id}</span>
            <EstadoBadge estado={asistencia.estado} />
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Usuario</label>
              <p className="mt-1 text-sm text-gray-900">{asistencia.userId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Fecha</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(asistencia.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Hora de Entrada</label>
              <p className="mt-1 text-sm text-gray-900">{asistencia.horaEntrada || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Hora de Salida</label>
              <p className="mt-1 text-sm text-gray-900">{asistencia.horaSalida || '-'}</p>
            </div>
          </div>

          {asistencia.observaciones && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Observaciones</label>
              <p className="mt-1 text-sm text-gray-900">{asistencia.observaciones}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-500">Creado</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(asistencia.createdAt).toLocaleString('es-ES')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Actualizado</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(asistencia.updatedAt).toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
