export function formatoDinero(cadena){
    // "$1578$$ " -> 1578
    // Al dinero le quitamos los caracteres no permitidos
    return cadena.replace(/[^\d.,]/g, "") || "0";
}

export function formatoEtiquetas(cadena){
    // "REACT, HTML,     FIREBASE,CSS" -> ['REACT', 'HTML', 'FIREBASE', 'CSS']
    // A cada etiqueta se le quitan los espacios
    return cadena.split(",").map(etiqueta => etiqueta.trim());
}