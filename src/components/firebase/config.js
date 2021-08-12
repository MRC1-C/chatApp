import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBwg-rTEo6_mrkFYR9LiAtvoabFZDIcscM",
    authDomain: "chat-2d4ab.firebaseapp.com",
    projectId: "chat-2d4ab",
    storageBucket: "chat-2d4ab.appspot.com",
    messagingSenderId: "145732446064",
    appId: "1:145732446064:web:55e791828dfde0720b11b5",
    measurementId: "G-LZYH2TJTLL"
})

const db = firebaseApp.firestore();

export default db;