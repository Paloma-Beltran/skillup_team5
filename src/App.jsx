import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

import PaginaInicio from './pages/PaginaInicio';
import PaginaOfertas from './pages/PaginaOfertas';
import PaginaCursos from './pages/PaginaCursos';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaInicioSesion from './pages/PaginaInicioSesion';
import PaginaUsuario from './pages/PaginaUsuario';
import PaginaEmpresa from './pages/PaginaEmpresa';
import FormPublicacion from './pages/FormPublicacion';

import { Toaster } from 'react-hot-toast';

function App() {
  //! Crear un componente para suscribirse al evento onSnapshot y compartir los datos con el contexto (opcional)
  //! También se pueden obtener los datos solo al renderizar el componente donde se utilicen
  return (
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
          <Route path="/usuario/:id" element={<PaginaUsuario />} />
          <Route path="/empresa/:id" element={<PaginaEmpresa />} />
          <Route path="/publicar" element={<FormPublicacion />} />
        </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default App;