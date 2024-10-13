import { createContext, useState, useContext } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 2000); // You can adjust this timeout
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
    </AlertContext.Provider>
  );
};
