import { initializeFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDFjCys4wBWkfeLpd7BqTOIguIPM15-TE",
  authDomain: "solopj-ecb6d.firebaseapp.com",
  projectId: "solopj-ecb6d",
  storageBucket: "solopj-ecb6d.appspot.com",
  messagingSenderId: "105087717434",
  appId: "1:105087717434:web:56d3f2ddfe4fcb8ba6a503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db }