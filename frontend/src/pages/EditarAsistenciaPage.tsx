import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AsistenciaForm from '../components/AsistenciaForm';
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
      navigate(`/asistencias/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar la asistencia');
    } finally {
      setSubmitting(false);
    }
  };

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
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Asistencia #{asistencia.id}</h1>

      <div className="bg-white shadow-sm rounded-lg border p-6">
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
