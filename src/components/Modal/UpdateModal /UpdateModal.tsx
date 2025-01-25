import { useState } from "react";
import { motion } from "motion/react";
import { IoIosWarning } from "react-icons/io";
import { db } from "../../../config/firebaseConfig"; // Importez votre instance Firebase
import { doc, updateDoc } from "firebase/firestore"; // Importez les outils nécessaires

export default function UpdateModal({
  cardData,
  onClose,
}: {
  cardData: any;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(cardData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "prospects", cardData.id); // Remplacez "prospects" par votre collection Firebase
      await updateDoc(docRef, formData);
      console.log("Document mis à jour avec succès");
      onClose(); // Fermez la modal après soumission
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document : ", error);
    }
  };

  return (
    <div className="fixed inset-0 justify-end bg-black bg-opacity-[0.05] flex left-0 ">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="bg-white  rounded-lg w-[700px] flex flex-col  shadow-lg relative"
      >
        <div className="bg-green-500 w-full py-2 ">
          <button
            className="absolute top-2  right-2 text-xl font-bold"
            onClick={onClose}
          >
            ✖
          </button>
          <h2 className="text-2xl mt-2 font-bold text-center">
            {cardData.society}
          </h2>
        </div>

        <form className="flex flex-col gap-10 p-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 mx-3 ">
              <label className="">
                <strong>Nom:</strong>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Contacté par:</strong>
                <input
                  type="text"
                  name="contactedBy"
                  value={formData.contactedBy}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Téléphone:</strong>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Origine:</strong>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label>
                <strong>Métier:</strong>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Rappel:</strong>
                <input
                  type="text"
                  name="recall"
                  value={formData.recall}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Création:</strong>
                <input
                  type="text"
                  name="creation"
                  value={formData.creation}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Dernière modification:</strong>
                <input
                  type="text"
                  name="lastEdit"
                  value={formData.lastEdit}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-2">
              <strong>Description:</strong>
              <textarea
                name="description"
                className="w-full h-[300px] bg-gray-100 mt-1 p-2 border rounded"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <p className=" text-red-500 flex gap-2 items-center font-bold">
              <IoIosWarning />
              {cardData.name} devra étre rapelé le {cardData.recall}
            </p>
          </div>
          <div className="flex w-full justify-end h-full gap-4 p-4 items-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => {
                // Add your delete logic here
              }}
            >
              Supprimer
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}