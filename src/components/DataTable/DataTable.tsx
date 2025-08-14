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
import axios from 'axios';
import { useModal } from '../../context/ModalContext/ModalContext';
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import type { Column, Data } from '../../types/DataTable';
import { useEffect, useState } from 'react';

export default function DataTable() {
  const [ data, setData ] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        'http://localhost:3000/users'
      );
      
      let dataResponse = await response.data;
      console.log('dataResponse: ', dataResponse);

      setData(dataResponse);
    } catch (error) {
      console.error('Errrroooo!!!', error);
    }
  }

  useEffect(() => {
    fetchData()
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

  const actions = (
    <>
        <button className="edit" onClick={() => openModal('edit')}>
            <img src={PencilIcon} alt="Ícone de Edição" />
        </button>
          <button className="delete" onClick={() => openModal('delete')}>
            <img src={TrashIcon} alt="Ícone de Remover" />
        </button>
    </>
  );
  
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const handlePage = (newPage: any) => {
    setPage(newPage);
  }

  const totalPages = Math.ceil(data?.length / pageSize);

  const pageContent = data?.slice((page - 1) * pageSize, page * pageSize);

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
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value }
                            {column.id === 'actions' && actions}
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
        <h6>{data.length} registro(s)</h6>

        <Pagination 
            color="primary"
            count={totalPages}
            onChange={(event: any, value: any) => handlePage(value)}
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
