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
export async function crearOferta(data){
    let fecha = Date.now().toString();
    // Se crea un documento y se le agrega como id la fecha
    let docRef = doc(db, "ofertas", fecha);
    // Se agrega ese documento con la información que se pasa como parámetro
    await setDoc(docRef, {...data, fecha});
    console.log("Documento guardado", docRef);

    return docRef;
}

export async function obtenerOfertas(){
    // Se crea la query ordenando los datos por fecha
    let q = query(collection(db, "ofertas"), orderBy("fecha"));
    // Se piden los datos
    let res = await getDocs(q);
    // Se recorren las ofertas y se guardan en un arreglo con objetos que contienen la id y la información
    let ofertas = res.docs.map(doc => {
        return {id: doc.id, data: doc.data()}
    });
    // console.log(ofertas);
    
    return ofertas;
}