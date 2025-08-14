import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './BasicModal.css';
import type { ModalProps } from '../../types/BasicModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<ModalProps> = ({ children, onClose, open, className }) => {
  return (
    <div>
      {/* <Button>Open modal</Button> */}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`modal ${className ?? ''}`}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;