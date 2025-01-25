import { motion } from "motion/react";
import { IoIosWarning } from "react-icons/io";

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

        <div className="flex flex-col gap-10 p-6">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 mx-3 ">
              <label className="">
                <strong>Nom:</strong>
                <input
                  type="text"
                  defaultValue={cardData.name}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Contacté par:</strong>
                <input
                  type="text"
                  defaultValue={cardData.contactedBy}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Téléphone:</strong>
                <input
                  type="text"
                  defaultValue={cardData.phone}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Origine:</strong>
                <input
                  type="text"
                  defaultValue={cardData.origin}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label>
                <strong>Métier:</strong>
                <input
                  type="text"
                  defaultValue={cardData.job}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Rappel:</strong>
                <input
                  type="text"
                  defaultValue={cardData.recall}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Création:</strong>
                <input
                  type="text"
                  defaultValue={cardData.creation}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
              <label>
                <strong>Dernière modification:</strong>
                <input
                  type="text"
                  defaultValue={cardData.lastEdit}
                  className="bg-gray-100 p-2 border rounded w-full"
                />
              </label>
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
            <p className=" text-red-500 flex gap-2 items-center font-bold">
              <IoIosWarning />
              {cardData.name} devra étre rapelé le {cardData.recall}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-end h-full gap-4 p-4 items-end">
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
