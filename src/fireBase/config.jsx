
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyADV00hPQ7LqN5ti-SvlqXunGhNnrAX2y8",
  authDomain: "nfc-payment-242ac.firebaseapp.com",
  projectId: "nfc-payment-242ac",
  storageBucket: "nfc-payment-242ac.appspot.com",
  messagingSenderId: "954686862086",
  appId: "1:954686862086:web:1f9691012e955d47276487",
  measurementId: "G-EB2PSQ1MFS",
  databaseURL: "https://nfc-payment-242ac-default-rtdb.firebaseio.com/"

};

export default firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export {
  database
};











// import firebase from 'firebase'
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/database';


// const firebaseConfig = {
//   apiKey: "AIzaSyADV00hPQ7LqN5ti-SvlqXunGhNnrAX2y8",
//   authDomain: "nfc-payment-242ac.firebaseapp.com",
//   projectId: "nfc-payment-242ac",
//   storageBucket: "nfc-payment-242ac.appspot.com",
//   messagingSenderId: "954686862086",
//   appId: "1:954686862086:web:1f9691012e955d47276487",
//   measurementId: "G-EB2PSQ1MFS",
//   databaseURL: "https://nfc-payment-242ac-default-rtdb.firebaseio.com/"
// };

// export default firebase.initializeApp(firebaseConfig);
// const db = firebase.database();