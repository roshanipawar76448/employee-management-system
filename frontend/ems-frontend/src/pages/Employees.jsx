import { useEffect, useState } from 'react';
import {
  Box, Card, TextField, Button, InputAdornment,
  Avatar, Chip, IconButton, Typography, Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Add, Edit, Delete, FileDownload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';
import API from '../api/axios';
import { exportToExcel } from '../utils/exportExcel';
import { exportToPDF } from '../utils/exportPdf';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = search
        ? await API.get(`/employees/search?keyword=${search}`)
        : await API.get('/employees');
      setEmployees(res.data);
    } catch {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await API.delete(`/employees/${id}`);
      toast.success('Employee deleted successfully');
      fetchEmployees();
    } catch {
      toast.error('Failed to delete employee');
    }
  };

  const columns = [
    {
      field: 'name', headerName: 'Employee', flex: 1.5, minWidth: 200,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#6366F1', width: 34, height: 34, fontSize: 12 }}>
            {row.firstName?.[0]}{row.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography fontSize={13} fontWeight={600}>
              {row.firstName} {row.lastName}
            </Typography>
            <Typography fontSize={11} color="text.secondary">{row.email}</Typography>
          </Box>
        </Box>
      )
    },
    { field: 'department', headerName: 'Department', flex: 1, minWidth: 120 },
    { field: 'designation', headerName: 'Designation', flex: 1, minWidth: 150 },
    {
      field: 'salary', headerName: 'Salary', flex: 0.8, minWidth: 110,
      renderCell: ({ value }) => (
        <Typography fontSize={13} fontWeight={500} color="primary.main">
          ₹{value?.toLocaleString()}
        </Typography>
      )
    },
    {
      field: 'status', headerName: 'Status', flex: 0.6, minWidth: 90,
      renderCell: () => (
        <Chip label="Active" size="small" color="success" variant="outlined" />
      )
    },
    {
      field: 'actions', headerName: 'Actions', flex: 0.6, minWidth: 90, sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary"
              onClick={() => navigate(`/employees/edit/${row.id}`)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error"
              onClick={() => handleDelete(row.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Layout title="Employees">
      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2
        }}>
          <TextField
            size="small" placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 250 }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<FileDownload />}
              onClick={() => exportToExcel(employees)}>
              Excel
            </Button>
            <Button variant="outlined" startIcon={<FileDownload />}
              onClick={() => exportToPDF(employees)}>
              PDF
            </Button>
            <Button variant="contained" startIcon={<Add />}
              onClick={() => navigate('/employees/add')}
              sx={{ background: 'linear-gradient(135deg, #6366F1, #EC4899)' }}>
              Add Employee
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={employees}
          columns={columns}
          loading={loading}
          autoHeight
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'background.default',
              borderRadius: 2
            }
          }}
        />
      </Card>
    </Layout>
  );
}