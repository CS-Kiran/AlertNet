import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const words = ["Security", "Awareness", "AlertNet"];

const colors = {
  Security: "bg-gradient-to-r from-[#7b4397] to-[#dc2430]",
  Awareness: "bg-gradient-to-r from-[#6a3093] to-[#a044ff]",
  AlertNet: "bg-gradient-to-r from-blue-800 to-blue-500",
};

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [displayedText, setDisplayedText] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const interval = setInterval(() => {
      if (direction === "forward") {
        if (displayedText.length < currentWord.length) {
          // Add one character at a time
          setDisplayedText((prev) => prev + currentWord[displayedText.length]);
        } else {
          // Move to the next word
          setDirection("backward");
        }
      } else {
        if (displayedText.length > 0) {
          // Remove one character at a time
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          // Move to the next word
          setDirection("forward");
          setIndex((prev) => {
            const newIndex = (prev + 1) % words.length; // Cycle through words
            setCurrentWord(words[newIndex]); // Update currentWord with new index
            return newIndex; // Return the new index for state update
          });
        }
      }
    }, 150); // Adjust the speed here

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedText, direction]);

  return (
    <div className="py-16 px-10 mt-14">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="lg:w-1/2 text-center lg:text-left ml-5">
          <h1 className="text-6xl font-bold text-gray-800 mb-8">
            We Promote <span className={`text-transparent ${colors[currentWord]} bg-clip-text`}>{displayedText}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-14">
            AlertNet is a modern system designed to help police
            broadcast alerts about missing and wanted individuals, and to
            empower citizens to report cases with ease. <p className="text-xl text-gray-800 font-bold">Stay informed, stay
            connected, and contribute to public safety.</p>
          </p>
          <Link to='/learn-more' className="bg-blue-600 text-white py-4 font-semibold px-6 rounded hover:bg-blue-700 transition duration-300">
            Learn More
          </Link>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src="/search-database.jpg"
            alt="Search Database"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
