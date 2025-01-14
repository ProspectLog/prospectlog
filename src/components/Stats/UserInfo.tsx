import { FaUserCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

export default function UserInfo() {
  return (
    <div className=" w-[45%] h-[300px] flex-col mt-2 mb-10 rounded-lg p-4 flex   items-center  shadow-customshadow1 border border-gray-300 relative">
      <div

        className="absolute top-4 right-4 cursor-pointer text-md text-gray-400 transition-all hover:text-gray-500"
      >
        <FaPen />
      </div>
      <div className="flex items-center w-full gap-14 py-4">
        <FaUserCircle className="text-7xl text-gray-400" />
        <div>
          <h4 className="text-sm">Username</h4>
          <span className="text-lg font-bold text-gray-800">John Doe</span>
        </div>
      </div>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptate
        reiciendis praesentium velit quas commodi corporis quisquam rem aperiam
        fuga delectus blanditiis, aliquam in magnam necessitatibus nam magni, ad
        sed!
      </span>
    </div>
  );
}
