import { Route, Routes } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import HomePage from "./pages/HomePage";
import LearnMore from "./components/LearnMore";
import SignIn from "./pages/SignIn";
import CitizenRegistration from "./pages/Citizen_Register";
import PoliceRegistration from "./pages/Police_Register";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <>
      <AlertProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminUsers/>} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register_citizen" element={<CitizenRegistration />} />
          <Route path="/register_police" element={<PoliceRegistration />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </AlertProvider>
    </>
  );
}

export default App;
