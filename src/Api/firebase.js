import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAhA5iHH4_bSkRxUD_2q6o_jt_shy9-x08",
	authDomain: "plantao-dos-sonhos.firebaseapp.com",
	projectId: "plantao-dos-sonhos",
	storageBucket: "plantao-dos-sonhos.appspot.com",
	messagingSenderId: "523052386394",
	appId: "1:523052386394:web:6e9a31f0d9a29822ecf063",
	measurementId: "G-E1V8TRTYPY"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
  
export { auth, provider };