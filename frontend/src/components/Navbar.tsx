import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              SmartBook - Asistencia
            </Link>
            <div className="ml-10 flex space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Inicio
              </Link>
              <Link to="/nueva" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Nueva Asistencia
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Cerrar SesiÃ³n
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
