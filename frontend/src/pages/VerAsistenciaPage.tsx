import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Asistencia } from '../types/asistencia';
import * as asistenciaService from '../services/asistenciaService';
import EstadoBadge from '../components/EstadoBadge';
import Modal from '../components/Modal';
import { showToast } from '../components/Toast';

export default function VerAsistenciaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asistencia, setAsistencia] = useState<Asistencia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await asistenciaService.deleteAsistencia(Number(id));
      showToast('success', 'Asistencia eliminada correctamente');
      navigate('/');
    } catch {
      showToast('error', 'Error al eliminar la asistencia');
    } finally {
      setDeleting(false);
      setDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
        <p className="mt-4 text-gray-500">Cargando asistencia...</p>
      </div>
    );
  }

  if (error || !asistencia) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-red-600 text-lg font-medium">{error || 'Asistencia no encontrada'}</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detalle de Asistencia</h1>
          <p className="text-gray-500 mt-1">ID: #{asistencia.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/asistencias/${asistencia.id}/editar`}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            ✏️ Editar
          </Link>
          <button
            onClick={() => setDeleteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            🗑 Eliminar
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-indigo-600">{asistencia.userId.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{asistencia.userId}</p>
                <p className="text-sm text-gray-500">ID de Usuario</p>
              </div>
            </div>
            <EstadoBadge estado={asistencia.estado} size="md" />
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Fecha</label>
              <p className="text-sm font-medium text-gray-900">
                {new Date(asistencia.fecha).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Estado</label>
              <p className="text-sm font-medium text-gray-900">
                <EstadoBadge estado={asistencia.estado} size="md" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Hora de Entrada</label>
              <p className="text-sm font-medium text-gray-900 font-mono">
                {asistencia.horaEntrada || <span className="text-gray-300">No registrada</span>}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Hora de Salida</label>
              <p className="text-sm font-medium text-gray-900 font-mono">
                {asistencia.horaSalida || <span className="text-gray-300">No registrada</span>}
              </p>
            </div>
          </div>

          {asistencia.observaciones && (
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Observaciones</label>
              <p className="text-sm text-gray-900">{asistencia.observaciones}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Creado</label>
              <p className="text-sm text-gray-600">
                {new Date(asistencia.createdAt).toLocaleString('es-ES')}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Última actualización</label>
              <p className="text-sm text-gray-600">
                {new Date(asistencia.updatedAt).toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <Link
            to="/"
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Volver
          </Link>
        </div>
      </div>

      <Modal
        isOpen={deleteModal}
        title="Eliminar Asistencia"
        message="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
        loading={deleting}
      />
    </div>
  );
}
