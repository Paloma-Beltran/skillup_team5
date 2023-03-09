import { useRef, useState } from "react";
import { crearOferta } from "../firebase";

function FormPublicacion(){
    let form = useRef();
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
        if(tipo == "Oferta"){
            //! La fecha se agrega automáticamente
            crearOferta(publicacion);
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
            <h1 className="titulo">Crear publicación</h1>
            <form className="publicar" onSubmit={handleSubmit} ref={form}>
                <div>
                    <label htmlFor="tipo">Tipo de publicación</label>
                    <select name="tipo"
                            id="tipo"
                            onInput={handleInput}
                            value={tipo}
                            required>
                        <option value="">Elige una opción</option>
                        <option value="Oferta">Oferta</option>
                        <option value="Curso">Curso</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="titulo">Titulo</label>
                    <input name="titulo"
                            id="titulo"
                            type="text"
                            onInput={handleInput}
                            value={publicacion.titulo}
                            required />
                </div>

                <div>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea name="descripcion"
                            id="descripcion"
                            cols="30"
                            rows="10"
                            onInput={handleInput}
                            value={publicacion.descripcion}
                            required></textarea>
                </div>

                <div>
                    <label htmlFor="dinero">Sueldo o costo</label>
                    <input name="dinero"
                            input="dinero"
                            type="text"
                            onInput={handleInput}
                            value={publicacion.dinero}
                            required />
                </div>

                <div>
                    <label htmlFor="duracion">Duración</label>
                    <input name="duracion"
                            id="duracion"
                            type="text"
                            onInput={handleInput}
                            value={publicacion.duracion}
                            required />
                </div>

                <div>
                    <label htmlFor="dirigido">Dirigido a</label>
                    <input name="dirigido"
                            id="dirigido"
                            type="text"
                            onInput={handleInput}
                            value={publicacion.dirigido}
                            required />
                </div>

                <div>
                    <label htmlFor="modalidad">Modalidad</label>
                    <select name="modalidad"
                            id="modalidad"
                            onInput={handleInput}
                            value={publicacion.modalidad}
                            required>
                        <option value="">Elige una opción</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Mixta">Mixta</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="etiquetas">Separar con ","</label>
                    <input name="etiquetas"
                            id="etiquetas"
                            type="text"
                            onInput={handleInput}
                            value={publicacion.etiquetas} />
                </div>

                <input type="submit" className="boton" value="Publicar" />
            </form>
        </div>
    )
}

export default FormPublicacion;