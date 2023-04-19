// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, orderBy, query, getDoc, where, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage, uploadBytes, getDownloadURL, ref, deleteObject } from "firebase/storage";

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

//! FUNCIONES FIRESTORE
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
    // console.log("Oferta creada");

    return crearDocumento("ofertas", data);
}

export function crearCurso(data){
    // console.log("Curso creado");

    return crearDocumento("cursos", data);
}

export async function obtenerOfertas(){
    // console.log("Obteniendo ofertas");

    return obtenerDocumentos("ofertas");
}

export async function obtenerCursos(){
    // console.log("Obteniendo cursos");

    return obtenerDocumentos("cursos");
}

export async function obtenerOfertasEmpresa(id){
    let q = query(collection(db, "ofertas"), where("idEmpresa", "==", id));
    let res = await getDocs(q);

    return res.docs;
}

export async function obtenerCursosEmpresa(id){
    let q = query(collection(db, "cursos"), where("idEmpresa", "==", id));
    let res = await getDocs(q);

    return res.docs;
}

// Obtiene una publicación en específico
export async function obtenerPublicacion(docId, tipo){
    let docRef;
    // Se obtiene la publicacion dependiendo del tipo
    if(tipo == "oferta") docRef = doc(db, "ofertas", docId);
    else if(tipo == "curso") docRef = doc(db, "cursos", docId);

    let documento = await getDoc(docRef);
    
    // Obtener el documento
    return { id: documento.id, datos: documento.data() }
}

// Obtiene un usuario en específico (con cualquier rol)
export async function obtenerUsuario(uid){
    let docRef = doc(db, "usuarios", uid);
    let documento = await getDoc(docRef);
    let data = documento.data();

    // Se pone la imagen que ya existe en storage guardada en la db o se pone una la imagen por defecto
    let imgUrl = data.imgUrl || `https://ui-avatars.com/api/?name=${encodeURI(data.nombre)}&background=555&color=fff&uppercase=true`;

    return { ...data, imgUrl };
}

// Obtiene todas las empresas
export async function obtenerEmpresas(){
    let q = query(collection(db, "usuarios"), where("rol", "==", "empresa"));
    // Por cada documento se obtienen los datos
    let res = (await getDocs(q)).docs.map(doc => doc.data());

    // Por cada documento, se obtiene la imagen de storage guardada en la db o la imagen por defecto
    let docs = res.map(async doc => {
        let imgUrl = doc.imgUrl || `https://ui-avatars.com/api/?name=${encodeURI(doc.nombre)}&background=555&color=fff&uppercase=true`;
        
        return { ...doc, imgUrl };
    });

    // Se espera a que terminen las promesas
    docs = await Promise.all(docs);
    
    return docs;
}

// Activa o desactiva publicaciones
export function cambiarEstadoPublicacion(id, nuevoEstado, tipo){
    let docRef;
    if(tipo == "oferta") docRef = doc(db, "ofertas", id);
    else if(tipo == "curso") docRef = doc(db, "cursos", id);

    return updateDoc(docRef, { estado: nuevoEstado });
}

export async function cambiarInteresUsuario(docId, uid, interesado, tipo){
    let docRef;
    // Se obtiene la publicacion dependiendo del tipo
    if(tipo == "oferta") docRef = doc(db, "ofertas", docId);
    else if(tipo == "curso") docRef = doc(db, "cursos", docId);
    
    // Obtener el documento de la publicación
    let documento = (await getDoc(docRef)).data();

    if(interesado){
        // Si ya existe en el arreglo, no se agrega
        if(!documento.interesados.includes(uid)){
            await updateDoc(docRef, { interesados: [...documento.interesados, uid] });
        }
        // Si no hay interesados, solo se agrega el actual
        else await updateDoc(docRef, { interesados: [uid] });
    } else {
        // Si ya no está interesado y existe en el arreglo, se quita
        let interesadosFiltrados = documento.interesados.filter(id => id != uid);
        await updateDoc(docRef, { interesados: interesadosFiltrados });
    }
}

export async function cambiarVerificacionEmpresa(idEmpresa, verificada){
    let docRef = doc(db, "usuarios", idEmpresa);

    await updateDoc(docRef, { verificada });
}

//! FUNCIONES STORAGE
export async function subirFotoPerfil(file, idUsuario){
    const storageRef = ref(storage, `fotos-perfil/perfil-${idUsuario}`);

    let imgData = await uploadBytes(storageRef, file);    
    let imgUrl = await obtenerFotoPerfil(idUsuario);

    return { imgData, imgUrl };
}

export async function obtenerFotoPerfil(idUsuario){
    const storageRef = ref(storage, `fotos-perfil/perfil-${idUsuario}`);

    try{
        return await getDownloadURL(storageRef);
    } catch(err){
        // console.log({err});
        return "";
    }
}

export async function borrarFotoPerfil(idUsuario){
    const storageRef = ref(storage, `fotos-perfil/perfil-${idUsuario}`);

    await deleteObject(storageRef);
}