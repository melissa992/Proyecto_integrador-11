// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDByo9kj0Xn3vdEnHhNekgOJh_Wpyo-Szk",
  authDomain: "heard-3d.firebaseapp.com",
  projectId: "heard-3d",
  storageBucket: "heard-3d.firebasestorage.app",
  messagingSenderId: "750063993575",
  appId: "1:750063993575:web:618b96a94caaabb6571842"
};

async function saveUserScore(score) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "quizScores"), {
      userId: user.uid,
      username: user.displayName || user.email,
      score,
      date: new Date(),
    });
  } catch (e) {
    console.error("Error guardando puntuación:", e);
  }
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };