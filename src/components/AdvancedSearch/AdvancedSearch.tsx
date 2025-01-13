import React from "react";
import DropDown from "../Dropdown/DropDown";
import { CiSearch } from "react-icons/ci";

export default function AdvancedSearch() {
  return (
    <div className="flex gap-4">
      <button className="bg-green-500 border rounded-lg hover:bg-green-600 transition-all text-white p-2 shadow-md">
        Ajouter un Prospect
      </button>

      <DropDown />
      <DropDown />
      <DropDown />
      <DropDown />

      <div className="relative flex items-center rounded-lg p-2 border text-gray-600 select-none gap-2 ">
        <CiSearch className="h-5 w-5" />

        <input
          className="bg-transparent focus:outline-none"
          type="text"
          placeholder="Rechercher"
        />
      </div>
    </div>
  );
}
