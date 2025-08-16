import { Box, TextField } from "@mui/material";
import MagnyfyinGlassIcon from '../../assets/magnifying-glass-icon.svg';
import './CardSearch.css';

const CardSearch = () => {

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="card-search"
        >
            <div className="input-fields">
                <TextField id="nome" label="Nome" type="search" size="small" />
                <TextField id="sobrenome" label="Sobrenome" type="search" size="small" />
                <TextField id="email" label="Email" type="search" size="small" />
            </div>

            <button className="search">
                <img src={MagnyfyinGlassIcon} alt="Search Icon" />
                Buscar
            </button>
        </Box>
    )
}

export default CardSearch;