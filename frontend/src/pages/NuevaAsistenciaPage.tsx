import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AsistenciaForm from '../components/AsistenciaForm';
import { showToast } from '../components/Toast';
import { AsistenciaRequest } from '../types/asistencia';
import * as asistenciaService from '../services/asistenciaService';

export default function NuevaAsistenciaPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: AsistenciaRequest) => {
    try {
      setLoading(true);
      setError('');
      await asistenciaService.createAsistencia(data);
      showToast('success', 'Asistencia creada correctamente');
      navigate('/');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error al crear la asistencia';
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nueva Asistencia</h1>
        <p className="text-gray-500 mt-1">Completa el formulario para registrar una nueva asistencia</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <AsistenciaForm
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
