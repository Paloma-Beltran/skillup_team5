import { Link } from "react-router-dom";

function PaginaInicio(){
    return(
        <>
            <header className="header contenedor">
                <img src="skillup-logo.png" className="header__img" alt="Logo SkillUp" />
                <div>
                    <h1 className="titulo">SkillUp</h1>
                    <p className="header__texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, perspiciatis obcaecati. Velit, autem? Ratione optio et commodi quibusdam voluptate veniam quidem? Blanditiis placeat hic unde expedita, nulla veritatis optio atque.</p>
                    <p className="header__texto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="header__botones">
                        <Link to="/ofertas" className="boton">Ofertas</Link>
                        <Link to="/cursos" className="boton">Cursos</Link>
                    </div>
                </div>
            </header>
            <div className="empresas">
                <div className="contenedor">
                    <h2 className="titulo">Empresas afiliadas (poner logos) - Esto es opcional</h2>
                    <div className="empresas__galeria">
                        <img src="https://picsum.photos/500" className="empresas__img" alt="Empresa 1" />
                        <img src="https://picsum.photos/501" className="empresas__img" alt="Empresa 2" />
                        <img src="https://picsum.photos/502" className="empresas__img" alt="Empresa 3" />
                        <img src="https://picsum.photos/503" className="empresas__img" alt="Empresa 4" />
                        <img src="https://picsum.photos/504" className="empresas__img" alt="Empresa 5" />
                        <img src="https://picsum.photos/505" className="empresas__img" alt="Empresa 6" />
                        <img src="https://picsum.photos/506" className="empresas__img" alt="Empresa 7" />
                        <img src="https://picsum.photos/507" className="empresas__img" alt="Empresa 8" />
                        <img src="https://picsum.photos/508" className="empresas__img" alt="Empresa 9" />
                        <img src="https://picsum.photos/509" className="empresas__img" alt="Empresa 10" />
                    </div>
                </div>
            </div>
            <div className="contenedor">
                <h2>Enlaces de ejemplo para ver el diseño de los perfiles</h2>
                <Link to="/usuario/1">Usuario 1</Link><br />
                <Link to="/empresa/2">Empresa 2</Link>
            </div>
        </>
    )
}

export default PaginaInicio;