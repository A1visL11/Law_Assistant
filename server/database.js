import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {FIREBASE_CONFIGS} from '/env'

const firebaseConfig = FIREBASE_CONFIGS;

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}




export { firebase };