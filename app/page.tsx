"use client";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { PiHeartFill, PiHeartBreakFill } from "react-icons/pi";

const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface countries {
  name: { common: string };
}

export default function Page() {
  const [country, setCountry] = useState<countries[]>([]);
  const [randomCountry, setRandomCountry] = useState<countries | null>(null);
  const [btnChange, setBtnChange] = useState<boolean>(true);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountry(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getRandomCountry = () => {
    const randomIndexCountry = Math.floor(Math.random() * country.length);
    setRandomCountry(country[randomIndexCountry]);
    setBtnChange(false);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
  };

  const handleLetterClick = (letter: string) => {
    if (!guessedLetters.includes(letter) && !gameOver) {
      setGuessedLetters([...guessedLetters, letter]);

      if (
        randomCountry &&
        randomCountry.name.common.toUpperCase().indexOf(letter) === -1
      ) {
        setIncorrectGuesses(incorrectGuesses + 1);
      }
    }
  };

  useEffect(() => {
    if (incorrectGuesses >= 4) {
      setGameOver(true);
    }
  }, [incorrectGuesses]);

  useEffect(() => {
    if (randomCountry && randomCountry.name && randomCountry.name.common) {
      const countryName = randomCountry.name.common.toUpperCase();
      const allLettersGuessed = countryName
        .split("")
        .every((letter) => guessedLetters.includes(letter));
      if (allLettersGuessed) {
        setLevel(level + 1);
        getRandomCountry();
      }
    }
  }, [guessedLetters]);

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 4; i++) {
      hearts.push(
        i < 4 - incorrectGuesses ? (
          <PiHeartFill
            key={i}
            style={{ color: i < 4 - incorrectGuesses ? "#E91E63" : "#9E9E9E" }}
          />
        ) : (
          <PiHeartBreakFill
            key={i}
            style={{ color: i < 4 - incorrectGuesses ? "#E91E63" : "#9E9E9E" }}
          />
        )
      );
    }

    return hearts;
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <section className="bgAll p-5 lg:text-xl 2xl:text-2xl xl:px-16">
      <div className="flex items-center justify-between ">
        <p>level {level}</p>
        <h2 className="text-center">country game</h2>
        <div className="flex items-center gap-1">{renderHearts()}</div>
      </div>

      <div className="my-10">
        {gameOver ? (
          <div className="text-center">
            <h2 className="text-[#D50000] my-10">Game Over</h2>
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              start again
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={getRandomCountry}
              className="bg-blue-500 text-white text-center py-2 px-4 rounded-md mb-5"
            >
              {btnChange ? <span>start</span> : <span> change country</span>}
            </button>
            {randomCountry &&
              randomCountry.name &&
              randomCountry.name.common && (
                <div className="grid grid-cols-7 gap-3 my-10">
                  {randomCountry.name.common
                    .split("")
                    .map((letterCountry, index) => {
                      return (
                        <h3
                          key={index}
                          className="bg-white text-[#1A237E] font-bold text-center p-2 rounded-md"
                        >
                          {guessedLetters.includes(letterCountry.toUpperCase())
                            ? letterCountry
                            : "-"}
                        </h3>
                      );
                    })}
                </div>
              )}
          </>
        )}
      </div>

      {!gameOver && (
        <div className="grid grid-cols-7 gap-3 mt-10">
          {alphabet.map((letter, index) => (
            <button
              onClick={() => {
                return handleLetterClick(letter);
              }}
              key={index}
              className="bg-white text-[#1A237E] font-bold text-center p-2 rounded-md "
            >
              {letter}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
