import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProspectCard({ cardData, status, handleCardClick }: ProspectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Variants for the container (the UL) and the items (the LIs)
  const listVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
    },
  };

  // Définir des styles et des icônes dynamiques en fonction du statut
  const statusIcon =
    status === "pending"
      ? "😬"
      : status === "not now"
      ? "💤"
      : status === "confirm"
      ? "🎉"
      : "💀";
  const bgColor =
    status === "pending"
      ? "bg-blue-500"
      : status === "not now"
      ? "bg-yellow-500"
      : status === "confirm"
      ? "bg-green-500"
      : "bg-gray-900";

  return (
    <div>
      <div className="relative">
        <button
          className={`${bgColor} w-[50px] h-[50px] hover:scale-110 transition-transform relative  rounded-full -right-60 top-9 z-50 items-center justify-center flex text-2xl`}
          onClick={handleClick}
        >
          {statusIcon}
        </button>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* The list with variants for staggered children */}
              <motion.ul
                className="absolute -right-16 gap-2 flex z-50 flex-col w-[50px]"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.li
                  className="bg-blue-500 w-[50px]   cursor-pointer   h-[50px] flex items-center justify-center rounded-full text-2xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  😬
                </motion.li>
                <motion.li
                  className="bg-yellow-500 w-[50px]   cursor-pointer h-[50px] flex items-center justify-center rounded-full text-2xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  💤
                </motion.li>
                <motion.li
                  className="bg-green-500 w-[50px]  cursor-pointer   h-[50px] flex items-center justify-center rounded-full text-2xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  🎉
                </motion.li>
                <motion.li
                  className="bg-gray-900 w-[50px] cursor-pointer  h-[50px] flex items-center justify-center rounded-full text-2xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  💀
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div onClick={()=>{handleCardClick(cardData)}} className="mb-10 rounded-lg p-4 shadow-customshadow1 cursor-pointer hover:scale-[1.03] transition-all border border-gray-300 w-[270px] flex flex-col justify-end  relative">
        <h3 className="text-center text-2xl">{cardData.nom}</h3>
        {/* Logo dynamique */}

        <div className="mt-3 flex   justify-between">
          <div className="flex gap-2  text-[10px] text-wrap flex-col ">
            <h4>
              <strong>Nom :</strong> <br /> {cardData.nom}
            </h4>
            <h4>
              <strong>Contacté par :</strong> <br /> {cardData.contact}
            </h4>
            <h4>
              <strong>Tel : </strong>
              <br /> {cardData.tel}
            </h4>
          </div>
          <div className="flex gap-2 w-[30%]  text-[10px] flex-col ">
            <h4>
              <strong>Origine :</strong> <br />
              {cardData.origine}
            </h4>
            <h4>
              <strong>Métier par :</strong> <br /> {cardData.metier}
            </h4>
            <h4>
              <strong>Rappel :</strong> <br />
              {cardData.rappel}
            </h4>
          </div>
        </div>
        <div className="bg-slate-200 w-full h-[50px] mt-4"></div>
        <div className="w-full flex justify-between mt-2 text-[10px]">
          <h4>
            <strong>Création</strong> <br />
            {cardData.createdAt}{" "}
          </h4>
          <h4>
            <strong>Modifications </strong> <br />
            {cardData.updatedAt}{" "}
          </h4>
        </div>
      </div>
    </div>
  );
}
