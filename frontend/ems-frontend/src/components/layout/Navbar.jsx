import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material';
import { DarkMode, LightMode, Notifications } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

export default function Navbar({ title }) {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="static" color="transparent" elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700} fontSize={18}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={toggleTheme}>
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}