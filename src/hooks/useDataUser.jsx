import { useState, useEffect } from 'react';
import { obtenerUsuario } from "../firebase";

function useDataUser(uid){
    const [cargando, setCargando] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState(null);

    useEffect(() => {
        setCargando(true);

        const obtenerPerfilUsuario = async () => {
            let datos = await obtenerUsuario(uid);
            setDatosUsuario(datos);
            setCargando(false);
        }
        obtenerPerfilUsuario();
    }, [uid]); // Cada que cambie el uid del parametro, se actualizan los datos

    return { cargando, datosUsuario };
}

export { useDataUser };