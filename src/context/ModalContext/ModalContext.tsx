import { createContext, useContext, useState } from 'react';

type ModalType = 'add' | 'edit' | 'delete' | null;

interface ModalState {
  type: ModalType;
  data?: any;
}

interface ModalContextProps {
  modal: ModalState;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (type: ModalType, data?: any) => setModal({ type, data });
  const closeModal = () => setModal({ type: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};