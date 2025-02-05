// loginCheckUtils.ts
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Ajustez le chemin selon votre structure

/**
 * Vérifie si un document existe dans la collection "loginCheck" pour la date du jour.
 * S'il n'existe pas, il ajoute un document avec { date: today, value: true }.
 */
export async function checkAndAddLoginCheck(): Promise<void> {
  try {
    // Détermine la date du jour au format local (ex : "2/4/2025")
    const today = new Date().toLocaleDateString();
    const loginCheckRef = collection(db, "loginCheck");

    // Crée une requête pour vérifier si un document avec la date du jour existe
    const loginQuery = query(loginCheckRef, where("date", "==", today));
    const loginSnapshot = await getDocs(loginQuery);

    // Si aucun document n'existe pour cette date, ajoute un document avec "value: true"
    if (loginSnapshot.empty) {
      await addDoc(loginCheckRef, { date: today, value: true });
      console.log("Login check ajouté pour la date :", today);
    } else {
      console.log("Un login check existe déjà pour la date :", today);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document : ", error);
  }
}
