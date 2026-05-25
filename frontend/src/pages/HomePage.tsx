import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AsistenciaTable from '../components/AsistenciaTable';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { showToast } from '../components/Toast';
import { Asistencia, AsistenciaFilters, PageResponse } from '../types/asistencia';
import * as asistenciaService from '../services/asistenciaService';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [pageData, setPageData] = useState<PageResponse<Asistencia> | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(20);
  const [filters, setFilters] = useState<AsistenciaFilters>({});
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  const userIdParam = searchParams.get('userId');

  const fetchAsistencias = useCallback(async () => {
    try {
      setLoading(true);
      const activeFilters = { ...filters };
      if (userIdParam) activeFilters.userId = userIdParam;
      const data = await asistenciaService.getFilteredAsistencias(activeFilters, currentPage, pageSize);
      setPageData(data);
    } catch {
      showToast('error', 'Error al cargar las asistencias');
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, pageSize, userIdParam]);

  useEffect(() => {
    fetchAsistencias();
  }, [fetchAsistencias]);

  useEffect(() => {
    if (userIdParam) {
      setFilters((prev) => ({ ...prev, userId: userIdParam }));
      setCurrentPage(0);
    }
  }, [userIdParam]);

  const handleDeleteClick = (id: number) => {
    setDeleteModal({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;

    try {
      setDeleting(true);
      await asistenciaService.deleteAsistencia(deleteModal.id);
      showToast('success', 'Asistencia eliminada correctamente');
      fetchAsistencias();
    } catch {
      showToast('error', 'Error al eliminar la asistencia');
    } finally {
      setDeleting(false);
      setDeleteModal({ open: false, id: null });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: AsistenciaFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchAsistencias();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registros de Asistencia</h1>
          <p className="text-gray-500 mt-1">
            {pageData ? `${pageData.totalElements} registro${pageData.totalElements !== 1 ? 's' : ''} encontrado${pageData.totalElements !== 1 ? 's' : ''}` : 'Cargando...'}
          </p>
        </div>
        <Link
          to="/nueva"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span>➕</span>
          Nueva Asistencia
        </Link>
      </div>

      <div className="mb-6">
        <SearchBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <AsistenciaTable
          asistencias={pageData?.content || []}
          onDelete={handleDeleteClick}
          loading={loading}
        />
        {pageData && pageData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pageData.totalPages}
            totalElements={pageData.totalElements}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <Modal
        isOpen={deleteModal.open}
        title="Eliminar Asistencia"
        message="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        loading={deleting}
      />
    </div>
  );
}
