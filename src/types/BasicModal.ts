export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  open: boolean;
}