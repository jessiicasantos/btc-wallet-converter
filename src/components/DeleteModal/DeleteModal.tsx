import { Box, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
// import TrashIcon from '../../assets/trash-icon.svg';
import './DeleteModal.css';
import { useWallet } from "../../context/WalletContext/WalletContext";
import axios from "axios";
import { useAlert } from "../../context/AlertContext/AlertContext";
import TrashIcon from "../../assets/trash-icon";

const DeleteModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { deleteWallet } = useWallet();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    
    try {
      let response = await axios.delete(
        `http://localhost:3000/users/${modal.data.id}`
      );

      if(response.status === 200 || response.status === 204) {
        deleteWallet(modal.data.id);
        showAlert('Carteira removida com sucesso!', 'success');
        closeModal();
      }
    } catch(error) {
      showAlert('Erro ao remover carteira!', 'error');
      console.error('Errooo!!! \n', error);
    }
  }

  return (
    <BasicModal title="Excluir Item" open={modal.type === 'delete'} onClose={closeModal} className="delete-modal">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className=""
      >
        <div className="circle">
          <TrashIcon stroke="#E22849" className="icon" />
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
          <button className="btn-red btn-delete" onClick={handleDelete}>Excluir</button>
        </div>
      </Box>
    </BasicModal>
  )
}

export default DeleteModal;