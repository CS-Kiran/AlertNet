import { useEffect, useState } from 'react';

const LocationSelector = ({ onLocationSelect, formData, handleInputChange }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true); // Toggle state

  useEffect(() => {
    if (useCurrentLocation) {
      const getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const formattedLocation = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
              setCurrentLocation({ latitude, longitude });
              setManualLocation(formattedLocation);
              onLocationSelect(formattedLocation);
              setMapEmbedUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&h1=es&z=14&output=embed`);
            },
            (error) => {
              console.error("Error getting location: ", error);
              setCurrentLocation(null);
              setManualLocation('');
              onLocationSelect('');
              setMapEmbedUrl(''); // Ensure map is cleared on error
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
          setCurrentLocation(null);
          setManualLocation('');
          onLocationSelect('');
          setMapEmbedUrl(''); // Ensure map is cleared if geolocation is not supported
        }
      };

      getCurrentLocation();
    } else {
      // Reset map and coordinates when switching to manual input
      setCurrentLocation(null);
      setMapEmbedUrl(''); // Clear map URL when switching to manual
    }
  }, [useCurrentLocation, onLocationSelect]);

  const handleManualLocationChange = (e) => {
    const location = e.target.value;
    setManualLocation(location);
    handleInputChange(e); // Update the parent component's state for the last seen location

    // Split the input to get latitude and longitude
    const coords = location.split(',');
    if (coords.length === 2) {
      const latitude = parseFloat(coords[0]);
      const longitude = parseFloat(coords[1]);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setMapEmbedUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&h1=es&z=14&output=embed`);
        setCurrentLocation({ latitude, longitude });
        onLocationSelect(location); // Update parent with the manual location
      } else {
        console.warn("Invalid coordinates");
        setMapEmbedUrl(''); // Clear map if the coordinates are invalid
      }
    } else {
      // Reset map if the input is invalid
      setMapEmbedUrl('');
      setCurrentLocation(null);
      onLocationSelect(''); // Clear the location on invalid input
    }
  };

  const handleToggleChange = () => {
    setUseCurrentLocation((prev) => !prev);
    if (!useCurrentLocation) {
      setManualLocation(''); // Clear manual input if switching to current location
      setMapEmbedUrl(''); // Clear the map when switching modes
      setCurrentLocation(null); // Reset the current location
    }
  };

  return (
    <div>
      <label className="block text-gray-600 font-medium mb-2">Select Location Method</label>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="currentLocation"
          name="locationMethod"
          checked={useCurrentLocation}
          onChange={handleToggleChange}
          className="mr-2"
        />
        <label htmlFor="currentLocation" className="mr-4">Use Current Location</label>

        <input
          type="radio"
          id="manualLocation"
          name="locationMethod"
          checked={!useCurrentLocation}
          onChange={handleToggleChange}
          className="mr-2"
        />
        <label htmlFor="manualLocation">Manual Input</label>
      </div>

      {useCurrentLocation && currentLocation ? (
        <iframe
          src={mapEmbedUrl}
          style={{ width: '100%', height: '300px', border: '0' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      ) : (
        !useCurrentLocation && (
          <div>
            <label className="block text-gray-600 font-medium">Last Seen Location</label>
            <input
              type="text"
              name="lastSeenLocation"
              value={manualLocation}
              onChange={handleManualLocationChange} // Handle input changes
              placeholder="Last seen location (latitude, longitude)"
              className="w-full border border-gray-300 p-2 rounded-lg mt-2"
            />
            {mapEmbedUrl && (
              <iframe
                src={mapEmbedUrl}
                style={{ width: '100%', height: '300px', border: '0', marginTop: '10px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            )}
          </div>
        )
      )}

      <p className="text-gray-700 mt-2">
        Selected Coordinates: {currentLocation ? `${currentLocation.latitude.toFixed(5)}, ${currentLocation.longitude.toFixed(5)}` : "No location selected."}
      </p>
    </div>
  );
};

export default LocationSelector;
