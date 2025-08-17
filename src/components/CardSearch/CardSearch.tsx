import { Box, TextField } from "@mui/material";
import MagnyfyinGlassIcon from '../../assets/magnifying-glass-icon.svg';
import './CardSearch.css';
import { useEffect, useState } from "react";
import axios from "axios";
import type { Wallet } from "../../types/Wallet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchValidationSchema } from "../../validation/carteirasValidation";
import { useWallet } from "../../context/WalletContext/WalletContext";

const CardSearch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(searchValidationSchema)
  });
  const { setWallets } = useWallet();

  const [filters, setFilters] = useState<{nome?: string, sobrenome?: string, email?: string}>({});
  
  useEffect(() => {
    const filterWallets = async () => {
      try {
        const likeFilters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [`${key}_like`, value])
      );

        let response = await axios.get(
            'http://localhost:3000/users/', {
            params: likeFilters
          }
        );
  
        console.log(response.data);

        setWallets(response.data);
      } catch (error) {
        console.error('Error fetching data: \n', error);
      }
    };

    filterWallets();
  }, [filters]);

  const onSubmit = (data: any) => {
    const activeFilters: any = {};

    if(data.nome) activeFilters.nome = data.nome;
    if(data.sobrenome) activeFilters.sobrenome = data.sobrenome;
    if(data.email) activeFilters.email = data.email;

    setFilters(activeFilters);
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
              <img src={MagnyfyinGlassIcon} alt="Search Icon" />
              Buscar
            </button>
        </Box>
    )
}

export default CardSearch;