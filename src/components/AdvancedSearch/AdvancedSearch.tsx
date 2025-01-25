import { useState } from "react";
import DropDown from "../Dropdown/DropDown";
import { CiSearch } from "react-icons/ci";

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedStatus, setSelectedStatus] = useState("pending");

  if (!isOpen) return null; // Ne pas rendre la modal si elle est fermée

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ajouter un Prospect</h2>
        <form className="space-y-4 relative">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Contacté par"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tel
            </label>
            <input
              type="tel"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Tel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Origine
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Origine"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Métier
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Métier"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rappel
            </label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <select
              className={`mt-1 block w-[150px] h-[50px]  -top-24 -right-14 appearance-none absolute rounded-full shadow-sm px-2 outline-none font-bold text-base
              ${
                selectedStatus === "pending"
                  ? "bg-blue-500"
                  : selectedStatus === "not now"
                  ? "bg-yellow-500"
                  : selectedStatus === "confirm"
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="pending">😬 Pending</option>
              <option value="not now">💤 Not Now</option>
              <option value="confirm">🎉 Confirm</option>
              <option value="dead">💀 Dead</option>
            </select>
          </div>
        </form>
        <div className="mt-4 flex gap-4">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Ajouter
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdvancedSearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex gap-7">
      <button
        onClick={openModal}
        className="bg-green-500 border rounded-lg hover:bg-green-600 transition-all text-white p-2 shadow-md"
      >
        Ajouter un Prospect
      </button>

      <DropDown label={"test"} options={["test", "test2"]} />
      <DropDown label={"test"} options={["test", "test2"]} />
      <DropDown label={"test"} options={["test", "test2"]} />
      <DropDown label={"test"} options={["test", "test2"]} />

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
