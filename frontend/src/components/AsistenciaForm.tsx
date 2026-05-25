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

export default function AsistenciaForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
  loading = false,
  error,
}: AsistenciaFormProps) {
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [fecha, setFecha] = useState(initialData?.fecha || new Date().toISOString().split('T')[0]);
  const [horaEntrada, setHoraEntrada] = useState(initialData?.horaEntrada || '');
  const [horaSalida, setHoraSalida] = useState(initialData?.horaSalida || '');
  const [estado, setEstado] = useState<EstadoAsistencia>((initialData?.estado as EstadoAsistencia) || 'PRESENTE');
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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <span>⚠</span>
          <span className="text-sm">{error}</span>
        </div>
      )}

      {!isEdit && (
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            ID del Usuario <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            maxLength={50}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-4 py-2.5"
            placeholder="Ej: USER001"
          />
        </div>
      )}

      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-4 py-2.5"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="horaEntrada" className="block text-sm font-medium text-gray-700 mb-1">
            Hora de Entrada
          </label>
          <input
            type="time"
            id="horaEntrada"
            value={horaEntrada}
            onChange={(e) => setHoraEntrada(e.target.value)}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-4 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="horaSalida" className="block text-sm font-medium text-gray-700 mb-1">
            Hora de Salida
          </label>
          <input
            type="time"
            id="horaSalida"
            value={horaSalida}
            onChange={(e) => setHoraSalida(e.target.value)}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-4 py-2.5"
          />
        </div>
      </div>

      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
          Estado <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {ESTADOS.map((e) => (
            <button
              key={e.value}
              type="button"
              onClick={() => setEstado(e.value)}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                estado === e.value
                  ? `${e.bgColor} ${e.color} border-current`
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="mr-1">{e.icon}</span>
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          id="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          maxLength={500}
          rows={3}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-4 py-2.5 resize-none"
          placeholder="Notas adicionales..."
        />
        <p className="mt-1 text-xs text-gray-400">{observaciones.length}/500 caracteres</p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Guardando...
            </span>
          ) : isEdit ? (
            'Actualizar'
          ) : (
            'Crear Asistencia'
          )}
        </button>
      </div>
    </form>
  );
}
