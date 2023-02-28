import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyADV00hPQ7LqN5ti-SvlqXunGhNnrAX2y8",
  authDomain: "nfc-payment-242ac.firebaseapp.com",
  projectId: "nfc-payment-242ac",
  storageBucket: "nfc-payment-242ac.appspot.com",
  messagingSenderId: "954686862086",
  appId: "1:954686862086:web:1f9691012e955d47276487",
  measurementId: "G-EB2PSQ1MFS"
};

export const Firebase = firebase.initializeApp(firebaseConfig)