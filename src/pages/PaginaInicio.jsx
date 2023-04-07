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
            let docsEmpresas = docs.map(doc => doc.data())
            setEmpresas(docsEmpresas);
        });
    }, [])

    return(
        <>
            <header className="header contenedor">
                <img src="skillup-logo.png" className="header__img" alt="Logo SkillUp" />
                <div>
                    <h1 className="titulo">SkillUp</h1>
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
                                    <img src={`https://ui-avatars.com/api/?name=${empresa.nombre}&background=555&color=fff&uppercase=true`} className="empresas__img" alt={`Empresa ${empresa.nombre}`} />
                                    <Link to={`/empresa/${empresa.id}`} className="empresas__link">{empresa.nombre}</Link>
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