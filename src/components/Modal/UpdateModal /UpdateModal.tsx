import { motion } from "motion/react";

export default function UpdateModal({
  cardData,
  onClose,
}: {
  cardData: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 justify-end bg-black bg-opacity-[0.05] flex left-0 ">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="bg-white p-6 rounded-lg w-[700px] flex flex-col  shadow-lg relative"
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl mb-4 font-bold text-center">{cardData.society}</h2>
        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p>
                <strong>Nom:</strong> {cardData.name}
              </p>
              <p>
                <strong>Contacté par:</strong> {cardData.contactedBy}
              </p>
              <p>
                <strong>Téléphone:</strong> {cardData.phone}
              </p>
              <p>
                <strong>Origine:</strong> {cardData.origin}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p>
                <strong>Métier:</strong> {cardData.job}
              </p>
              <p>
                <strong>Rappel:</strong> {cardData.recall}
              </p>
              <p>
                <strong>Création:</strong> {cardData.creation}
              </p>
              <p>
                <strong>Dernière modification:</strong> {cardData.lastEdit}
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2">
              <strong>Description:</strong>
              <textarea
                className="w-full h-[300px] bg-gray-100 mt-1 p-2 border rounded"
                rows={4}
                defaultValue={cardData.description}
              />
            </label>
          </div>
        </div>
        <div className="flex w-full justify-end h-full gap-4 items-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              // Add your delete logic here
            }}
          >
            Supprimer
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              // Add your save logic here
            }}
          >
            Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
