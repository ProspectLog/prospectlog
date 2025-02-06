import { motion } from "framer-motion";

export default function GoogleButton() {
  return (
    <motion.button
      className="flex items-center justify-center w-[250px] h-[35px] bg-white border border-gray-300 rounded-xl shadow-inner  transition-all"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google Logo"
        className="w-6 h-6 mr-2"
      />
      <span className="text-gray-700 font-medium">Google</span>
    </motion.button>
  );
}
