import React, { createContext, useContext, useState } from "react";
import type { AlertContextProps, AlertType } from "../../types/Alert";

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>(null);
  
  const showAlert = (msg: string, type: AlertType) => {
    setMessage(msg);
    setType(type);
    
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };
  
  const clearAlert = () => {
    setMessage('');
    setType(null);
  };
  
  return (
    <AlertContext.Provider value={{ message, type, showAlert, clearAlert }}>
    {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if(!context) throw new Error('useAlert deve ser usado dentro de AlertProvider');
  return context;
};
