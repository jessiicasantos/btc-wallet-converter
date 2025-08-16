import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import axios from "axios";
import { carteirasValidationSchema } from "../../validation/carteirasValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAlert } from "../../context/AlertContext/AlertContext";
import { useWallet } from "../../context/WalletContext/WalletContext";
import { useState } from "react";
import { convertToBTC } from "../../utils/conversion";

const AddModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { addWallet } = useWallet();
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(carteirasValidationSchema)
  });
  const [ quote, setQuote ] = useState(0);

  const handleConversion = async (event: any) => {
    const value = event.target.value;

    try {
      let response = await axios.get(
        'https://economia.awesomeapi.com.br/json/last/BTC-BRL/'
      )

      let dataResponse = await response.data;

      let formatBTC: any = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BTC',
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      }).format(value / dataResponse.BTCBRL.bid).replace("BTC", "").trim();

      setQuote(formatBTC);
    } catch(error) {
      console.error('Errooooo!!!', error)
    }
  }
  
  const onSubmit = async (data: any) => {
    console.log('Dados validados: ', data);
    data.id = Date.now().toString();

    const valorBrl = parseFloat(data.valor_carteira);
    const valorBtc = await convertToBTC(valorBrl);

    const newWallet = {
      ...data,
      id: Date.now().toString(),
      valor_carteira: valorBrl,
      valor_btc: valorBtc
    };

    try {
      let response = await axios.post(
        'http://localhost:3000/users/',
        newWallet
      );

      if(response.status === 201) {
        console.log('Carteira adicionada com sucesso!');

        console.log('newWallet: ', newWallet);
        
        addWallet(newWallet);
        showAlert('Carteira adicionada com sucesso!', 'success');
        closeModal();
      }
    } catch(error) {
      showAlert('Erro ao adicionar carteira!', 'error');
      console.error('Errooo!!! \n', error);
    }
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
          <TextField {...register("sobrenome")} label="Sobrenome" error={!!errors.sobrenome} helperText={errors.sobrenome?.message} type="search" size="small" fullWidth />
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
              onBlur={handleConversion}
            />
            <Typography variant="h3">BTC {quote}</Typography>
          </div>
          
          <div className="btns">
            <button className="cancel" type="button" onClick={closeModal}>Cancelar</button>
            <button className="btn-blue add-wallet" type="submit" disabled={!quote}>Adicionar Carteira</button>
          </div>
        </div>
      </Box>
    </BasicModal>
  )
}

export default AddModal;