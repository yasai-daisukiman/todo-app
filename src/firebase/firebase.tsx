// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYJPKNexkigQl0GGMMN4wPzlvqAvbnFoI',
  authDomain: 'shadcn-app.firebaseapp.com',
  databaseURL: 'https://shadcn-app-default-rtdb.firebaseio.com',
  projectId: 'shadcn-app',
  storageBucket: 'shadcn-app.appspot.com',
  messagingSenderId: '849338940380',
  appId: '1:849338940380:web:31bc3053980ad3177cad19',
  measurementId: 'G-7JGCFB699Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
