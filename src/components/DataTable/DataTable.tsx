import * as React from 'react';
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
import type { Column, Data } from '../../types/DataTable';

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
  actions: any
): Data {
//   const density = population / size;
  return { name, code, population, size, actions };
}

export default function DataTable() {
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
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
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

  const rows = [
    createData('India', 'IN', 1324171354, 3287263, actions),
    createData('China', 'CN', 1403500365, 9596961, actions),
    createData('Italy', 'IT', 60483973, 301340, actions),
    createData('United States', 'US', 327167434, 9833520, actions),
    createData('Canada', 'CA', 37602103, 9984670, actions),
    createData('Australia', 'AU', 25475400, 7692024, actions),
    createData('Germany', 'DE', 83019200, 357578, actions),
    createData('Ireland', 'IE', 4857000, 70273, actions),
    createData('Mexico', 'MX', 126577691, 1972550, actions),
    createData('Japan', 'JP', 126317000, 377973, actions),
    createData('France', 'FR', 67022000, 640679, actions),
    createData('United Kingdom', 'GB', 67545757, 242495, actions),
    createData('Russia', 'RU', 146793744, 17098246, actions),
    createData('Nigeria', 'NG', 200962417, 923768, actions),
    createData('Brazil', 'BR', 210147125, 8515767, actions),
  ];

  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handlePage = (newPage: any) => {
    setPage(newPage);
  }

  const totalPages = Math.ceil(rows.length / pageSize);

  const pageContent = rows.slice((page - 1) * pageSize, page * pageSize);

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
                    hover role="checkbox" tabIndex={-1} key={row.code}
                >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                </StyledTableRow>
            ))}
            {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })} */}
          </TableBody>
        </Table>
      </TableContainer>

      <hr />
      
      <div className="rows-wrapper">
        <h6>{rows.length} registro(s)</h6>

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
