import firebase from 'firebase/compat/app'; // Import Firebase app
import 'firebase/compat/auth'; // Import Firebase authentication module
import 'firebase/compat/firestore'; // Import Firestore if you're using it
import {FIREBASE_CONFIGS} from '/env'
// Web app's Firebase configuration
const firebaseConfig = FIREBASE_CONFIGS;

// const firestore = admin.firestore();
// firestore.settings({ ignoreUndefinedProperties :true });


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase modules that you need
export const auth = firebase.auth(); // Export Firebase Auth instance
export const firestore = firebase.firestore(); // Export Firestore instance if needed
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // Export Google Auth Provider
//console.log('firebase here->', firebase)