import { useState, useEffect } from "react";

function FiltroPublicaciones({ publicaciones, setFiltradas }){
    let [filtros, setFiltros] = useState({
        busqueda: "",
        activas: false
    });

    // Al cambiar las publicaciones o la búsqueda, filtra las publicaciones
    useEffect(() => {
        setFiltradas(publicaciones.filter(filtrarPublicaciones));
    }, [publicaciones, filtros]);

    const handleChange = e => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    }

    const handleCheck = e => {
        setFiltros({ ...filtros, [e.target.name]: e.target.checked });
    }

    const filtrarPublicaciones = (oferta) => {
        // Obtenemos cada palabra de los titulos y de lo buscado
        let palabras = oferta.data.titulo.toLowerCase().split(/\s+/);
        let buscado = filtros.busqueda.toLowerCase().split(/\s+/);
        let soloActivas = filtros.activas ? oferta.data.estado : true;

        // Si todas las palabras buscadas tienen algo en común con alguna de las de los titulos,
        // se muestra la publicación
        return buscado.every(palabraB => {
            if(!palabraB) return true;

            return palabras.some(palabra => palabra.includes(palabraB));
        }) && soloActivas;
    }

    return(
        <div className="filtros">
            <div className="filtros__filtro filtros__filtro--busqueda">
                <label htmlFor="buscar">Filtrar por titulo</label>
                <input
                    type="text"
                    id="buscar"
                    name="busqueda"
                    value={filtros.busqueda}
                    onChange={handleChange}
                />
            </div>

            <div className="filtros__filtro filtros__filtro--activas">
                <label htmlFor="activas">Solo activas</label>
                <input
                    type="checkbox"
                    id="activas"
                    name="activas"
                    className="switch"
                    checked={filtros.activas}
                    onChange={handleCheck}
                />
            </div>
        </div>
    )
}

export default FiltroPublicaciones;