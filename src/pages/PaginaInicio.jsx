import { Link } from "react-router-dom";

function PaginaInicio(){
    return(
        <>
            <header className="header contenedor">
                <img src="skillup-logo.png" className="header__img" alt="Logo SkillUp" />
                <div>
                    <h1 className="titulo">SkillUp</h1>
                    <p className="header__texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, perspiciatis obcaecati. Velit, autem? Ratione optio et commodi quibusdam voluptate veniam quidem? Blanditiis placeat hic unde expedita, nulla veritatis optio atque.</p>
                    <p className="header__texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum maxime veniam non eveniet, unde excepturi, mollitia rem nihil maiores provident repellat consequuntur placeat atque minus, tempora autem voluptate. Aliquid, eos?</p>
                    <div className="header__botones">
                        <Link to="/ofertas" class="boton">Ofertas</Link>
                        <Link to="/cursos" class="boton">Cursos</Link>
                    </div>
                </div>
            </header>
            <div className="contenedor">
                <p>Poner información de la pagina</p>
                <p>Poner recomendaciones de ofertas y cursos</p>
                <Link to="/usuario/1">Ejemplo perfil usuario</Link><br />
                <Link to="/empresa/2">Ejemplo perfil empresa</Link>
            </div>
        </>
    )
}

export default PaginaInicio;