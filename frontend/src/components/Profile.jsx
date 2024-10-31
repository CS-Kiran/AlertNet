const Profile = ({ role, userDetails, onEditProfile }) => {
  return (
    <div className="container max-w-xl p-8 bg-white rounded-lg shadow-xl mx-auto my-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 shadow-md rounded-lg p-4 bg-gray-100">
        {role === 'police' ? 'Police Profile' : 'Citizen Profile'}
      </h1>

      {role === 'police' ? (
        <div className="police-info space-y-4">
          <p className="text-gray-700">
            <strong>ID:</strong> <span className="text-gray-500">{userDetails.police_id}</span>
          </p>
          <p className="text-gray-700">
            <strong>Name:</strong> <span className="text-gray-500">{userDetails.name}</span>
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> <span className="text-gray-500">{userDetails.email}</span>
          </p>
          <p className="text-gray-700">
            <strong>Badge Number:</strong> <span className="text-gray-500">{userDetails.badge_number}</span>
          </p>
          <p className="text-gray-700">
            <strong>Department:</strong> <span className="text-gray-500">{userDetails.department}</span>
          </p>
          <p className="text-gray-700">
            <strong>Date of Birth:</strong> <span className="text-gray-500">{userDetails.dob}</span>
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> <span className="text-gray-500">{userDetails.phone}</span>
          </p>
          <p className="text-gray-700">
            <strong>Gender:</strong> <span className="text-gray-500">{userDetails.gender}</span>
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> <span className="text-gray-500">{userDetails.address}</span>
          </p>
          <p className="text-gray-700">
            <strong>Station Address:</strong> <span className="text-gray-500">{userDetails.station_address}</span>
          </p>
          <p className="text-gray-700">
            <strong>Years of Service:</strong> <span className="text-gray-500">{userDetails.years_of_service}</span>
          </p>
          <p className="text-gray-700">
            <strong>Emergency Contact:</strong> <span className="text-gray-500">{userDetails.emergency_contact_name}</span>
          </p>
          <p className="text-gray-700">
            <strong>Emergency Contact Phone:</strong> <span className="text-gray-500">{userDetails.emergency_contact_phone}</span>
          </p>
          <p className="text-gray-700">
            <strong>Emergency Contact Relation:</strong> <span className="text-gray-500">{userDetails.emergency_contact_relation}</span>
          </p>
          <p className="text-gray-700">
            <strong>Government ID Proof:</strong> <span className="text-gray-500">{userDetails.gov_id_proof_path}</span>
          </p>
          <p className="text-gray-700">
            <strong>Account Status:</strong> <span className="text-gray-500">{userDetails.account_status}</span>
          </p>
        </div>
      ) : (
        <div className="citizen-info space-y-4">
          <p className="text-gray-700">
            <strong>ID:</strong> <span className="text-gray-500">{userDetails.id}</span>
          </p>
          <p className="text-gray-700">
            <strong>Name:</strong> <span className="text-gray-500">{userDetails.name}</span>
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> <span className="text-gray-500">{userDetails.email}</span>
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> <span className="text-gray-500">{userDetails.phone}</span>
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> <span className="text-gray-500">{userDetails.address}</span>
          </p>
          <p className="text-gray-700">
            <strong>Account Status:</strong> <span className="text-gray-500">{userDetails.account_status}</span>
          </p>
        </div>
      )}

      <button 
        onClick={onEditProfile} 
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-all transform hover:translate-y-1"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
