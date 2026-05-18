import { useState } from 'react';
import { AsistenciaRequest, AsistenciaUpdate, ESTADOS, EstadoAsistencia } from '../types/asistencia';

interface AsistenciaFormProps {
  initialData?: AsistenciaRequest | AsistenciaUpdate;
  onSubmit: (data: AsistenciaRequest | AsistenciaUpdate) => void;
  onCancel: () => void;
  isEdit?: boolean;
  loading?: boolean;
  error?: string;
}

export default function AsistenciaForm({ initialData, onSubmit, onCancel, isEdit = false, loading = false, error }: AsistenciaFormProps) {
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [fecha, setFecha] = useState(initialData?.fecha || new Date().toISOString().split('T')[0]);
  const [horaEntrada, setHoraEntrada] = useState(initialData?.horaEntrada || '');
  const [horaSalida, setHoraSalida] = useState(initialData?.horaSalida || '');
  const [estado, setEstado] = useState<EstadoAsistencia>(initialData?.estado as EstadoAsistencia || 'PRESENTE');
  const [observaciones, setObservaciones] = useState(initialData?.observaciones || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...(isEdit ? {} : { userId }),
      fecha,
      horaEntrada: horaEntrada || undefined,
      horaSalida: horaSalida || undefined,
      estado,
      observaciones: observaciones || undefined,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {!isEdit && (
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            ID del Usuario *
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            maxLength={50}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
            placeholder="Ej: USER001"
          />
        </div>
      )}

      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
          Fecha *
        </label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="horaEntrada" className="block text-sm font-medium text-gray-700">
            Hora de Entrada
          </label>
          <input
            type="time"
            id="horaEntrada"
            value={horaEntrada}
            onChange={(e) => setHoraEntrada(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="horaSalida" className="block text-sm font-medium text-gray-700">
            Hora de Salida
          </label>
          <input
            type="time"
            id="horaSalida"
            value={horaSalida}
            onChange={(e) => setHoraSalida(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
          Estado *
        </label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value as EstadoAsistencia)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
        >
          {ESTADOS.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
          Observaciones
        </label>
        <textarea
          id="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          maxLength={500}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
          placeholder="Notas adicionales..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
