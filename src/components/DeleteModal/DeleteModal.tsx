import { Box, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import TrashIcon from '../../assets/trash-icon.svg';
import './DeleteModal.css';

const DeleteModal = () => {
    const { modal, closeModal } = useModal();

    return (
      <BasicModal title="Excluir Item" open={modal.type === 'delete'} onClose={closeModal} className="delete-modal">
        <Box
          component="form"
          // sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          className=""
        >
          <div className="circle">
            <img src={TrashIcon} alt="Ícone de deletar" className="icon" />
          </div>
          <Typography variant="h3">
            Excluir Carteira
          </Typography>
          <Typography variant="body1">
            Tem certeza que deseja excluir essa Carteira?<br />
            Esta ação não poderá ser desfeita.
          </Typography>
          <div className="btns">
            <button className="cancel" onClick={closeModal}>Cancelar</button>
            <button className="btn-red btn-delete">Excluir</button>
          </div>
        </Box>
      </BasicModal>
    )
}

export default DeleteModal;