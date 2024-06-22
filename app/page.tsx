"use client";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface countries {
  name: { common: string };
}

export default function Page() {
  const [country, setCountry] = useState<countries[]>([]);
  const [randomCountry, setRandomCountry] = useState<countries | null>(null);
  const [btnChange, setBtnChange] = useState<boolean>(true);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

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
  };

  const handleLetterClick = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  return (
    <section className="bgAll py-10 px-4">
      <h2 className="text-center">country game</h2>

      <div className="my-10">
        <button
          onClick={getRandomCountry}
          className="bg-blue-500 text-white text-center py-2 px-4 rounded-md mb-5"
        >
          {btnChange ? <span>start</span> : <span> change country</span>}
        </button>
        {/* {console.log(randomCountry?.name.common)} */}
        {randomCountry && randomCountry.name && randomCountry.name.common && (
          <div className="flex flex-wrap justify-center">
            {randomCountry.name.common.split("").map((letterCountry, index) => {
              return (
                <h3
                  key={index}
                  className="bg-white m-1 text-[#1A237E] font-bold text-center p-2 rounded-md"
                >
                  {guessedLetters.includes(letterCountry.toUpperCase())
                    ? letterCountry
                    : "_"}
                  {/* {letterCountry} */}
                </h3>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-3 my-10">
        {alphabet.map((letter, index) => (
          <button
            onClick={() => {
              return handleLetterClick(letter);
            }}
            key={index}
            className="bg-white text-[#1A237E] font-bold text-center p-2 rounded-md"
          >
            {letter}
          </button>
        ))}
      </div>
    </section>
  );
}
