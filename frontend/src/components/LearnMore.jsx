import { Link } from "react-router-dom"; // Assuming you are using React Router

const LearnMore = () => {
  return (
    <div className="py-12 px-8 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">
        How AlertNet Solves the Problem
      </h2>

      {/* Problem Description */}
      <div className="text-lg text-gray-700 space-y-4 max-w-3xl text-center mb-8">
        <p className="animate-fadeInUp">
          In today’s fast-paced world, the challenge of quickly disseminating
          critical information such as details of missing or wanted individuals
          is more important than ever. Traditional methods of alerting the
          public often lead to delays and a lack of immediate response from
          citizens.
        </p>

        <p className="animate-fadeInUp delay-200">
          Moreover, citizens may find it difficult to report vital information
          to authorities, as there is no streamlined way to do so without
          complications. This not only hampers the efficiency of police
          operations but also risks public safety.
        </p>

        <p className="animate-fadeInUp delay-400">
          <strong>AlertNet</strong> addresses this by providing a modern
          platform where police can instantly broadcast alerts and citizens can
          respond effortlessly with one click. By connecting police departments
          and the public on a single platform, we aim to enhance public safety
          and streamline communication.
        </p>
      </div>

      {/* Solution Summary */}
      <div className="animate-fadeInUp delay-700 flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-8 w-full lg:w-auto">
        {/* Box 1: Immediate Broadcasting */}
        <div className="cursor-default border-2 border-gray-300 rounded-lg p-6 w-80 text-center transform duration-300 hover:scale-105">
          <h3 className="font-bold text-xl mb-4 text-blue-600">
            Instant Alerts
          </h3>
          <p className="text-gray-600">
            Police can broadcast detailed alerts about missing and wanted
            individuals to the public in real-time, reducing delays.
          </p>
        </div>

        {/* Box 2: Citizen Reporting */}
        <div className="cursor-default border-2 border-gray-300 rounded-lg p-6 w-80 text-center transform duration-300 hover:scale-105 delay-200">
          <h3 className="font-bold text-xl mb-4 text-blue-600">
            Effortless Reporting
          </h3>
          <p className="text-gray-600">
            Citizens can report any sightings or provide information with just a
            click, simplifying communication with authorities.
          </p>
        </div>

        {/* Box 3: Enhanced Safety */}
        <div className="cursor-default border-2 border-gray-300 rounded-lg p-6 w-80 text-center transform duration-300 hover:scale-105 delay-400">
          <h3 className="font-bold text-xl mb-4 text-blue-600">
            Public Safety
          </h3>
          <p className="text-gray-600">
            With faster alerts and easier reporting, public safety is
            significantly enhanced, improving overall law enforcement
            efficiency.
          </p>
        </div>
      </div>

      {/* Home Button */}
      <div className="mt-4 flex justify-center">
        <Link to="/" className="group">
          <div className="fixed left-4 top-4 border-2 border-blue-600 rounded-full p-2 transition-transform transform hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 text-blue-600 group-hover:text-blue-800 transform -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l9-9m0 0l9 9m-9-9v18"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LearnMore;
