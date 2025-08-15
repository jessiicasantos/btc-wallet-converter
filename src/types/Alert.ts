import { createContext } from "react";

export type AlertType = 'success' | 'error' | null;

export interface AlertContextProps {
  message: string;
  type: AlertType;
  showAlert: (msg: string, type: AlertType) => void;
  clearAlert: () => void;
}