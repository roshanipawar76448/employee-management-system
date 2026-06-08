import { useState } from 'react';
import {
  Box, Card, TextField, Button, Typography,
  InputAdornment, IconButton, Alert, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      login({ name: res.data.name, role: res.data.role }, res.data.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Card sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 4 }}>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{
            width: 56, height: 56, borderRadius: 3, mx: 'auto', mb: 2,
            background: 'linear-gradient(135deg, #6366F1, #EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 24 }}>E</Typography>
          </Box>
          <Typography variant="h5" fontWeight={700}>Welcome Back</Typography>
          <Typography color="text.secondary" fontSize={14} mt={0.5}>
            Sign in to EMS Pro
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Username" variant="outlined" margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <TextField
            fullWidth label="Password" variant="outlined" margin="normal"
            type={showPass ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit" fullWidth variant="contained" size="large"
            disabled={loading}
            sx={{
              mt: 3, py: 1.5, borderRadius: 2, fontWeight: 600, fontSize: 15,
              background: 'linear-gradient(135deg, #6366F1, #EC4899)',
              '&:hover': { opacity: 0.9 }
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
          </Button>
        </form>

        <Typography textAlign="center" mt={2} fontSize={13} color="text.secondary">
          Default: admin / admin123
        </Typography>
      </Card>
    </Box>
  );
}