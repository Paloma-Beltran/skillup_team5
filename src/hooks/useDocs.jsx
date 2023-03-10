import { useState, useEffect } from 'react';

function useDocs(callback){
    let [cargando, setCargando] = useState(true);
    let [documentos, setDocumentos] = useState([]);

    useEffect(() => {
        setCargando(true);

        const guardarDocumentos = async () => {
            let docs = await callback();
            setDocumentos(docs);
            setCargando(false);
        }
        guardarDocumentos();
    }, [])

    return { cargando, documentos };
}

export { useDocs };