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
import { useEffect, useState } from 'react';
import { useWallet } from '../../context/WalletContext/WalletContext';

export default function DataTable() {
  const { wallets, getWallets } = useWallet();

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
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'valor_carteira',
      label: 'Bitcoin',
      minWidth: 170,
      align: 'left',
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'actions',
      label: '',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];
  
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const handlePage = (newPage: any) => {
    setPage(newPage);
  }

  const totalPages = Math.ceil((wallets.length) / pageSize);

  const pageContent = wallets.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="container">
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Toolbar>
          <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
          >
            Carteiras
          </Typography>

          <button className="export export-csv">
            Exportar CSV
          </button>
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
            {pageContent.map((row: any) => (
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
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
              </StyledTableRow>
            ))}
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
