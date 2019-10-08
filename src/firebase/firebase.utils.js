import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDwjeAYghml7db81bExLURATaWTywaxio4",
  authDomain: "crwn-ecommerce-db.firebaseapp.com",
  databaseURL: "https://crwn-ecommerce-db.firebaseio.com",
  projectId: "crwn-ecommerce-db",
  storageBucket: "",
  messagingSenderId: "800319580779",
  appId: "1:800319580779:web:ca0a5d0f75177cac661f2e",
  measurementId: "G-1BD34RQEN1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  // here if user doesnt exit we are creating one, firstly taking our google credetials and adding it as a user
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }

  }

  return userRef;
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;