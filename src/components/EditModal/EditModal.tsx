import { Box, TextField, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import { useAlert } from "../../context/AlertContext/AlertContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { carteirasValidationSchema } from "../../validation/carteirasValidation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useWallet } from "../../context/WalletContext/WalletContext";

const EditModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { editWallet } = useWallet();
    
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ 
    resolver: yupResolver(carteirasValidationSchema)
  });
  
  const onSubmit = async (data: any) => {
    console.log('Dados validados: ', data);
    console.log(modal);

    try {
      let response = await axios.patch(
        `http://localhost:3000/users/${modal.data.id}`,
        data
      );

      if(response.status === 200 || response.status === 204) {
        console.log('Carteira adicionada com sucesso!');

        console.log('data: ', data);
        
        editWallet(data);
        showAlert('Carteira adicionada com sucesso!', 'success');
        closeModal();
        reset(data);
      }
    } catch(error) {
      showAlert('Erro ao adicionar carteira!', 'error');
      console.error('Errooo!!! \n', error);
    }
  }

  useEffect(() => {
    if(modal.type === 'edit' && modal.data) {
      reset(modal.data);
    }
  }, [])

  return (
    <BasicModal title="Adicionar Item" open={modal.type === 'edit'} onClose={closeModal} className="edit-modal">
      <Typography variant="h3">
        Editar Carteira
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className="form-edit-wallet"
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
            <button className="btn-blue edit" type="submit">Editar Carteira</button>
          </div>
        </div>
      </Box>
    </BasicModal>
  )
}

export default EditModal;