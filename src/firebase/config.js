import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD6b8JOSGpH8pdvefiArDjfXuas1JuQ3ho",
    authDomain: "mymoney-6e5b8.firebaseapp.com",
    projectId: "mymoney-6e5b8",
    storageBucket: "mymoney-6e5b8.appspot.com",
    messagingSenderId: "953434573600",
    appId: "1:953434573600:web:f7a95432dbdcb852e16545"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
 
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }