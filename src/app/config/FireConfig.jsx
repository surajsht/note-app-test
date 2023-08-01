import { initializeApp } from "firebase/app";

const env = process.env;

const firebaseConfig = {
  apiKey: env.NEXT_apiKey,
  authDomain: env.NEXT_authDomain,
  projectId: env.NEXT_projectId,
  storageBucket: env.NEXT_storageBucket,
  messagingSenderId: env.NEXT_messagingSenderId,
  appId: env.NEXT_appId,
};

const app = initializeApp(firebaseConfig);
