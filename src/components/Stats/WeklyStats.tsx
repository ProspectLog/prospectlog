import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaPen } from 'react-icons/fa'; // Importer l'icône du stylo
import { MdBorderColor } from 'react-icons/md';

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function WeeklyStats() {
  const [completed, setCompleted] = useState(20); // Tâches déjà faites
  const [remaining, setRemaining] = useState(90); // Tâches restantes
  const [total, setTotal] = useState(completed + remaining); // Total des tâches
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'édition du total
  const [newTotal, setNewTotal] = useState(total); // Nouveau total à modifier

  const data = {
    labels: ['Progress', 'A faire'], // Légende du camembert
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: ['#4CAF50', '#E0E0E0'], // Couleur du camembert
        hoverBackgroundColor: ['#45A049', '#C0C0C0'],
        borderWidth: 2, // Bordure pour l'esthétique
      },
    ],
  };

  const options = {
    rotation: -90, // Commence en haut
    circumference: 180, // Demi-camembert
    cutout: '85%', // Cercle interne pour un effet progressif
    plugins: {
      legend: {
        display: false, // Masquer la légende
      },
      tooltip: {
        enabled: true, // Afficher les infos au survol
      },
    },
  };

  // Fonction pour gérer l'ajout
  const handleAdd = () => {
    if (remaining > 0) {
      setCompleted(completed + 1);
      setRemaining(remaining - 1);
    }
  };

  // Fonction pour gérer la suppression
  const handleRemove = () => {
    if (completed > 0) {
      setCompleted(completed - 1);
      setRemaining(remaining + 1);
    }
  };

  // Fonction pour basculer en mode édition
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Fonction pour valider la modification du total
  const handleValidateClick = () => {
    if (newTotal >= completed) {
      setTotal(newTotal);
      setRemaining(newTotal - completed);
      setIsEditing(false);
    } else {
      alert("Le total ne peut pas être inférieur aux tâches complétées.");
    }
  };

  return (
    
    <div className=" w-[45%] h-[300px] mt-2 mb-10 rounded-lg p-4 flex flex-col justify-center items-center shadow-customshadow1 border border-gray-300 relative">
      <Doughnut data={data} options={options} />
      {/* Texte au centre du graphique */}
      <div className="absolute flex flex-col items-center bottom-20">
        <span className="text-lg font-bold text-gray-800">{`${completed} / ${total}`}</span>
        <span className="text-sm text-gray-600">Tâches faites</span>
        <span className="text-sm text-gray-600">Restant: {remaining}</span>
      </div>

      {/* Icône du stylo pour l'édition */}
      <div
        onClick={handleEditClick}
        className="absolute top-4 right-4 cursor-pointer text-md text-gray-400 transition-all hover:text-gray-500"
      >
        <FaPen />
      </div>

      {/* Zone d'édition du total */}
      {isEditing && (
        <div className="absolute bottom-10 flex items-center gap-2">
          <input
            type="number"
            value={newTotal}
            onChange={(e) => setNewTotal(parseInt(e.target.value))}
            className="px-2 py-1 border rounded"
          />
          <button
            onClick={handleValidateClick}
            className="bg-blue-500 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded"
          >
            Valider
          </button>
        </div>
      )}

      {/* Boutons d'ajout et de suppression */}
      {!isEditing && (
        <div className="absolute bottom-4 flex gap-4">
          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            -
          </button>
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
