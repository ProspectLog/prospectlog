import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Chemin vers le fichier JSON


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
