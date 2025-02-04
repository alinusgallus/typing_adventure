import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getRandomLine, getLevelInfo } from '../data/typingLessons';

// Define letter sets for each of the 10 levels.
// Level 1 = 2 letters, Level 2 = 4 letters, etc.
const levelLetters = [
  'as',
  'asdf',
  'asdfgh',
  'asdfghjkl',
  'asdfghjklqwert',
  'asdfghjklqwertyuiop',
  'asdfghjklqwertyuiopzxcv',
  'asdfghjklqwertyuiopzxcvbnm',
  'asdfghjklqwertyuiopzxcvbnm0123456789',
  'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}',
];

// Generates a random word of 3-5 characters using the allowed letters in the current level.
function generateRandomWord(letterSet) {
  const length = Math.floor(Math.random() * 3) + 3; // 3 to 5
  let word = '';
  for (let i = 0; i < length; i++) {
    word += letterSet[Math.floor(Math.random() * letterSet.length)];
  }
  return word;
}

const keyboardLayout = [
  [
    { key: '`', finger: 'none' }, { key: '1', finger: 'none' }, { key: '2', finger: 'none' },
    { key: '3', finger: 'none' }, { key: '4', finger: 'none' }, { key: '5', finger: 'none' },
    { key: '6', finger: 'none' }, { key: '7', finger: 'none' }, { key: '8', finger: 'none' },
    { key: '9', finger: 'none' }, { key: '0', finger: 'none' }, { key: '-', finger: 'none' },
  ],
  [
    { key: 'q', finger: 'left-pinky' }, { key: 'w', finger: 'left-ring' },
    { key: 'e', finger: 'left-middle' }, { key: 'r', finger: 'left-index' },
    { key: 't', finger: 'left-index' }, { key: 'y', finger: 'right-index' },
    { key: 'u', finger: 'right-index' }, { key: 'i', finger: 'right-middle' },
    { key: 'o', finger: 'right-ring' }, { key: 'p', finger: 'right-pinky' },
  ],
  [
    { key: 'a', finger: 'left-pinky' }, { key: 's', finger: 'left-ring' },
    { key: 'd', finger: 'left-middle' }, { key: 'f', finger: 'left-index' },
    { key: 'g', finger: 'left-index' }, { key: 'h', finger: 'right-index' },
    { key: 'j', finger: 'right-index' }, { key: 'k', finger: 'right-middle' },
    { key: 'l', finger: 'right-ring' },
  ],
  [
    { key: 'z', finger: 'left-pinky' }, { key: 'x', finger: 'left-ring' },
    { key: 'c', finger: 'left-middle' }, { key: 'v', finger: 'left-index' },
    { key: 'b', finger: 'left-index' }, { key: 'n', finger: 'right-index' },
    { key: 'm', finger: 'right-index' },
  ],
];

const fingerColors = {
  'left-pinky': 'bg-pink-600',
  'left-ring': 'bg-purple-600',
  'left-middle': 'bg-blue-600',
  'left-index': 'bg-green-600',
  'right-index': 'bg-yellow-600',
  'right-middle': 'bg-orange-600',
  'right-ring': 'bg-red-600',
  'right-pinky': 'bg-rose-600',
  'none': 'bg-gray-600',
};

