import React, { useState } from 'react';
import GuessedCard from './GuessedCard';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ScoreCard = ({ setIsGuessedCardOpen, isGuessedCardOpen }) => {
  const { guessedWords, remainingChance } = useSelector((state) => state.game);

  return (
    <div
      className={`sm:m-5 h-3/5 ${
        !isGuessedCardOpen && 'hidden  sm:block '
      } rounded-lg w-[90%] bottom-1/2 translate-y-1/2 translate-x-1/2 right-1/2 bg-black/10 absolute sm:w-[20%] sm:h-[50%] overflow-y-hidden   sm:bottom-0 sm:right-0 sm:translate-x-0 sm:translate-y-0`}>
      <div className="flex justify-center gap-2 sm:justify-between rounded-t-lg  px-4 py-3 bg-black/[35%] relative">
        <p className="xl:text-xl text-base text-white uppercase">Lives</p>
        <p className="Xl:text-xl flex items-center font-bold text-white">
          {remainingChance}
          <span>❤️</span>
        </p>

        <p
          onClick={(e) => setIsGuessedCardOpen(false)}
          className="absolute cursor-pointer sm:hidden top-2 text-white right-2">
          <AiOutlineCloseCircle className="w-6 h-6" />
        </p>
      </div>
      <div className="scrollbar-hide overflow-y-scroll h-[calc(100%-3rem)]">
        {guessedWords.map((word, index) => {
          const { guessedWord, letterInPosition, letterNotInPosition } = word;
          return (
            <GuessedCard
              key={index}
              ChoosedWord={guessedWord}
              correctLetters={letterNotInPosition}
              correctLettersWithPosition={letterInPosition}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScoreCard;
