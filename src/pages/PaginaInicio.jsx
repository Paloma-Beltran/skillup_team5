import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

import { obtenerEmpresas } from "../firebase";

function PaginaInicio(){
    useTitle("Inicio | SkillUp");

    const [empresas, setEmpresas] = useState();

    useEffect(() => {
        // Obtenemos todas las empresas para mostrarlas en la página de inicio
        obtenerEmpresas()
        .then(docs => {
            setEmpresas(docs);
        });
    }, [])

    return(
        <>
            <header className="header contenedor">
                <img src="skillup-logo.png" className="header__img" alt="Logo SkillUp" />
                <div>
                    <h1 className="titulo header__titulo">SkillUp</h1>
                    <div className="header__parrafos">
                        <p className="header__parrafo">SkillUp es una plataforma que permite a los estudiantes y recién egresados de instituciones universitarias en el país encontrar oportunidades, así como mejorar su red de contactos con el fin de generar o mejorar una carrera profesional y facilitar su inserción en el mercado laboral.</p>
                        <p className="header__parrafo">Con esto buscamos poner las oportunidades existentes al alcance de todo aquel que las requiera y que por diversas razones no llegan al conocimiento general.</p>
                    </div>
                    <div className="header__botones">
                        <Link to="/ofertas" className="boton">Ofertas</Link>
                        <Link to="/cursos" className="boton">Cursos</Link>
                    </div>
                </div>
            </header>
            <div className="empresas">
                <div className="contenedor">
                    <h2 className="titulo">Empresas afiliadas</h2>
                    <div className="empresas__lista">
                        {
                            empresas && empresas.map(empresa => (
                                <div className="empresas__empresa" key={empresa.id}>
                                    <img src={empresa.imgUrl} className="empresas__img" alt={`Foto de perfil de la empresa ${empresa.nombre}`} />
                                    <Link to={`/empresa/${empresa.id}`} className="empresas__link">
                                        {empresa.nombre}
                                        {
                                            // Se ponen los iconos si la empresa está verificada
                                            empresa.verificada && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="usuario__verificacion icon icon-tabler icon-tabler-discount-check" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#000" fill="#0af" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                                                    <path d="M9 12l2 2l4 -4"></path>
                                                </svg>
                                            )
                                        }
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaginaInicio;