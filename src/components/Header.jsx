import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  return (
    <div className=" px-4 absolute w-full  bg-[#0c1324] text-white h-screen min-h-fit py-[1rem] lg:px-[5rem]">
      <div className="h-full  w-full flex flex-col items-center  justify-center">
        <h1 className="text-center uppercase text-white  ">
          Word Game Like Never Before
        </h1>
        <div className="w-full h-fit hidden sm:block">
          <svg viewBox="0 0 2100 400 ">
            <text
              className="text-[25rem]"
              x="50%"
              y="50%"
              dy=".4em"
              fill="transparent"
              textAnchor="middle">
              QUIDDLE
            </text>
          </svg>
        </div>

        <div className="w-full h-fit  sm:hidden block">
          <svg viewBox="0 0 2100 550">
            <text
              className="text-[30rem]"
              x="50%"
              y="50%"
              dy=".4em"
              fill="transparent"
              textAnchor="middle">
              QUIDDLE
            </text>
          </svg>
        </div>

        <h1 className="text-center uppercase mt-5">
          Experience The Next Level of Words Game
        </h1>
        <Link href="/auth">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="px-[5rem] py-3 md:px-[10rem] md:py-4 mt-[2rem] md:mt-[4rem] rounded-md text-xl md:text-[1.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Play Now
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
