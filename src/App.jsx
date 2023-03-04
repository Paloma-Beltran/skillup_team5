import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import PaginaInicio from './pages/PaginaInicio';
import PaginaOfertas from './pages/PaginaOfertas';
import PaginaCursos from './pages/PaginaCursos';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaInicioSesion from './pages/PaginaInicioSesion';
import PaginaUsuario from './pages/PaginaUsuario';
import PaginaEmpresa from './pages/PaginaEmpresa';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/ofertas" element={<PaginaOfertas />} />
        <Route path="/cursos" element={<PaginaCursos />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/inicio-sesion" element={<PaginaInicioSesion />} />
        <Route path="/usuario/:id" element={<PaginaUsuario />} />
        <Route path="/empresa/:id" element={<PaginaEmpresa />} />
      </Routes>
    </Router>
  )
}

export default App;