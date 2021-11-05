import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCKbhNRVGdVvfkTQqmPEY8IhqdTemx-Rrk",
    authDomain: "projetosemestral-b3d09.firebaseapp.com",
    projectId: "projetosemestral-b3d09",
    storageBucket: "projetosemestral-b3d09.appspot.com",
    messagingSenderId: "232089492326",
    appId: "1:232089492326:web:3d03397ae8b9b133af46a7",
    measurementId: "G-JWHK739DYH"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();

export {firebase, auth, database}

