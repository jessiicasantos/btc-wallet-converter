import {
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useModal } from "../../context/ModalContext/ModalContext";
import BasicModal from "../BasicModal/BasicModal";
import { useAlert } from "../../context/AlertContext/AlertContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { carteirasValidationSchema } from "../../validation/carteirasValidation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useWallet } from "../../context/WalletContext/WalletContext";
import { convertToBTC } from "../../utils/conversion";
import type { Wallet, WalletFormData } from "../../types/Wallet";

const EditModal = () => {
  const { showAlert } = useAlert();
  const { modal, closeModal } = useModal();
  const { editWallet } = useWallet();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WalletFormData>({
    resolver: yupResolver(carteirasValidationSchema),
  });

  const [quote, setQuote] = useState<number>(0);

  const handleConversionEdit = async (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (isNaN(value)) return;

    const btcValue = await convertToBTC(value);
    const formatBTC = new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(btcValue);

    setQuote(parseFloat(formatBTC));
  };

  const onSubmit = async (data: WalletFormData) => {
    try {
      const valorBrl = parseFloat(data.valor_carteira.toString());
      const valorBtc = await convertToBTC(valorBrl);

      const updatedWallet: Wallet = {
        ...modal.data,
        ...data,
        valor_carteira: valorBrl,
        valor_btc: valorBtc,
      };

      const result = await editWallet(updatedWallet);

      if (result?.success) {
        showAlert("Carteira editada com sucesso!", "success");
        closeModal();
      }
    } catch (error) {
      showAlert("Erro ao editar carteira!", "error");
      console.error("Erro ao editar carteira:\n", error);
    }
  };

  useEffect(() => {
    if (modal.type === "edit" && modal.data) {
      const valorBrl =
        modal.data.valor_carteira ?? modal.data.valor_brl ?? 0;

      const dataToReset: WalletFormData = {
        nome: modal.data.nome,
        sobrenome: modal.data.sobrenome,
        email: modal.data.email,
        valor_carteira: valorBrl,
      };

      reset(dataToReset);

      convertToBTC(valorBrl).then((btcValue) => {
        const formatBTC = new Intl.NumberFormat("pt-BR", {
          style: "decimal",
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        }).format(btcValue);

        setQuote(parseFloat(formatBTC));
      });
    }
  }, [modal, reset]);

  return (
    <BasicModal
      title="Editar Item"
      open={modal.type === "edit"}
      onClose={closeModal}
      className="edit-modal"
    >
      <Typography variant="h3">Editar Carteira</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className="form-edit-wallet"
      >
        <div className="input-fields">
          <TextField
            {...register("nome")}
            label="Nome"
            error={!!errors.nome}
            helperText={errors.nome?.message}
            type="search"
            size="small"
            fullWidth
          />
          <TextField
            {...register("sobrenome")}
            label="Sobrenome"
            error={!!errors.sobrenome}
            helperText={errors.sobrenome?.message}
            type="search"
            size="small"
            fullWidth
          />
          <TextField
            {...register("email")}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            type="search"
            size="small"
            fullWidth
          />
          <div className="buy-fields">
            <TextField
              {...register("valor_carteira")}
              label="Valor de compra"
              placeholder="0,00"
              error={!!errors.valor_carteira}
              helperText={errors.valor_carteira?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              type="number"
              size="small"
              onBlur={handleConversionEdit}
            />
            <Typography variant="h3">BTC {quote}</Typography>
          </div>

          <div className="btns">
            <button className="cancel" type="button" onClick={closeModal}>
              Cancelar
            </button>
            <button className="btn-blue edit" type="submit">
              Editar Carteira
            </button>
          </div>
        </div>
      </Box>
    </BasicModal>
  );
};

export default EditModal;