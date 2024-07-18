import words from '../../data';

const selectWord = () => {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  return randomWord.toLowerCase();
};

export default selectWord;
