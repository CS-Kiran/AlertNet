import { MdClose } from "react-icons/md";
import { useEffect } from "react";

const DetailModal = ({ isOpen, onClose, title, details, citizenDetails }) => {
  // Close the modal when the user presses the Escape key
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center max-h-screen bg-gray-600 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-h-[95vh] overflow-y-auto relative">
        <MdClose
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-gray-700"
          onClick={onClose}
        />
        <div className="space-y-2">
          {/* Alert Details Section */}
          {details && Object.keys(details).length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-2xl text-blue-600 mb-2">
                Alert Details
              </h3>
              {details.imagePath && (
                <img
                  src={`http://localhost:8080/api/alerts/${details.imagePath
                    .split("/")
                    .pop()}`}
                  alt={details.name}
                  className="w-auto h-[20rem] object-cover rounded-lg transition-transform transform duration-300 hover:scale-105 mb-4"
                />
              )}
              {Object.entries(details)
                .filter(
                  ([key]) => !["imagePath", "policeId"].includes(key)
                )
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <strong>{key}:</strong>
                    <span>
                      {value !== null && value !== undefined ? value : "N/A"}
                    </span>
                  </div>
                ))}
            </div>
          )}

          {/* Citizen Details Section */}
          {citizenDetails && Object.keys(citizenDetails).length > 0 && (
            <div className="min-w-xl w-full max-h-[95vh] overflow-y-auto relative">
              <h3 className="font-bold text-2xl text-green-600 mb-2">
                Citizen Details
              </h3>
              {Object.entries(citizenDetails)
                .filter(
                  ([key]) => !["id", "accountStatus", "password"].includes(key)
                )
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <strong className="mr-10">{key}:</strong>
                    <span>
                      {value !== null && value !== undefined ? value : "N/A"}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
