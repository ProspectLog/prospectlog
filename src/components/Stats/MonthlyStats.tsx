import React, { useState } from "react";


type ContributionGridProps = {
  date: string;
  connected: boolean;
}

export default function ContributionGrid() {
  // Jours par mois (année non bissextile, ajuster pour année bissextile si nécessaire)
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Génération initiale des données
  const generateData = () => {
    let data: ContributionGridProps[][] = [];
    months.forEach((month, monthIndex) => {
      let monthData = [];
      for (let day = 1; day <= daysInMonths[monthIndex]; day++) {
        monthData.push({
          date: `${month} ${day}`, // Ex : "Jan 1"
          connected: Math.random() > 0.5, // Aléatoire : connecté ou non
        });
      }
      data.push(monthData);
    });
    return data;
  };

  // Données d'état
  const [data, setData] = useState(generateData());


  return (
    <div className="mb-10 rounded-lg p-4 shadow-customshadow1 border border-gray-300">
      {/* Mois en haut */}
      <div className="flex justify-around mb-2">
        {months.map((month, index) => (
          <div key={index} className="text-sm font-medium w-[40px] text-center">
            {month}
          </div>
        ))}
      </div>

      {/* Grille des contributions */}
      <div className="flex gap-1">
        {data.map((monthData, monthIndex) => (
          <div key={monthIndex} className="flex flex-wrap gap-1">
            {monthData.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-[10px] h-[10px] rounded-sm cursor-pointer ${
                  day.connected ? "bg-green-500" : "bg-gray-300"
                }`}
                title={day.date} // Affiche la date exacte au hover
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
