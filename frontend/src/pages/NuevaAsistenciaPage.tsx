import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AsistenciaForm from '../components/AsistenciaForm';
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
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la asistencia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nueva Asistencia</h1>

      <div className="bg-white shadow-sm rounded-lg border p-6">
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
