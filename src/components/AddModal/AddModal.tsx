import { Box, TextField, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";

const AddModal = () => {
    const { modal, closeModal } = useModal();
    
    const handleAdd = () => {
        // Logic to handle adding a new wallet
        closeModal();
    }

    return (
      <BasicModal title="Adicionar Item" open={modal.type === 'add'} onClose={closeModal} className="add-modal">
        <Typography variant="h3">
          Adicionar Carteira
        </Typography>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className=""
        >
            <div className="input-fields">
                <TextField id="nome" label="Nome" type="search" size="small" fullWidth />
                <TextField id="sobrenome" label="Sobrenome" type="search" size="small" fullWidth />
                <TextField id="email" label="Email" type="search" size="small" fullWidth />
                <div className="buy-fields">
                  <TextField id="valorCompra" label="Valor de compra" type="search" size="small" />
                  <Typography variant="h3">BTC 0.12345</Typography>
                </div>
                
                <div className="btns">
                  <button className="cancel" onClick={closeModal}>Cancelar</button>
                  <button className="btn-blue add-wallet">Adicionar Carteira</button>
                </div>
            </div>
        </Box>
      </BasicModal>
    )
}

export default AddModal;