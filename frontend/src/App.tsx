import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NuevaAsistenciaPage from './pages/NuevaAsistenciaPage';
import VerAsistenciaPage from './pages/VerAsistenciaPage';
import EditarAsistenciaPage from './pages/EditarAsistenciaPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <HomePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/nueva"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NuevaAsistenciaPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/asistencias/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <VerAsistenciaPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/asistencias/:id/editar"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EditarAsistenciaPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
