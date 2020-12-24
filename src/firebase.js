import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDDl2UUx3p3b9XoPTRSZd3XwfFBBW5uynI",
    authDomain: "instagram-clone-ed1a2.firebaseapp.com",
    databaseURL: "https://instagram-clone-ed1a2.firebaseio.com",
    projectId: "instagram-clone-ed1a2",
    storageBucket: "instagram-clone-ed1a2.appspot.com",
    messagingSenderId: "425095405692",
    appId: "1:425095405692:web:9151996bf218e2aebaa9f9",
    measurementId: "G-REPC3DXCQQ"
    });
      
    const db = firebaseApp.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage();
    
    export { auth, storage};
    export default db;