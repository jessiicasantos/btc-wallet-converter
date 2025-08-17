import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, styled, Toolbar, Typography } from '@mui/material';
import PencilIcon from '../../assets/pencil-icon.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import './DataTable.css';
import { useModal } from '../../context/ModalContext/ModalContext';
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import type { Column } from '../../types/DataTable';
import { useEffect } from 'react';
import { useWallet } from '../../context/WalletContext/WalletContext';

export default function DataTable() {
  const { wallets, page, setPage, pageSize, getWallets, totalCount } = useWallet();

  useEffect(() => {
    if(wallets.length < 1) {
      getWallets();
    }
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      '&.MuiTableRow-root': {
          backgroundColor: "aliceblue",
        },
        '&.MuiTableRow-root > .MuiTableCell-root:first-of-type': {
            borderLeft: "3px solid #51a2ff",
        },
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const { modal, openModal } = useModal();

  const columns: readonly Column[] = [
    { id: 'nome', label: 'Nome', minWidth: 170 },
    { id: 'sobrenome', label: 'Sobrenome', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'valor_btc',
      label: 'Bitcoin',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 170,
      align: 'right',
    },
  ];

  const handlePage = (newPage: number) => {
    setPage(newPage);
    getWallets({}, newPage, pageSize);
  }

  const handleClear = () => {
    setPage(1);
    getWallets({}, 1, pageSize);
  };


  const totalPages = Math.ceil(totalCount / pageSize);

  const pageContent = wallets.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="container">
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Toolbar className="table-options">
          <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
          >
            Carteiras
          </Typography>

          <div className="btns">
            <button className="clear-filters" type="button" onClick={() => handleClear()}>
              Limpar filtros
            </button>

            <button className="export export-csv">
              Exportar CSV
            </button>
          </div>
        </Toolbar>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageContent.length === 0 ? (
              <StyledTableRow>
                <TableCell colSpan={columns.length} align="center" className="table-empty-message">
                  Carteira não encontrada.
                </TableCell>
              </StyledTableRow>
            ) :
              (pageContent.map((row: any) => (
                  <StyledTableRow 
                      hover role="checkbox" tabIndex={-1} key={row.id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'actions' ? (
                            <>
                              <button className="edit" onClick={() => openModal('edit', row)}>
                                <img src={PencilIcon} alt="Ícone de Edição" />
                              </button>
                              <button className="delete" onClick={() => openModal('delete', row)}>
                                <img src={TrashIcon} alt="Ícone de Remover" />
                              </button>
                            </>
                          ) : (
                            column.format && typeof value === 'number' 
                            ? column.format(value) 
                            : value
                          )}
                        </TableCell>
                      );
                    })}
                </StyledTableRow>
              )))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <hr />
      
      <div className="rows-wrapper">
        <h6>{wallets.length} registro(s)</h6>

        <Pagination 
          color="primary"
          count={totalPages}
          onChange={( event: any, value: any ) => handlePage(value)}
          page={page}
          size="large"
          className="flex justify-end"
        ></Pagination>
      </div>

      {modal.type === 'edit' && <EditModal />}
      {modal.type === 'delete' && <DeleteModal />}
    </Paper>
  );
}
