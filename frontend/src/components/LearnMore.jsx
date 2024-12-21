const LearnMore = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-8">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          How AlertNet Solves the Problem
        </h2>
        <p className="text-lg text-gray-600">
          A modern solution bridging the gap between authorities and citizens, ensuring faster response and enhanced safety.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 max-w-7xl mx-auto">
        {/* Problem Description */}
        <div className="flex-1 p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">The Problem</h3>
          <p className="text-gray-600">
            Traditional methods of disseminating information about missing or wanted individuals are inefficient and slow. Citizens often face hurdles in reporting critical information, leading to delays that can risk public safety.
          </p>
        </div>

        {/* Solution Description */}
        <div className="flex-1 p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">The Solution</h3>
          <p className="text-gray-600">
            AlertNet empowers police to broadcast alerts instantly and enables citizens to report information effortlessly, creating a streamlined communication platform that enhances public safety and operational efficiency.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature: Instant Alerts */}
        <div className="p-8 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Instant Alerts</h3>
          <p className="text-gray-600">
            Police can broadcast detailed alerts about missing and wanted individuals to the public in real-time, reducing delays.
          </p>
        </div>

        {/* Feature: Effortless Reporting */}
        <div className="p-8 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Effortless Reporting</h3>
          <p className="text-gray-600">
            Citizens can report sightings or provide critical information with a single click, ensuring quick communication with authorities.
          </p>
        </div>

        {/* Feature: Enhanced Safety */}
        <div className="p-8 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Public Safety</h3>
          <p className="text-gray-600">
            Faster alerts and simplified reporting improve public safety and optimize the efficiency of law enforcement efforts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
