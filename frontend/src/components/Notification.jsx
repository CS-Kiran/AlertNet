import { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

const Notification = ({ role, id, name }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const { showAlert } = useAlert();


  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/notifications/receiver/${id}`
        );

        // Filter notifications based on the role and id
        const filteredNotifications = response.data.filter((notif) => {
          return (
            (role == "citizen" &&
              notif.senderRole !== "citizen" &&
              notif.receiverId == id) ||
            (role == "police" &&
              notif.senderRole !== "police" &&
              notif.receiverId == id) ||
            name == notif.senderName
          );
        });

        filteredNotifications.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setNotifications(filteredNotifications);
        setLoading(false);
        console.log(notifications);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [id, role]); // Added role to the dependency array

  const handleSendNotification = async () => {
    if (!message || !receiverId) {
      showAlert("info", "Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        senderId: id,
        senderRole: role,
        senderName: name,
        message,
        receiverId,
        receiverRole: role === "citizen" ? "police" : "citizen",
      };

      const response = await axios.post(
        "http://localhost:8080/api/notifications",
        payload
      );
      if (response.status === 200) {
        showAlert("success", "Notification sent successfully!");
        setNotifications((prev) => [...prev, response.data]);
        setShowModal(false);
      } else {
        showAlert("error", "Failed to send notification.");
      }
    } catch (error) {
      showAlert("error", "Error sending notification." + error);
    }

    // Reset fields
    setMessage("");
    setReceiverId("");
  };

  return (
    <>
      <h2 className="text-5xl text-center font-bold text-blue-600 mb-4">
        Notifications
      </h2>
      {/* Send Notification Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-green-700 to-green-600 font-bold text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200 absolute top-6 right-6"
      >
        Send Notification
      </button>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-6 relative">
        {loading && (
          <p className="text-center text-gray-500">Loading notifications...</p>
        )}

        {!loading && notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications to show.</p>
        )}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.notificationId}
              className={`p-6 max-w-[35rem] border rounded-lg shadow-md ${
                name === notif.senderName ? "bg-gradient-to-r ml-[10rem] from-gray-300 to-gray-200 text-gray-800" : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">{notif.message}</p>
                <span className="text-sm">
                  {new Date(notif.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm">
                From: {notif.senderId} ({notif.senderRole.toUpperCase()})
              </p>
            </div>
          ))}
        </div>

        {/* Send Notification Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-3xl text-center font-bold text-green-700 mb-4">
                Notification
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Send To
                </label>
                <input
                  type="text"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  placeholder="Enter Receiver's ID"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your notification message"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSendNotification}
                  className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
