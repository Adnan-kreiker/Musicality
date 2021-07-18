import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC8NVqpWZS_IVCIepJBb4375VIjBq-odYg',
  authDomain: 'music-cb9f9.firebaseapp.com',
  projectId: 'music-cb9f9',
  storageBucket: 'music-cb9f9.appspot.com',
  messagingSenderId: '905185554971',
  appId: '1:905185554971:web:7d5ccd5bfc2871fde3febe',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
  timestamp,
};
