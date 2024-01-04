import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Reemplaza con la configuración de tu proyecto Firebase
let firebaseConfig = {
apiKey: "AIzaSyAAHtOpvEcvXXkY0X60cBp4I8rVb2JBY7w",
authDomain: "feeling-air.firebaseapp.com",
projectId: "feeling-air",
storageBucket: "feeling-air.appspot.com",
messagingSenderId: "285909630284",
appId: "1:285909630284:web:2cb51913351f61c091e3e9",
measurementId: "G-CZ77D49ECS"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

//Funcion para crear la coleccion en Firebase
export function getContactData(data) {
    let db = firebase.firestore();
    db.collection("contacts").add({
    name: data.contactName,
    email: data.contactEmail,
    phone: data.contactPhone,
    message: data.contactMessage
    })
    .then(function(docRef) {
        console.log("Documento agregado con ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error al agregar el documento: ", error);
    });
};
//Funcion para crear la coleccion Quote en Firebase
export function getQuoteData(data) {
    let db = firebase.firestore();
    db.collection("quote").add({
    origin: data.origin,
    destination: data.destination,
    date: data.date,
    pax: data.pax, 
    name: data.name,
    mail: data.mail,
    phone: data.phone
    })
    .then(function(docRef) {
        console.log("Documento agregado con ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error al agregar el documento: ", error);
    });
};