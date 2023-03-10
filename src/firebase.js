// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, orderBy, query } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//! Funciones firebase
async function crearDocumento(coleccion, data){
    let fecha = Date.now().toString();
    // Se crea un documento y se le agrega como id la fecha
    let docRef = doc(db, coleccion, fecha);
    // Se agrega ese documento con la información que se pasa como parámetro
    await setDoc(docRef, {...data, fecha});
}

async function obtenerDocumentos(coleccion){
    // Se crea la query ordenando los datos por fecha
    let q = query(collection(db, coleccion), orderBy("fecha"));
    // Se piden los datos
    let res = await getDocs(q);
    // Se recorren las documentos y se guardan en un arreglo con objetos que contienen la id y la información
    let documentos = res.docs.map(doc => {
        return {id: doc.id, data: doc.data()}
    });
    
    return documentos;
}

export function crearOferta(data){
    console.log("Oferta creada");

    return crearDocumento("ofertas", data);
}

export function crearCurso(data){
    console.log("Curso creado");

    return crearDocumento("cursos", data);
}

export async function obtenerOfertas(){
    console.log("Obteniendo ofertas");

    return obtenerDocumentos("ofertas");
}

export async function obtenerCursos(){
    console.log("Obteniendo cursos");

    return obtenerDocumentos("cursos");
}