'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaPen } from 'react-icons/fa';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WeeklyStats() {
  const [completed, setCompleted] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [newTotal, setNewTotal] = useState(0);

  const statsDocRef = doc(db, 'weeklyStats', 'stats');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      statsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompleted(data.completed || 0);
          setRemaining(data.remaining || 0);
          setTotal(data.total || 0);
          // Met à jour newTotal seulement si on n'est pas en mode édition
          if (!isEditing) {
            setNewTotal(data.total || 0);
          }
        }
      },
      (error) => {
        console.error('Error listening to stats:', error);
      }
    );
    return () => unsubscribe();
  }, [statsDocRef, isEditing]);

  const chartData = {
    labels: ['Progress', 'A faire'],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        hoverBackgroundColor: ['#45A049', '#C0C0C0'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: '85%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // Fonction qui crée ou met à jour le document (création si inexistant grâce à setDoc merge:true)
  const updateStatsInFirebase = async (newCompleted, newRemaining, newTotalValue = total) => {
    try {
      await setDoc(
        statsDocRef,
        {
          completed: newCompleted,
          remaining: newRemaining,
          total: newTotalValue,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  };

  const handleAdd = async () => {
    if (remaining > 0) {
      const updatedCompleted = completed + 1;
      const updatedRemaining = remaining - 1;
      await updateStatsInFirebase(updatedCompleted, updatedRemaining);
    }
  };

  const handleRemove = async () => {
    if (completed > 0) {
      const updatedCompleted = completed - 1;
      const updatedRemaining = remaining + 1;
      await updateStatsInFirebase(updatedCompleted, updatedRemaining);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleValidateClick = async () => {
    if (newTotal >= completed) {
      await updateStatsInFirebase(completed, newTotal - completed, newTotal);
      setIsEditing(false);
    } else {
      alert("Le total ne peut pas être inférieur aux tâches complétées.");
    }
  };

  return (
    <div className="w-[45%] h-[300px] mt-2 mb-10 rounded-lg p-4 flex flex-col justify-center items-center shadow-customshadow1 border border-gray-300 relative">
      <Doughnut data={chartData} options={options} />
      {/* Texte centré dans le graphique */}
      <div className="absolute flex flex-col items-center bottom-20">
        <span className="text-lg font-bold text-gray-800">{`${completed} / ${total}`}</span>
        <span className="text-sm text-gray-600">Tâches faites</span>
        <span className="text-sm text-gray-600">Restant: {remaining}</span>
      </div>

      {/* Icône du stylo pour passer en mode édition */}
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
