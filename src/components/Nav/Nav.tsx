import { FaUserCircle } from "react-icons/fa";

export default function Nav() {
  return (
    <div className=" border-b-2 w-full     ">
      <div className=" max-w-4xl flex items-center justify-between mx-auto ">
        <img
          src="/Logo.png"
          alt="Description of image"
          className="h-[45px] w-auto"
        />
        <ul className=" flex ml-4 gap-5">
          <li className=" cursor-pointer text-gray-500 hover:bg-gray-200 py-[10px] px-5  border-b-[3px] border-b-black hover:text-black transition-all h-full ">
        Accueil
          </li>
        </ul>
        <FaUserCircle className="text-3xl  text-gray-400 ml-auto" />
      </div>
    </div>
  );
}
