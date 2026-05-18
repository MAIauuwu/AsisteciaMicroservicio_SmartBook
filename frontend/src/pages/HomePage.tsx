import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AsistenciaTable from '../components/AsistenciaTable';
import Modal from '../components/Modal';
import { Asistencia } from '../types/asistencia';
import * as asistenciaService from '../services/asistenciaService';

export default function HomePage() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchAsistencias = async () => {
    try {
      setLoading(true);
      const data = await asistenciaService.getAsistencias();
      setAsistencias(data);
    } catch {
      setError('Error al cargar las asistencias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteModal({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;

    try {
      setDeleting(true);
      await asistenciaService.deleteAsistencia(deleteModal.id);
      setAsistencias(asistencias.filter(a => a.id !== deleteModal.id));
    } catch {
      setError('Error al eliminar la asistencia');
    } finally {
      setDeleting(false);
      setDeleteModal({ open: false, id: null });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Registros de Asistencia</h1>
        <Link
          to="/nueva"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          + Nueva Asistencia
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
          <button onClick={() => setError('')} className="ml-2 text-red-500 hover:text-red-700">Ã—</button>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg border">
        <AsistenciaTable
          asistencias={asistencias}
          onDelete={handleDeleteClick}
          loading={loading}
        />
      </div>

      <Modal
        isOpen={deleteModal.open}
        title="Eliminar Asistencia"
        message="Â¿EstÃ¡s seguro de que deseas eliminar este registro? Esta acciÃ³n no se puede deshacer."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        loading={deleting}
      />
    </div>
  );
}
