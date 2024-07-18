import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { TiTickOutline } from 'react-icons/ti';

const GuessedCard = ({
  ChoosedWord,
  correctLetters,
  correctLettersWithPosition,
}) => {
  return (
    <div className="flex rounded-lg justify-between text-white mx-4 my-3 px-4 py-3 bg-black/30">
      <p className="uppercase xl:text-xl text-base xl:tracking-widest">
        {ChoosedWord}
      </p>
      <div className="flex xl:gap-3 gap-1">
        <div className="flex items-center justify-center">
          <RiCloseLine className="xl:text-[2rem]" />
          <p className="xl:text-2xl  text-white ">{correctLetters}</p>
        </div>
        <div className="flex items-center justify-center">
          <TiTickOutline className="xl:text-[2rem]" />
          <p className="xl:text-2xl  text-white ">
            {correctLettersWithPosition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuessedCard;
