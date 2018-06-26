import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCu_CpJdnt8ZUvBnkOdJhsupYiJcF94ex8",
  authDomain: "flammable-5c1a9.firebaseapp.com",
  databaseURL: "https://flammable-5c1a9.firebaseio.com",
  projectId: "flammable-5c1a9",
  storageBucket: "flammable-5c1a9.appspot.com",
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };