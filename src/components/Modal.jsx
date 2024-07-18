import React from 'react';
import celebration from '../../public/confetti.gif';
import Image from 'next/image';
import { FaRedo } from 'react-icons/fa';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { FaSadTear } from 'react-icons/fa';
import { useState } from 'react';

const Modal = ({ isWon, handlePlayAgain, handleTryAgain, choosedWord }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-20 pb-20 text-center ">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 backdrop-filter backdrop-blur"></div>
        </div>

        <div className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:max-w-sm w-full ">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              {isWon ? (
                <Image src={celebration} alt="celebration" />
              ) : (
                <div className="bg-red-500 rounded-full p-2 animate-zoomout">
                  <FaSadTear className="text-white text-5xl" />
                </div>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {isWon ? 'Won the Game😇😇' : `Lost the game😭😭 `}
              </h3>
              {!isWon && (
                <div
                  className="cursor-pointer mt-2 flex items-center justify-center space-x-2"
                  onClick={() => setShow(true)}>
                  {show ? (
                    <p>
                      The word is
                      <span className="ml-2 uppercase font-bold text-xl underline shadow-lg">
                        {choosedWord}
                      </span>
                    </p>
                  ) : (
                    <p>Tap To Show The Word</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center items-center w-full gap-10 px-5">
            <button
              onClick={() => handlePlayAgain()}
              type="button"
              className="inline-flex items-center space-x-2 w-full max-w-[10rem] justify-center  rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600  sm:text-sm group">
              <AiOutlinePlayCircle className="group-hover:animate-ping  h-6 w-6 " />
              <span>Play Again</span>
            </button>
            {!isWon && !show && (
              <button
                onClick={() => handleTryAgain()}
                class="flex items-center space-x-2 justify-center w-full max-w-[10rem] px-4 py-2  font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none  focus:ring-opacity-50 group ">
                <FaRedo className="group-hover:animate-spin" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
