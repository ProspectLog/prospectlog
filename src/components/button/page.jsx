import React from 'react';
import { motion } from 'framer-motion';
import GoogleButton from '../../components/button/GoogleButton';

export default function Page() {
  return (
    <motion.div
      className="w-full h-screen bg-gradient-to-b items-center justify-center flex shadow-xl from-gray-100 via-gray-200 to-gray-600 bg-[length:100%_200%]"
      animate={{ backgroundPosition: ['50% 0%', '50% 100%', '50% 0%'] }}
      transition={{ duration: 20, ease: "linear", repeat: Infinity }}
    >
      <div className="flex bg-white w-[700px] h-[500px] rounded-xl items-center py-4 flex-col gap-5 ">
        <img src="" alt="" />
        <h3>Bienvenue à vous</h3>
        <div className='flex gap-2'>
          <GoogleButton />
          <button>Microsoft</button>
        </div>
        <div className='flex'>
          <hr />
          <p>Ou</p>
          <hr />
        </div>
      </div>
    </motion.div>
  );
}
