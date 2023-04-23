import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTitle } from "../hooks/useTitle";
import { actualizarPublicacion, obtenerPublicacion } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { formatoDinero, formatoEtiquetas } from "../utils/formatos";

import toast from 'react-hot-toast';

function FormEditarPublicacion(){
    useTitle("Editar publicación | SkillUp");

    const navigate = useNavigate();

    let { tipo:tipoPublicacion, id:idPublicacion } = useParams();

    const { usuario } = useAuth(); // Para verificar el uid de la empresa
    let [publicacion, setPublicacion] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            if(usuario && usuario.verificada){
                let { datos } = await obtenerPublicacion(idPublicacion, tipoPublicacion);
                setPublicacion(datos);
            }
        }
        obtenerDatos();
    }, [usuario])

    const handleSubmit = e => {
        e.preventDefault();

        // Se procesan los datos que tengan que ser procesados
        let datosPublicacion = {
            ...publicacion,
            dinero: formatoDinero(publicacion.dinero),
            etiquetas: typeof publicacion.etiquetas == "string" ? formatoEtiquetas(publicacion.etiquetas) : publicacion.etiquetas
        }

        // Se actualiza la publicación
        actualizarPublicacion(datosPublicacion, tipoPublicacion, idPublicacion);
        if(tipoPublicacion == "oferta") toast.success("Oferta actualizada");
        else if(tipoPublicacion == "curso") toast.success("Curso actualizado");

        navigate("/");
    }

    const handleInput = e => {
        setPublicacion({...publicacion, [e.target.name]: e.target.value});
    }

    if(!publicacion) return <h2 className="contenedor titulo">Cargando...</h2>

    return(
        <div className="contenedor">
            <h1 className="titulo">Editar publicación</h1>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        name="titulo"
                        id="titulo"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.titulo}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        className="form__input"
                        cols="30"
                        rows="10"
                        onInput={handleInput}
                        value={publicacion.descripcion}
                        required>
                    </textarea>
                </div>

                <div className="form__apartado">
                    <label htmlFor="dinero">Sueldo o costo</label>
                    <input
                        name="dinero"
                        input="dinero"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.dinero}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="duracion">Duración</label>
                    <input
                        name="duracion"
                        id="duracion"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.duracion}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="dirigido">Dirigido a</label>
                    <input
                        name="dirigido"
                        id="dirigido"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.dirigido}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="modalidad">Modalidad</label>
                    <select
                        name="modalidad"
                        id="modalidad"
                        className="form__input"
                        onInput={handleInput}
                        value={publicacion.modalidad}
                        required
                    >
                        <option value="">Elige una opción</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Mixta">Mixta</option>
                    </select>
                </div>

                <div className="form__apartado">
                    <label htmlFor="etiquetas">Etiquetas (Separar con ",")</label>
                    <input
                        name="etiquetas"
                        id="etiquetas"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.etiquetas}
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Editar" />
            </form>
        </div>
    )
}

export default FormEditarPublicacion;