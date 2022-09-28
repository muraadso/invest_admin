import {getApps, initializeApp} from "firebase/app";

export default function initFirebase() {
  let app
  if (getApps().length === 0) {
    app = initializeApp({
      apiKey: "AIzaSyDByngqYWaj7PCZWAQXN2OL-HxU_5f_jNk",
      authDomain: "intvest-muraadso.firebaseapp.com",
      projectId: "intvest-muraadso",
      storageBucket: "intvest-muraadso.appspot.com",
      messagingSenderId: "426571516403",
      appId: "1:426571516403:web:1fc127d4dfa4f25b962a86",
      measurementId: "G-YPF0B1NDCC"
    });
  } else {
    app = getApps()[0]
  }
  return app
}
