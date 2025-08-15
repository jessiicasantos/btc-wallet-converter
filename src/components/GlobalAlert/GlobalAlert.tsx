import Alert from '@mui/material/Alert';
import { useAlert } from "../../context/AlertContext/AlertContext";

const GlobalAlert = () => {
  const { message, type } = useAlert();

  if (!message || !type) return null;

  return (
    <Alert severity={type} sx={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
      {message}
    </Alert>
  );
};

export default GlobalAlert;