import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import LearnMore from "../components/LearnMore";

const HomePage = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <Navbar />
        <HeroSection />
        <LearnMore/>
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;
