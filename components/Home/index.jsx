"use client";
import Link from "next/link";
import React from "react";


const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="pt-10 mb-40">countries game</h1>
      <Link href="/country">
        <button
          onClick={() => {
            console.log("start");
          }}
          className="text-white bg-[#1465e8] py-4 px-10 rounded-lg"
        >
          start
        </button>
      </Link>
    </div>
  );
};

export default Home;
