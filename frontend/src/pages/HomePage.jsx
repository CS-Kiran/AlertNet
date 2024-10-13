import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
};

export default HomePage;
