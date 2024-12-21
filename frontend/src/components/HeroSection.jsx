import { useEffect, useState } from "react";

const words = ["Safety", "Awareness", "Unity"];

const colors = {
  Safety: "bg-gradient-to-r from-purple-500 to-purple-700",
  Awareness: "bg-gradient-to-r from-yellow-500 to-orange-500",
  Unity: "bg-gradient-to-r from-purple-500 to-pink-500",
};

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const interval = setInterval(() => {
      if (direction === "forward") {
        if (displayedText.length < currentWord.length) {
          setDisplayedText((prev) => prev + currentWord[displayedText.length]);
        } else {
          setDirection("backward");
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          setDirection("forward");
          setIndex((prev) => {
            const newIndex = (prev + 1) % words.length;
            setCurrentWord(words[newIndex]);
            return newIndex;
          });
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, [displayedText, direction, currentWord]);

  return (
    <div className="py-16 px-6 sm:px-8 md:px-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Empowering <span className={`text-transparent ${colors[currentWord]} bg-clip-text`}>{displayedText}</span> <br/>for a Safer Tomorrow
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            AlertNet bridges the gap between law enforcement and the public, enabling real-time alerts and easy reporting. Stay informed, connect seamlessly, and play a vital role in ensuring public safety.
          </p>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 flex justify-end">
          <img
            src="/search-database.jpg"
            alt="Search Database Illustration"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-auto transition duration-300 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
