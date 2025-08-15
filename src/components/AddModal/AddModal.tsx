import { Box, TextField, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import axios from "axios";
import { carteirasValidationSchema } from "../../validation/carteirasValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAlert } from "../../context/AlertContext/AlertContext";
import { useWallet } from "../../context/WalletContext/WalletContext";

const AddModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { addWallet } = useWallet();
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(carteirasValidationSchema)
  });
  
  const onSubmit = async (data: any) => {
    console.log('Dados validados: ', data);
    data.id = Date.now().toString();

    try {
      let response = await axios.post(
      'http://localhost:3000/users/',
      data
      );

      if(response.status === 201) {
        console.log('Carteira adicionada com sucesso!');

        console.log('data: ', data);
        
        addWallet(data);
        showAlert('Carteira adicionada com sucesso!', 'success');
        closeModal();
      }
    } catch(error) {
      showAlert('Erro ao adicionar carteira!', 'error');
      console.error('Errooo!!! \n', error);
    }
  }
  
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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className="form-add-wallet"
      >
        <div className="input-fields">
          <TextField {...register("nome")} label="Nome"  error={!!errors.nome} helperText={errors.nome?.message} type="search" size="small" fullWidth />
          <TextField  {...register("sobrenome")} label="Sobrenome" error={!!errors.sobrenome} helperText={errors.sobrenome?.message} type="search" size="small" fullWidth />
          <TextField {...register("email")} label="Email" error={!!errors.email} helperText={errors.email?.message} type="search" size="small" fullWidth />
          <div className="buy-fields">
            <TextField {...register("valor_carteira")} label="Valor de compra" error={!!errors.valor_carteira}  type="search" size="small" />
            <Typography variant="h3">BTC 0.12345</Typography>
          </div>
          
          <div className="btns">
            <button className="cancel" type="button" onClick={closeModal}>Cancelar</button>
            <button className="btn-blue add-wallet" type="submit">Adicionar Carteira</button>
          </div>
        </div>
      </Box>
    </BasicModal>
  )
}

export default AddModal;