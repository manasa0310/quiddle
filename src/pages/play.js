import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { TiTickOutline } from 'react-icons/ti';
import { RiCloseLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '@/store/game-slice';
import { BiHelpCircle } from 'react-icons/bi';
import RulesCard from '@/components/RulesCard';
import ScoreCard from '@/components/ScoreCard';
import selectWord from '@/utils/selectWord';
import toast, { Toaster } from 'react-hot-toast';
import { db } from '../utils/firebase';
import { useRouter } from 'next/router';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { authActions } from '@/store/auth-slice';
import Modal from '@/components/Modal';

const Play = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { remainingChance, choosedWord } = useSelector((state) => state.game);

  const { user } = useSelector((state) => state.auth);

  const [guessword, setGuessword] = useState('');
  const [isGuessing, setIsGuessing] = useState(true);
  const [isWon, setIsWon] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const { name } = useSelector((state) => state?.auth);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [correctLettersWithPosition, setCorrectLettersWithPosition] =
    useState(0);
  const [isGuessedCardOpen, setIsGuessedCardOpen] = useState(false);
  const { alreadyPlayedWords, scoredPoints, guessedWords } = useSelector(
    (state) => state?.game
  );

  const checkUserAuth = async () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    if (!user) {
      router.push('/auth');
      return;
    }
    dispatch(authActions.setUser(user));
    dispatch(authActions.setIsAuthenticated(true));
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getAlreadyPlayedWords = async () => {
    let alreadyPlayedWords = [];
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (
        docSnap.data().words === undefined ||
        docSnap.data().words.length === 0
      )
        return;
      await docSnap.data().words.forEach((word) => {
        alreadyPlayedWords.push(word);
      });
      dispatch(gameActions.setAlreadyPlayedWords(alreadyPlayedWords));
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const getScore = async () => {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().score == undefined || docSnap.data().score == null)
      return;
    dispatch(gameActions.setScoredPoints(docSnap.data().score));
  };

  useEffect(() => {
    if (user === null) return;

    const fetchData = async () => {
      try {
        await getScore();
        await getAlreadyPlayedWords();
        handelChooseWord();
      } catch (error) {
        toast.error('Something went wrong While Fetching Data');
        console.log(error);
        window.location.reload();
      }
    };
    fetchData();
  }, [user]);

  const handelChooseWord = () => {
    const word = selectWord();
    if (alreadyPlayedWords.includes(word)) {
      handelChooseWord();
    } else {
      toast.success('Word Selected');
      dispatch(gameActions.setChoosedWord(word));
    }
  };

  const AddGuessedWord = (
    guessword,
    correctLetters,
    correctLettersWithPosition
  ) => {
    dispatch(
      gameActions.addGuessedWord({
        guessedWord: guessword,
        letterInPosition: correctLettersWithPosition,
        letterNotInPosition: correctLetters,
      })
    );
  };

  const checkRepeatedWord = (word) => {
    let repeatedWord = false;
    guessedWords.forEach((guessedWord) => {
      if (guessedWord.guessedWord === word) {
        repeatedWord = true;
        return null;
      }
    });
    return repeatedWord;
  };

  const handleTryAgain = () => {
    setIsWon(false);
    setIsGuessing(true);
    dispatch(gameActions.resetRemainingChance());
    toast.success('Game Started Again');
  };

  const handlePlayAgain = async () => {
    setIsWon(false);
    setIsGuessing(true);
    dispatch(gameActions.resetRemainingChance());
    dispatch(gameActions.resetGuessedWords());
    dispatch(gameActions.resetChooseWord());
    await getAlreadyPlayedWords();
    await getScore();
    handelChooseWord();
    setCorrectLetters(0);
    setCorrectLettersWithPosition(0);
    toast.success('Your Game has been reset');
  };

  const handleEndGame = () => {
    setIsGuessing(false);
  };

  const checkWord = async (word) => {
    if (checkRepeatedWord(word)) {
      toast.error('You have already Entered this word');
      return;
    }
    const { correctLetters, correctLettersWithPosition } = getWordMatches(
      word,
      choosedWord
    );
    if (correctLettersWithPosition === choosedWord.length) {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          words: [...alreadyPlayedWords, choosedWord],
          score: scoredPoints + 1,
        },
        { merge: true }
      );
      handleEndGame();
      toast.success('You Won the Game');
      setIsWon(true);
    } else {
      AddGuessedWord(word, correctLetters, correctLettersWithPosition);
      setCorrectLetters(correctLetters);
      setCorrectLettersWithPosition(correctLettersWithPosition);
      dispatch(gameActions.reduceRemainingChance());
    }
  };

  const getWordMatches = (word1, word2) => {
    const letterCount = {};
    let correctLettersWithPosition = 0;
    let correctLetters = 0;

    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === word2[i]) {
        correctLettersWithPosition++;
      } else {
        letterCount[word1[i]] = (letterCount[word1[i]] || 0) + 1;
      }
    }

    for (let i = 0; i < word2.length; i++) {
      if (word1[i] !== word2[i] && letterCount[word2[i]]) {
        correctLetters++;
        letterCount[word2[i]]--;
      }
    }

    return {
      correctLettersWithPosition,
      correctLetters,
    };
  };

  const handleGuess = (e) => {
    e.preventDefault();
    checkWord(guessword.toLocaleLowerCase());
    if (remainingChance === 1) {
      handleEndGame();
    }
    setGuessword('');
  };

  return (
    <div
      className="bg-[url('../../public/bg.webp')]  bg-no-repeat bg-cover w-full h-screen  text-black px-[1.5rem] py-[2.5rem] lg:py-[3rem] lg:px-[5rem]  2xl:py-[5rem] 2xl:px-[8rem]
    ">
      <div className="relative h-full ">
        <Toaster />
        <div
          className={`bg-black/10 sm:px-10 p-4  text-white rounded-lg py-5 h-full ${
            (isGuessedCardOpen && 'blur-md') ||
            (isRulesOpen && 'blur-md sm:blur-0')
          } `}>
          <div className="flex justify-between items-center w-full">
            <p className="text-[2rem] sm:text-[3rem] uppercase quiddle">
              Quiddle
            </p>
            <p className="text-2xl hidden sm:block">
              Welcome <span>{name}</span>
            </p>

            <p
              onClick={(e) => setIsGuessedCardOpen(true)}
              className="sm:hidden text-[1.5rem]">
              ❤️{remainingChance}
            </p>
          </div>
          <div className="h-[calc(100%-5rem)] sm:h-auto sm:mt-5 flex items-center">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <h1 className="sm:text-4xl text-3xl font-bold text-white pb-5 sm:pb-10">
                Guess the word
              </h1>
              <OtpInput
                value={guessword}
                onChange={setGuessword}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                inputType="string"
                inputStyle={'otp-input'}
              />

              {!isGuessing ? (
                <>
                  <p className="mt-4 font-medium text-2xl ">
                    {isWon ? 'Won the Game😇😇' : `Lost the game😭😭`}
                  </p>
                  {!isWon && (
                    <p className="mt-2 text-white/70  font-medium text-xl ">
                      The word was
                      <span className="text-2xl ml-2  uppercase text-white underline">
                        {choosedWord}
                      </span>
                    </p>
                  )}
                </>
              ) : (
                <div className="flex gap-5 mt-4">
                  <div className="flex items-center justify-center">
                    <RiCloseLine className="text-[2rem]" />
                    <p className="text-2xl font-bold text-white ">
                      {correctLetters}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <TiTickOutline className="text-[2rem]" />
                    <p className="text-2xl font-bold text-white ">
                      {correctLettersWithPosition}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={(e) => handleGuess(e)}
                className="hover:bg-white transition-all duration-200 px-8 text-xl py-3 text-[#4f46e5] font-medium rounded-md bg-gray-100/80  mt-10">
                Submit
              </button>
            </div>
            {/* Guessed List */}

            {!isRulesOpen && (
              <div
                onClick={() => setIsRulesOpen(true)}
                className="absolute bottom-0 left-0 m-4 cursor-pointer rounded-full">
                <BiHelpCircle className="text-white   text-[3rem]" />
              </div>
            )}
          </div>
        </div>

        <RulesCard isRulesOpen={isRulesOpen} setIsRulesOpen={setIsRulesOpen} />
        <ScoreCard
          isGuessedCardOpen={isGuessedCardOpen}
          setIsGuessedCardOpen={setIsGuessedCardOpen}
        />
        {!isGuessing && (
          <Modal
            choosedWord={choosedWord}
            isWon={isWon}
            handleTryAgain={handleTryAgain}
            handlePlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Play;
