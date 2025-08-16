import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import { useAlert } from "../../context/AlertContext/AlertContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { carteirasValidationSchema } from "../../validation/carteirasValidation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useWallet } from "../../context/WalletContext/WalletContext";
import { convertToBTC } from "../../utils/conversion";

const EditModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { editWallet } = useWallet();
    
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ 
    resolver: yupResolver(carteirasValidationSchema)
  });
  
  const [ quote, setQuote ] = useState<string>('0');
  
  const handleConversionEdit = async (  event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(event.target.value);
    
    if (isNaN(value)) return;

      const btcValue = await convertToBTC(value);
      const formatBTC = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      }).format(btcValue);

    setQuote(formatBTC);
  }
  
  const onSubmit = async (data: any) => {
    console.log('Dados validados: ', data);
    console.log(modal);

  try {
    const valorBrl = parseFloat(data.valor_carteira);
    const valorBtc = await convertToBTC(valorBrl);

    const updatedData = {
      ...data,
      valor_brl: valorBrl,
      valor_btc: valorBtc
    };

    const response = await axios.patch(
      `http://localhost:3000/users/${modal.data.id}`,
      updatedData
    );

    if (response.status === 200 || response.status === 204) {
      editWallet(updatedData);
      showAlert('Carteira editada com sucesso!', 'success');
      closeModal();
      reset(updatedData);
    }
  } catch (error) {
    showAlert('Erro ao editar carteira!', 'error');
    console.error('Erro ao editar carteira! \n', error);
  }
  }

  useEffect(() => {
  if (modal.type === 'edit' && modal.data) {
    const valorBrl = modal.data.valor_brl ?? modal.data.valor_carteira;

    const dataToReset = {
      ...modal.data,
      valor_carteira: valorBrl
    };

    reset(dataToReset);

    convertToBTC(valorBrl).then((btcValue) => {
      const formatBTC = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 8,
        maximumFractionDigits: 8
      }).format(btcValue);

      setQuote(formatBTC);
    });
  }
  }, [modal, reset])

  return (
    <BasicModal title="Edit Item" open={modal.type === 'edit'} onClose={closeModal} className="edit-modal">
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
            <TextField 
              label="Valor de compra" 
              {...register("valor_carteira")} 
              error={!!errors.valor_carteira} 
              helperText={errors.valor_carteira?.message} 
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                },
              }} 
              type="number" 
              size="small" 
              onBlur={handleConversionEdit}
            />
            <Typography variant="h3">BTC {quote}</Typography>
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