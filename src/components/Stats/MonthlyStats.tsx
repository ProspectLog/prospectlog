import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

// Définition du type pour un jour de contribution
type ContributionGridProps = {
  date: string;
  connected: boolean;
};

export default function ContributionGrid() {
  // Nombre de jours par mois (non bissextile)
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Génération initiale des données de la grille
  const generateData = (): ContributionGridProps[][] => {
    let data: ContributionGridProps[][] = [];
    months.forEach((month, monthIndex) => {
      let monthData: ContributionGridProps[] = [];
      for (let day = 1; day <= daysInMonths[monthIndex]; day++) {
        monthData.push({
          date: `${month} ${day}`, // Exemple : "Jan 1"
          connected: false,
        });
      }
      data.push(monthData);
    });
    return data;
  };

  const convertDateFormat = (dateStr: string): string => {
    const parts = dateStr.split("/");
    if (parts.length < 2) return dateStr;
    const day = parseInt(parts[0], 10); // ex : 05 -> 5
    const monthNum = parseInt(parts[1], 10); // ex : 02 -> 2
    const monthAbbr = months[monthNum - 1]; // 2 -> "Feb"
    return `${monthAbbr} ${day}`; // "Feb 5"
  };


  // État local de la grille
  const [data, setData] = useState<ContributionGridProps[][]>(generateData());

  // useEffect pour écouter les changements dans la collection "login check"
  useEffect(() => {
    // On écoute la collection "login check"
    const unsub = onSnapshot(collection(db, "loginCheck"), (snapshot) => {
      // On crée une grille fraîche initialisée (tous les jours à false)
      const newData = generateData();

      // Pour chaque document dans "login check", on met à jour la grille
      snapshot.forEach((doc) => {
        const docData = doc.data();
        // On suppose que docData.date est au format "Jan 1"
        const loginDate: string = convertDateFormat(docData.date);
        const loginConnected: boolean = docData.value; // ici true (ou une autre valeur)

        // Parcourir la grille pour trouver la date correspondante et mettre à jour "connected"
        newData.forEach((monthData) => {
          monthData.forEach((dayObj) => {
            if (dayObj.date === loginDate) {
              dayObj.connected = loginConnected;
            }
          });
        });
      });
      // On met à jour l'état avec la nouvelle grille
      setData(newData);
    });

    // Nettoyage : on se désabonne quand le composant est démonté
    return () => unsub();
  }, []);

  return (
    <div className="mb-10 rounded-lg p-4 shadow-customshadow1 border border-gray-300">
      {/* Affichage des mois en haut */}
      <div className="flex justify-around mb-2">
        {months.map((month, index) => (
          <div key={index} className="text-sm font-medium w-[40px] text-center">
            {month}
          </div>
        ))}
      </div>

      {/* Affichage de la grille des contributions */}
      <div className="flex gap-1">
        {data.map((monthData, monthIndex) => (
          <div key={monthIndex} className="flex flex-wrap gap-1">
            {monthData.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-[10px] h-[10px] rounded-sm cursor-pointer ${
                  day.connected ? "bg-green-500" : "bg-gray-300"
                }`}
                title={day.date} // Affiche la date exacte au survol
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
