import { useEffect, useState } from 'react';
import { Grid, Card, Box, Typography, Avatar } from '@mui/material';
import { People, TrendingUp, EventNote, BeachAccess } from '@mui/icons-material';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, Tooltip, Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import Layout from '../components/layout/Layout';
import API from '../api/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const StatCard = ({ title, value, icon, color, sub }) => (
  <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography color="text.secondary" fontSize={13} fontWeight={500}>{title}</Typography>
        <Typography variant="h4" fontWeight={700} mt={0.5}>{value}</Typography>
        <Typography color="text.secondary" fontSize={12} mt={0.5}>{sub}</Typography>
      </Box>
      <Avatar sx={{ bgcolor: color + '20', color, width: 48, height: 48 }}>
        {icon}
      </Avatar>
    </Box>
  </Card>
);

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get('/employees').then(res => setEmployees(res.data)).catch(() => {});
  }, []);

  const departments = [...new Set(employees.map(e => e.department))];
  const deptCounts = departments.map(d =>
    employees.filter(e => e.department === d).length
  );

  const barData = {
    labels: departments,
    datasets: [{
      label: 'Employees',
      data: deptCounts,
      backgroundColor: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'],
      borderRadius: 8,
    }]
  };

  const doughnutData = {
    labels: ['Active', 'On Leave', 'Remote'],
    datasets: [{
      data: [employees.length > 3 ? employees.length - 3 : 1, 2, 1],
      backgroundColor: ['#6366F1', '#F59E0B', '#10B981'],
      borderWidth: 0,
    }]
  };

  return (
    <Layout title="Dashboard">
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Employees" value={employees.length}
            icon={<People />} color="#6366F1" sub="All departments" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Departments" value={departments.length}
            icon={<TrendingUp />} color="#10B981" sub="Active teams" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="On Leave" value="2"
            icon={<BeachAccess />} color="#F59E0B" sub="This week" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Attendance" value="96%"
            icon={<EventNote />} color="#EC4899" sub="Today" />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={2}>Employees by Department</Typography>
            {departments.length > 0 ? (
              <Bar data={barData} options={{
                responsive: true,
                plugins: { legend: { display: false } }
              }} />
            ) : (
              <Typography color="text.secondary" fontSize={14}>
                No data yet — add employees first.
              </Typography>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={2}>Work Status</Typography>
            <Doughnut data={doughnutData} options={{
              responsive: true, cutout: '70%'
            }} />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={2}>Recent Employees</Typography>
            {employees.length === 0 && (
              <Typography color="text.secondary" fontSize={14}>
                No employees added yet.
              </Typography>
            )}
            {employees.slice(0, 5).map((emp) => (
              <Box key={emp.id} sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                py: 1.5, borderBottom: '1px solid', borderColor: 'divider'
              }}>
                <Avatar sx={{ bgcolor: '#6366F1', width: 38, height: 38, fontSize: 13 }}>
                  {emp.firstName?.[0]}{emp.lastName?.[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600} fontSize={14}>
                    {emp.firstName} {emp.lastName}
                  </Typography>
                  <Typography color="text.secondary" fontSize={12}>
                    {emp.designation} · {emp.department}
                  </Typography>
                </Box>
                <Typography fontSize={13} color="primary.main" fontWeight={500}>
                  ₹{emp.salary?.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}