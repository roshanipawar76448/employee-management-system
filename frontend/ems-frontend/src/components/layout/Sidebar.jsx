import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, Typography, Avatar, Divider, ListItemButton
} from '@mui/material';
import {
  Dashboard, People, EventNote,
  BeachAccess, BarChart, Person, Logout
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Dashboard',  icon: <Dashboard />,  path: '/dashboard'  },
  { label: 'Employees',  icon: <People />,      path: '/employees'  },
  { label: 'Attendance', icon: <EventNote />,   path: '/attendance' },
  { label: 'Leave',      icon: <BeachAccess />, path: '/leave'      },
  { label: 'Analytics',  icon: <BarChart />,    path: '/analytics'  },
  { label: 'Profile',    icon: <Person />,      path: '/profile'    },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Drawer variant="permanent" sx={{
      width: DRAWER_WIDTH,
      '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        boxSizing: 'border-box',
        borderRight: '1px solid',
        borderColor: 'divider',
      }
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2,
          background: 'linear-gradient(135deg, #6366F1, #EC4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>E</Typography>
        </Box>
        <Typography variant="h6" fontWeight={700}>EMS Pro</Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, mt: 1, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: active ? 'primary.main' : 'transparent',
                  color: active ? '#fff' : 'text.primary',
                  '&:hover': {
                    backgroundColor: active ? 'primary.dark' : 'action.hover'
                  },
                  '& .MuiListItemIcon-root': {
                    color: active ? '#fff' : 'text.secondary'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 400,
                    fontSize: 14
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: 14 }}>
            {user?.name?.[0] || 'U'}
          </Avatar>
          <Box>
            <Typography fontSize={13} fontWeight={600}>{user?.name || 'User'}</Typography>
            <Typography fontSize={11} color="text.secondary">{user?.role}</Typography>
          </Box>
        </Box>
        <ListItemButton onClick={logout} sx={{ borderRadius: 2, color: 'error.main' }}>
          <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 14 }} />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}