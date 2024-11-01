import { useEffect, useState } from 'react';

const LocationSelector = ({ onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const formattedLocation = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            setCurrentLocation({ latitude, longitude });
            onLocationSelect(formattedLocation); // Pass formattedLocation to parent
            setMapEmbedUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&h1=es&z=14&output=embed`);
          },
          (error) => {
            console.error("Error getting location: ", error);
            setCurrentLocation(null);
            onLocationSelect(''); // Ensure location is cleared on error
            setMapEmbedUrl(''); // Clear map on error
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setCurrentLocation(null);
        onLocationSelect(''); // Ensure location is cleared
        setMapEmbedUrl(''); // Clear map if geolocation is not supported
      }
    };

    getCurrentLocation();
  }, [onLocationSelect]);

  return (
    <div>
      <label className="block text-gray-600 font-medium mb-2">Using Current Location:</label>
      {currentLocation ? (
        <iframe
          src={mapEmbedUrl}
          style={{ width: '100%', height: '300px', border: '0' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      ) : (
        <p className="text-gray-700 mt-2">Fetching current location...</p>
      )}

      <p className="text-gray-700 mt-2">
        Selected Coordinates: {currentLocation ? `${currentLocation.latitude.toFixed(5)}, ${currentLocation.longitude.toFixed(5)}` : "No location selected."}
      </p>
    </div>
  );
};

export default LocationSelector;
