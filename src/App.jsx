import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import AuthProtectedRoute from './components/AuthProtectedRoute';

import AuthProvider from './context/AuthContext';

import PaginaInicio from './pages/PaginaInicio';
import PaginaOfertas from './pages/PaginaOfertas';
import PaginaCursos from './pages/PaginaCursos';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaInicioSesion from './pages/PaginaInicioSesion';
import PaginaUsuario from './pages/PaginaUsuario';
import PaginaEmpresa from './pages/PaginaEmpresa';
import FormPublicacion from './pages/FormPublicacion';
import FormEditarPerfil from './pages/FormEditarPerfil';

import { Toaster } from 'react-hot-toast';
import FormEditarPublicacion from './pages/FormEditarPublicacion';

function App() {
  //! Crear un componente para suscribirse al evento onSnapshot y compartir los datos con el contexto (opcional)
  //! También se pueden obtener los datos solo al renderizar el componente donde se utilicen
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/ofertas" element={<PaginaOfertas />} />
            <Route path="/cursos" element={<PaginaCursos />} />
            <Route path="/registro" element={<PaginaRegistro />} />
            <Route path="/inicio-sesion" element={<PaginaInicioSesion />} />
            <Route path="/editar-perfil" element={
              <AuthProtectedRoute>
                <FormEditarPerfil />
              </AuthProtectedRoute>
            } />
            <Route path="/usuario/:id" element={
              <AuthProtectedRoute>
                <PaginaUsuario />
              </AuthProtectedRoute>
            } />
            <Route path="/empresa/:id" element={<PaginaEmpresa />} />
            <Route path="/publicar" element={
              <AuthProtectedRoute soloEmpresas>
                <FormPublicacion />
              </AuthProtectedRoute>
            } />
            <Route path="/editar-publicacion/:tipo/:id" element={
              <AuthProtectedRoute soloEmpresas>
                <FormEditarPublicacion />
              </AuthProtectedRoute>
            } />
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </AuthProvider>
  )
}

export default App;