export type ModalType = 'add' | 'edit' | 'delete' | null;

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  open: boolean;
}

export interface ModalState {
  type: ModalType;
  data?: any;
}

export interface ModalContextProps {
  modal: ModalState;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}