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

//this method is to help adding the user details from various signin options i.e Google and add it to the user database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // two types of Objects we get back from firebase, 
  const userRef = firestore.doc(`users/${userAuth.uid}`);// 1) Query reference - where something is in database
  const snapshot = await userRef.get(); // 2) snapshot object, get data from the location we got in userRef

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

// to use the google prompt to select google account when signing in with Google
provider.setCustomParameters({ prompt: 'select_account'});
// here create a google popup. It is google because we had set up Google authentication, in firebase console under Authentication 
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;