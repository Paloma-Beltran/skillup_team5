import { useParams } from "react-router-dom";

function PaginaUsuario(){
    // let { id } = useParams();

    return(
        <div className="usuario contenedor">
            <div className="usuario__datos">
                <img src="https://i.pravatar.cc/100" className="usuario__img" alt="Foto de perfil del usuario" />
                <div className="usuario__informacion">
                    <h2 className="usuario__nombre">Fernando Manuel De Alba Orozco</h2>
                    <p className="usuario__carrera">Ingeniería Informática</p>
                    <p className="usuario__centro">CUCEI</p>
                </div>
            </div>
            <div className="usuario__textos">
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Descripción</h2>
                    <p className="usuario__parrafo">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, voluptate velit iste et aut sapiente animi. Id rem repellat natus minima reprehenderit! Et magni praesentium velit necessitatibus, ea alias laboriosam?</p>
                </div>
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Habilidades</h2>
                    <p className="usuario__parrafo">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, voluptate velit iste et aut sapiente animi. Id rem repellat natus minima reprehenderit! Et magni praesentium velit necessitatibus, ea alias laboriosam?</p>
                    <p className="usuario__parrafo">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, voluptate velit iste et aut sapiente animi. Id rem repellat natus minima reprehenderit! Et magni praesentium velit necessitatibus, ea alias laboriosam?</p>
                    <p className="usuario__parrafo">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, voluptate velit iste et aut sapiente animi. Id rem repellat natus minima reprehenderit! Et magni praesentium velit necessitatibus, ea alias laboriosam?</p>
                    <p className="usuario__parrafo">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, voluptate velit iste et aut sapiente animi. Id rem repellat natus minima reprehenderit! Et magni praesentium velit necessitatibus, ea alias laboriosam?</p>
                </div>
            </div>
        </div>
    )
}

export default PaginaUsuario;