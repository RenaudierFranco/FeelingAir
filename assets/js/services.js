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

    // info@feelingair.com.ar
    db.collection("mail").add({
    to: 'info@feelingair.com.ar',
        message: {
            subject: 'Mensaje de contacto',
            html: `
            Nombre de contacto: ${data.contactName}, <br>
            Email: ${data.contactEmail}, <br>
            Número de teléfono: ${data.contactPhone}, <br>
            Mensaje: ${data.contactMessage}
            `
        },
    })
    .then(function(docRef) {
        //console.log("Documento agregado con ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error al agregar el documento: ", error);
    });
    // reservations@hyh.com.ar 
    db.collection("mail").add({
    to: 'reservations@hyh.com.ar',
        message: {
            subject: 'Mensaje de contacto',
            html: `
            Nombre de contacto: ${data.contactName}, <br>
            Email: ${data.contactEmail}, <br>
            Número de teléfono: ${data.contactPhone}, <br>
            Mensaje: ${data.contactMessage}
            `
        },
    })
    // user confirmation email
    db.collection("mail").add({
    to: data.contactEmail,
        message: {
            subject: 'Message sent successfully',
            html: `
            Thank you for reaching out! We will contact you quickly. <br> <br>
            Feeling Air S.A.<br>
            +54 9 3525 45-7917<br>
            info@feelingair.com.ar<br>
            Posta de San Pedro 1315 - Sinsacate, Córdoba, Argentina <br> <br>
            <img src="https://www.feelingair.com.ar/images/logo2.png" alt="Feeling Air" width="200">
            `
        },
    })

};
//Funcion para crear la coleccion Quote en Firebase
export function getQuoteData(data) {
    let db = firebase.firestore();
    // info@feelingair.com.ar
    db.collection("mail").add({
        to: 'info@feelingair.com.ar',
        message: {
            subject: 'Solicitar cotización',
            html: `
            Solicito la contización para un vuelo con el siguiente detalle: <br>
            Nombre de contacto: ${data.name}, <br>
            Email: ${data.mail}, <br>
            Origen: ${data.origin}, <br>
            Destino: ${data.destination}, <br>
            Fecha: ${data.date}, <br>
            Cantidad de pasajeros: ${data.pax} <br>
            `
        },
    })
    .then(function(docRef) {
        //console.log("Documento agregado con ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error al agregar el documento: ", error);
    });
    // reservations@hyh.com.ar
    db.collection("mail").add({
        to: 'reservations@hyh.com.ar',
        message: {
            subject: 'Solicitar cotización',
            html: `
            Solicito la contización para un vuelo con el siguiente detalle: <br>
            Nombre de contacto: ${data.name}, <br>
            Email: ${data.mail}, <br>
            Origen: ${data.origin}, <br>
            Destino: ${data.destination}, <br>
            Fecha: ${data.date}, <br>
            Cantidad de pasajeros: ${data.pax} <br>
            `
        },
    })
    // user confirmation email
    db.collection("mail").add({
        to: data.mail,
            message: {
                subject: 'Message sent successfully',
                html: `
                Thank you for reaching out! We will contact you quickly. <br>
                From: ${data.origin} - To: ${data.destination} <br>
                Date: ${data.date} <br>
                Pax: ${data.pax} <br> <br>
                Feeling Air S.A.<br>
                +54 9 3525 45-7917<br>
                info@feelingair.com.ar<br>
                Posta de San Pedro 1315 - Sinsacate, Córdoba, Argentina <br> <br>
                <img src="https://raw.githubusercontent.com/RenaudierFranco/FeelingAir/main/assets/img/logo.png" alt="Feeling Air" width="200">
                `
            },
        })
};