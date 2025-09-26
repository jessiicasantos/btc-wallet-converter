import { Box, TextField } from "@mui/material";
import MagnyfyinGlassIcon from '../../assets/magnifying-glass-icon';
import './CardSearch.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchValidationSchema } from "../../validation/carteirasValidation";
import { useWallet } from "../../context/WalletContext/WalletContext";
import type { WalletFilters } from "../../types/Wallet";

const CardSearch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(searchValidationSchema)
  });
  const { getWallets, pageSize, setPage } = useWallet();
  const [filters, setFilters] = useState<WalletFilters>({});

  const onSubmit = (data: WalletFilters) => {
    const activeFilters: any = {};

    if(data.nome) activeFilters.nome = data.nome;
    if(data.sobrenome) activeFilters.sobrenome = data.sobrenome;
    if(data.email) activeFilters.email = data.email;

    setFilters(activeFilters);
    setPage(1);
    getWallets(activeFilters, 1, pageSize);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      className="card-search"
    >
      <div className="input-fields">
        <TextField {...register("nome")} label="Nome" type="search" size="small" fullWidth error={!!errors.nome} helperText={errors.nome?.message} />
        <TextField {...register("sobrenome")} label="Sobrenome"  type="search" size="small" fullWidth error={!!errors.sobrenome} helperText={errors.sobrenome?.message} />
        <TextField {...register("email")} label="Email" type="search" size="small" fullWidth error={!!errors.email} helperText={errors.email?.message} />
      </div>

      <button className="search" type="submit">
        <MagnyfyinGlassIcon />
        Buscar
      </button>
    </Box>
  )
}

export default CardSearch;