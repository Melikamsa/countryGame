"use client";
import { useEffect, useState } from "react";
import "../../styles/globals.css";

const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Alphabet() {
  const [country, setCountry] = useState<string | null>("");

  useEffect(()=>{

  },[])

  return (
    <section className="bgAll py-10 px-4">
      <h2>country page</h2>

      <div className="grid grid-cols-7 gap-3 my-10">
        {alphabet.map((letter, index) => (
          <button
            onClick={() => {
              return console.log(letter);
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
