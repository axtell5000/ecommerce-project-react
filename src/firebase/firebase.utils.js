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
  
};

// Function to add data to database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  // creating the batch first
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
    console.log(newDocRef);
  });
  console.log(objectsToAdd, 'test');
  return await batch.commit();
}

// converting the arrays to objects, works out that each category is the key which as objects for each item
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// to use the google prompt to select google account when signing in with Google
googleProvider.setCustomParameters({ prompt: 'select_account'});
// here create a google popup. It is google because we had set up Google authentication, in firebase console under Authentication 
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;