const VirtualKeyboard = ({ currentWord, userInput }) => {
  const nextKey = currentWord.charAt(userInput.length)?.toLowerCase() || '';

  const getKeyStyle = (keyInfo) => {
    const baseStyle =
      'flex items-center justify-center font-bold text-lg transition-all duration-200 rounded m-0.5 w-10 h-10 ';
    const fingerColor = fingerColors[keyInfo.finger];

    if (keyInfo.key === nextKey) {
      return `${baseStyle} ${fingerColor} text-white transform scale-125 shadow-xl ring-4 ring-white ring-opacity-50 animate-pulse z-10`;
    }

    const isHomeKey = 'asdfghjkl'.includes(keyInfo.key);
    if (isHomeKey && keyInfo.finger !== 'none') {
      return `${baseStyle} ${fingerColor} text-white border-b-4 border-opacity-50 border-white`;
    }

    return `${baseStyle} ${fingerColor} text-white opacity-80`;
  };

  return (
    <div className="mt-6 bg-purple-900 p-4 rounded-lg">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1">
          {row.map((keyInfo) => (
            <div key={keyInfo.key} className={getKeyStyle(keyInfo)}>
              {keyInfo.key.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-1">
        <div className="w-80 h-10 rounded m-0.5 bg-gray-600 text-white flex items-center justify-center">
          SPACE
        </div>
      </div>
      <div className="mt-4 border-t border-purple-700 pt-4">
        <div className="h-32 w-full">
          <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
            {/* Left Hand */}
            <g transform="translate(30, 10)">
              <rect x="20" y="70" width="120" height="40" rx="20" fill="#4a5568" />
              <rect x="30" y="10" width="20" height="65" rx="10" fill="#db2777" />
              <rect x="60" y="0" width="20" height="75" rx="10" fill="#7c3aed" />
              <rect x="90" y="0" width="20" height="80" rx="10" fill="#2563eb" />
              <rect x="120" y="5" width="20" height="70" rx="10" fill="#16a34a" />
              <rect x="15" y="75" width="40" height="20" rx="10" transform="rotate(-30 15 85)" fill="#4a5568" />
            </g>
            {/* Right Hand */}
            <g transform="translate(370, 10) scale(-1, 1)">
              <rect x="20" y="70" width="120" height="40" rx="20" fill="#4a5568" />
              <rect x="30" y="10" width="20" height="65" rx="10" fill="#e11d48" />
              <rect x="60" y="0" width="20" height="75" rx="10" fill="#dc2626" />
              <rect x="90" y="0" width="20" height="80" rx="10" fill="#ea580c" />
              <rect x="120" y="5" width="20" height="70" rx="10" fill="#ca8a04" />
              <rect x="15" y="75" width="40" height="20" rx="10" transform="rotate(-30 15 85)" fill="#4a5568" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Update the MarioCharacter component
const MarioCharacter = () => {
  return (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
      <img
        src="https://raw.githubusercontent.com/RadoslavPetkow/Super_mario/main/Super_mario/assets/sprites/mario.png"
        alt="🎮"
        className="w-8 h-8"
        onError={(e) => {
          e.target.onerror = null;
          e.target.replaceWith(document.createTextNode('🎮'));
        }}
      />
    </div>
  );
};

const correctSound = 'data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAA5TEFNRTMuOTlyAc0AAAAAAAAAABSAJAOkQgAAgAAABobXqlfKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';

const wrongSound = 'data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAA5TEFNRTMuOTlyAc0AAAAAAAAAABSAJAOkQgAAgAAABobXqlfKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';

const TypingGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'finished'
  const [accuracy, setAccuracy] = useState(100);
  const [totalTyped, setTotalTyped] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Game duration in seconds
  const [level, setLevel] = useState(1);
  const [correctChars, setCorrectChars] = useState(0);  // Track correct keystrokes

  // Add audio refs
  const correctAudioRef = useRef(new Audio(correctSound));
  const wrongAudioRef = useRef(new Audio(wrongSound));

  // Replace the getNewWord function
  const getNewWord = useCallback(() => {
    return getRandomLine(level);
  }, [level]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setCurrentWord(getNewWord());
    setUserInput('');
    setScore(0);
    setTotalTyped(0);
    setAccuracy(100);
    setTimeLeft(60);
  }, [getNewWord]);

  const checkInput = useCallback(
    (input) => {
      if (gameState !== 'playing') return;

      if (input.length > userInput.length) {
        // New character typed
        const lastTypedChar = input.charAt(input.length - 1).toLowerCase();
        const expectedChar = currentWord.charAt(userInput.length).toLowerCase();

        setTotalTyped((prev) => prev + 1);
        if (lastTypedChar === expectedChar) {
          correctAudioRef.current.currentTime = 0;  // Reset audio to start
          correctAudioRef.current.play();
          setCorrectChars((prev) => prev + 1);
          setUserInput(input);
          if (input === currentWord) {
            setScore(prev => prev + 1);
            setCurrentWord(getNewWord());
            setUserInput('');
          }
        } else {
          wrongAudioRef.current.currentTime = 0;  // Reset audio to start
          wrongAudioRef.current.play();
        }
      } else if (input.length < userInput.length) {
        // Backspace pressed
        setTotalTyped((prev) => prev - 1);
        if (userInput.charAt(userInput.length - 1).toLowerCase() === 
            currentWord.charAt(userInput.length - 1).toLowerCase()) {
          setCorrectChars((prev) => prev - 1);
        }
        setUserInput(input);
      }
    },
    [currentWord, userInput, gameState, getNewWord]
  );

  const stopGame = useCallback(() => {
    setGameState('finished');
    setTimeLeft(0);
  }, []);

  // Calculate accuracy based on correct characters vs total typed
  useEffect(() => {
    if (totalTyped > 0) {
      setAccuracy(Math.round((correctChars / totalTyped) * 100));
    } else {
      setAccuracy(100);
    }
  }, [correctChars, totalTyped]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  return (
    <div className="min-h-screen bg-purple-900 text-white p-8 font-mono">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-yellow-300 text-center">Typing Adventure</h1>

        <div className="bg-purple-800 rounded-lg p-6 mb-6 shadow-lg border-4 border-purple-600">
          <div className="flex justify-between mb-4">
            <div className="text-yellow-300">Score: {score}</div>
            <div className="text-green-400">Accuracy: {accuracy}%</div>
            {gameState === 'playing' && (
              <div className="text-blue-400">Time Left: {timeLeft}s</div>
            )}
          </div>

          {/* Level selection */}
          <div className="mb-4 text-center">
            <label className="mr-2">Select Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="text-black rounded p-1"
              disabled={gameState === 'playing'}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl}
                </option>
              ))}
            </select>
          </div>

          {gameState === 'waiting' && (
            <button
              onClick={startGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              Start Game
            </button>
          )}

          {gameState === 'playing' && (
            <>
              {/* Word display with Mario jumping above the next letter */}
              <div className="text-4xl text-center mb-4 font-mono relative inline-block">
                {currentWord.split('').map((letter, index) => (
                  <span key={index} className="relative inline-block">
                    {/* Render Mario above the next letter to be typed */}
                    {index === userInput.length && (
                      <MarioCharacter key={userInput.length} />
                    )}
                    <span
                      className={`transition-colors duration-200 ${
                        letter === ' ' ? 'mx-3' : 'mx-1'  // Just a bit more spacing for spaces
                      } ${
                        index < userInput.length
                          ? userInput[index].toLowerCase() === letter.toLowerCase()
                            ? 'text-green-400'
                            : 'text-red-400'
                          : index === userInput.length
                          ? 'text-cyan-300 animate-pulse'
                          : 'text-purple-400'
                      }`}
                    >
                      {letter === ' ' ? '⎵' : letter}  {/* Using space bar symbol ⎵ */}
                    </span>
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => checkInput(e.target.value)}
                  className="flex-1 bg-purple-700 text-white text-2xl p-4 rounded-lg border-2 border-purple-500 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                <button
                  onClick={stopGame}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg"
                >
                  Stop Game
                </button>
              </div>
              <VirtualKeyboard currentWord={currentWord} userInput={userInput} />
            </>
          )}

          {gameState === 'finished' && (
            <>
              <div className="text-3xl text-center mb-4">Time's Up!</div>
              <div className="text-2xl text-center mb-4">Your final score is: {score}</div>
              <button
                onClick={startGame}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Restart Game
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingGame;
