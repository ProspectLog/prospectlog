import { useState } from "react";

type AdvancedSearchProps = {
  origins?: string[];
  contacts?: string[];
  setFilters?: (filters: { origine: string; contact: string }) => void;
}


import { db } from "../../config/firebaseConfig"; // Importez votre instance Firebase
import { collection, addDoc } from "firebase/firestore"; // Importez les outils nécessaires
import DropDown from "../Dropdown/DropDown";
import { CiSearch } from "react-icons/ci";
import { checkAndAddLoginCheck } from "../../utils/logincheckutils";

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    nom: "",
    contact: "",
    tel: "",
    origine: "",
    metier: "",
    rappel: "",
    statut: "pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ajout dans la collection "prospects"
      const docRef = await addDoc(collection(db, "prospects"), {
        ...formData,
        createdAt: new Date(), // Ajoute le timestamp de création
        updatedAt: new Date(), // Ajoute le timestamp de modification
      });
      console.log("Document ajouté avec ID : ", docRef.id);

      await checkAndAddLoginCheck(); // Appel de la fonction pour ajouter un login check
      // --------------------------------------------------------

      // Réinitialise le formulaire et ferme la modal
      setFormData({
        nom: "",
        contact: "",
        tel: "",
        origine: "",
        metier: "",
        rappel: "",
        statut: "pending",
      });
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du document : ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ajouter un Prospect</h2>
        <form className="space-y-4 relative" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contacté par
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Contacté par"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tel</label>
            <input
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Tel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Origine</label>
            <input
              type="text"
              name="origine"
              value={formData.origine}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Origine"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Métier</label>
            <input
              type="text"
              name="metier"
              value={formData.metier}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Métier"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rappel</label>
            <input
              type="date"
              name="rappel"
              placeholder="Date"
              value={formData.rappel}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              name="statut"
              value={formData.statut}
              role="Statut"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="pending">😬 Pending</option>
              <option value="not now">💤 Not Now</option>
              <option value="confirm">🎉 Confirm</option>
              <option value="dead">💀 Dead</option>
            </select>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdvancedSearch({
  origins = [],         // Valeur par défaut : tableau vide
  contacts = [],        // Valeur par défaut : tableau vide
  setFilters = () => {} // Fonction vide par défaut
}: AdvancedSearchProps) {
  const [selectedOrigine, setSelectedOrigine] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterChange = (newOrigine?: string, newContact?: string) => {
    console.log(
      "Filters changed",
      newOrigine || selectedOrigine,
      newContact || selectedContact
    );
    setFilters({
      origine: newOrigine ?? selectedOrigine,
      contact: newContact ?? selectedContact,
    });
  };

  return (
    <div className="flex gap-7">
      <button
        onClick={openModal}
        className="bg-green-500 border rounded-lg hover:bg-green-600 transition-all text-white p-2 shadow-md"
      >
        Ajouter un Prospect
      </button>
      <DropDown
        label="Origine"
        options={["Toutes", ...origins]}
        selected={selectedOrigine || "Origine"}
        onSelect={(value) => {
          setSelectedOrigine(value === "Toutes" ? "" : value);
          handleFilterChange(value === "Toutes" ? "" : value, undefined);
        }}
      />
      <DropDown
        label="Contacté par"
        options={["Tous", ...contacts]}
        selected={selectedContact || "Contacté par"}
        onSelect={(value) => {
          setSelectedContact(value === "Tous" ? "" : value);
          handleFilterChange(undefined, value === "Tous" ? "" : value);
        }}
      />
      <div className="relative flex items-center rounded-lg p-2 border text-gray-600 select-none gap-2 ">
        <CiSearch className="h-5 w-5" />
        <input
          className="bg-transparent focus:outline-none"
          type="text"
          placeholder="Rechercher"
        />
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}