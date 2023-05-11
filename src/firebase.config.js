import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZmksvYi01cFtJTMS1i3rdp8iFmna9p_w",
  authDomain: "resturantapp-b5e93.firebaseapp.com",
  databaseURL: "https://resturantapp-b5e93-default-rtdb.firebaseio.com",
  projectId: "resturantapp-b5e93",
  storageBucket: "resturantapp-b5e93.appspot.com",
  messagingSenderId: "574873498118",
  appId: "1:574873498118:web:9046bf95f58d3b1db44987",
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
