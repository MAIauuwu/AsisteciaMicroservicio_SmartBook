import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout, getUsername } from '../services/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Inicio', icon: '🏠' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/nueva', label: 'Nueva', icon: '➕' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
              <span className="text-2xl">📘</span>
              <span>SmartBook</span>
            </Link>

            <div className="ml-8 flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-indigo-600">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
