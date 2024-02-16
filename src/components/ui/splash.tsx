// HeroSection.tsx
import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

import flashcardvector from "/Users/jacobdelott/projects/flashcard-maker/src/assets/flashcardvector.png";
import Splash2 from "./splash2";
import Footer from "./footer";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  py?: number;
  px?: number;
}

// eslint-disable-next-line no-empty-pattern
const Splash: React.FC<HeroSectionProps> = ({}) => {
  return (
    <div className="overflow-y-auto h-screen relative">
      <div className="bg-gray-200">
        {/* Added relative positioning to the parent container */}
        <div className="px-60 py-40 mx-20">
          <h1 className="text-4xl md:text-7xl font-bold px-20 py-2 pt-16">
            {" "}
            Flashcard Ai
          </h1>
          <h2 className="text-4xl md:text-2xl font-bold py-4 ml-20">
            {" "}
            Create all your flashcards fast!
          </h2>
          <div>
            <form className="flex-col items-center px-20">
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-full max-w-xs focus:outline-none focus:border-gray-500"
              />
              <div className="">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-full max-w-xs focus:outline-none focus:border-gray-500"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:text-black hover:bg-gray-100"
              >
                Login
              </button>
              <button
                type="submit"
                className="bg-gray-800 text-white font-bold py-2 px-4 mx-4 rounded hover:text-black hover:bg-gray-100"
              >
                Signup
              </button>
            </form>
          </div>
          {/* Adjusted positioning classes for the image container */}
          <div className="absolute top-0 right-0 mt-20 mx-60">
            <img src={flashcardvector} />
          </div>
        </div>
        <Splash2 />

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Splash;
