import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AsistenciaForm from '../components/AsistenciaForm';
import { showToast } from '../components/Toast';
import { Asistencia, AsistenciaUpdate } from '../types/asistencia';
import * as asistenciaService from '../services/asistenciaService';

export default function EditarAsistenciaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asistencia, setAsistencia] = useState<Asistencia | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAsistencia = async () => {
      try {
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

  const handleSubmit = async (data: AsistenciaUpdate) => {
    try {
      setSubmitting(true);
      setError('');
      await asistenciaService.updateAsistencia(Number(id), data);
      showToast('success', 'Asistencia actualizada correctamente');
      navigate(`/asistencias/${id}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error al actualizar la asistencia';
      setError(msg);
      showToast('error', msg);
    } finally {
      setSubmitting(false);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Editar Asistencia #{asistencia.id}</h1>
        <p className="text-gray-500 mt-1">Modifica los campos que deseas actualizar</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <AsistenciaForm
          initialData={{
            fecha: asistencia.fecha,
            horaEntrada: asistencia.horaEntrada,
            horaSalida: asistencia.horaSalida,
            estado: asistencia.estado,
            observaciones: asistencia.observaciones,
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          isEdit
          loading={submitting}
          error={error}
        />
      </div>
    </div>
  );
}
