import { useState } from 'react';
import {
  Box, Card, Grid, TextField,
  Button, Typography, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';
import API from '../api/axios';

const DEPARTMENTS = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    department: '', designation: '', salary: '', phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/employees', { ...form, salary: parseFloat(form.salary) });
      toast.success('Employee added successfully!');
      navigate('/employees');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <Layout title="Add Employee">
      <Card sx={{ p: 4, borderRadius: 3, maxWidth: 700, mx: 'auto' }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          New Employee Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" name="firstName"
                value={form.firstName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" name="lastName"
                value={form.lastName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" name="email" type="email"
                value={form.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" name="phone"
                value={form.phone} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Department" name="department"
                value={form.department} onChange={handleChange} required>
                {DEPARTMENTS.map(d => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Designation" name="designation"
                value={form.designation} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Salary" name="salary" type="number"
                value={form.salary} onChange={handleChange} required />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button fullWidth variant="outlined" sx={{ py: 1.5 }}
              onClick={() => navigate('/employees')}>
              Cancel
            </Button>
            <Button fullWidth type="submit" variant="contained" sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #6366F1, #EC4899)'
            }}>
              Add Employee
            </Button>
          </Box>
        </form>
      </Card>
    </Layout>
  );
}