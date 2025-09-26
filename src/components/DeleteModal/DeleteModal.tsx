import { Box, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import './DeleteModal.css';
import { useAlert } from "../../context/AlertContext/AlertContext";
import { useWallet } from "../../context/WalletContext/WalletContext";
import TrashIcon from "../../assets/trash-icon";
import type React from "react";

const DeleteModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { deleteWallet } = useWallet();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await deleteWallet(modal.data.id);
      showAlert('Carteira removida com sucesso!', 'success');
      closeModal();
    } catch(error) {
      showAlert('Erro ao remover carteira!', 'error');
      console.error('Erro ao remover carteira \n', error);
    }
  }

  return (
    <BasicModal title="Excluir Item" open={modal.type === 'delete'} onClose={closeModal} className="delete-modal">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="form-delete-modal"
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