import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { crearCurso, crearOferta } from "../firebase";

function FormPublicacion(){
    let [tipo, setTipo] = useState("");
    let [publicacion, setPublicacion] = useState({
        estado: 1,
        titulo: "",
        descripcion: "",
        dinero: "",
        duracion: "",
        dirigido: "",
        modalidad: "",
        etiquetas: []
    });

    const handleSubmit = e => {
        e.preventDefault();

        console.log(publicacion);

        // Ahora se manda a la base de datos
        //! La fecha se agrega automáticamente
        if(tipo == "Oferta"){
            crearOferta(publicacion);
            toast.success("Oferta publicada");
        } else if(tipo == "Curso"){
            crearCurso(publicacion);
            toast.success("Curso publicado");
        }

        // Limpiamos los campos y el estado
        setTipo("");
        setPublicacion({
            estado: 1,
            titulo: "",
            descripcion: "",
            dinero: "",
            duracion: "",
            dirigido: "",
            modalidad: "",
            etiquetas: []
        });
    }

    const handleInput = e => {
        if(e.target.name == "tipo"){
            setTipo(e.target.value);
            return;
        }

        if(e.target.name == "etiquetas"){
            let etiquetas = e.target.value.split(",").map(etiqueta => etiqueta.trim());
            setPublicacion({...publicacion, etiquetas})
            return;
        }

        setPublicacion({...publicacion, [e.target.name]: e.target.value});
    }

    /* 
        Tipo            select (oferta, curso)
        Titulo          input
        Estado          default 1
        Descripcion     textarea
        Sueldo          input
        Duracion        input
        Dirigido a      input
        Modalidad       select (presencial, virtual, mixta)
        Etiquetas       input (separar por ",")
    */

    return(
        <div className="contenedor">
            <Toaster />
            <h1 className="titulo">Crear publicación</h1>
            <form className="publicar" onSubmit={handleSubmit}>
                <div className="publicar__apartado">
                    <label htmlFor="tipo">Tipo de publicación</label>
                    <select
                        name="tipo"
                        id="tipo"
                        className="publicar__input"
                        onInput={handleInput}
                        value={tipo}
                        required
                    >
                        <option value="">Elige una opción</option>
                        <option value="Oferta">Oferta</option>
                        <option value="Curso">Curso</option>
                    </select>
                </div>

                <div className="publicar__apartado">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        name="titulo"
                        id="titulo"
                        className="publicar__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.titulo}
                        required
                    />
                </div>

                <div className="publicar__apartado">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        className="publicar__input"
                        cols="30"
                        rows="10"
                        onInput={handleInput}
                        value={publicacion.descripcion}
                        required>
                    </textarea>
                </div>

                <div className="publicar__apartado">
                    <label htmlFor="dinero">Sueldo o costo</label>
                    <input
                        name="dinero"
                        input="dinero"
                        className="publicar__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.dinero}
                        required
                    />
                </div>

                <div className="publicar__apartado">
                    <label htmlFor="duracion">Duración</label>
                    <input
                        name="duracion"
                        id="duracion"
                        className="publicar__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.duracion}
                        required
                    />
                </div>

                <div className="publicar__apartado">
                    <label htmlFor="dirigido">Dirigido a</label>
                    <input
                        name="dirigido"
                        id="dirigido"
                        className="publicar__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.dirigido}
                        required
                    />
                </div>

                <div className="publicar__apartado">
                    <label htmlFor="modalidad">Modalidad</label>
                    <select
                        name="modalidad"
                        id="modalidad"
                        className="publicar__input"
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

                <div className="publicar__apartado">
                    <label htmlFor="etiquetas">Separar con ","</label>
                    <input
                        name="etiquetas"
                        id="etiquetas"
                        className="publicar__input"
                        type="text"
                        onInput={handleInput}
                        value={publicacion.etiquetas}
                    />
                </div>

                <input type="submit" className="publicar__input publicar__input--boton boton" value="Publicar" />
            </form>
        </div>
    )
}

export default FormPublicacion;