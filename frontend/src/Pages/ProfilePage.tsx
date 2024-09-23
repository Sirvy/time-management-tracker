import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Avatar, Paper, Button, Grid } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import Timer from '../Components/Timer';
import TaskForm, { Task } from '../Components/TaskForm';
import TaskList from '../Components/TaskList';

export const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const { logout } = useAuth();

    useEffect(() => {

        const tasks = [
            {
              title: "Finish client report",
              timeSpent: 7200, // 2 hours
              date: new Date('2024-09-18'),
              category: 1 // Work
            },
            {
              title: "Study for final exams",
              timeSpent: 5400, // 1.5 hours
              date: new Date('2024-09-19'),
              category: 2 // Study
            },
            {
              title: "Morning run",
              timeSpent: 1800, // 30 minutes
              date: new Date('2024-09-20'),
              category: 4 // Exercise/Fitness
            },
            {
              title: "Play video games",
              timeSpent: 3600, // 1 hour
              date: new Date('2024-09-20'),
              category: 8 // Gaming
            },
            {
              title: "House cleaning",
              timeSpent: 3600, // 1 hour
              date: new Date('2024-09-21'),
              category: 7 // Household Chores
            },
            {
              title: "Lunch with friends",
              timeSpent: 5400, // 1.5 hours
              date: new Date('2024-09-21'),
              category: 6 // Socializing
            },
            {
              title: "Sleep",
              timeSpent: 28800, // 8 hours
              date: new Date('2024-09-22'),
              category: 3 // Sleep
            },
            {
              title: "Buy groceries",
              timeSpent: 1800, // 30 minutes
              date: new Date('2024-09-22'),
              category: 12 // Shopping/Errands
            },
            {
              title: "Meal prep",
              timeSpent: 3600, // 1 hour
              date: new Date('2024-09-23'),
              category: 9 // Meal Prep/Eating
            },
            {
              title: "Work on application",
              timeSpent: 10800, // 3 hours
              date: new Date('2024-09-23'),
              category: 1 // Work
            }
          ];

          setTasks(tasks);
          

    }, [])

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.message);
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };

        fetchProtectedData();
    }, []);

    const handleTaskSubmit = (newTask: Task) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                        {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {username}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Welcome to your personal profile page!
                    </Typography>
                </Box>
            </Paper>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={12} md={3} pr={2} sx={{ boxSizing: 'border-box' }}>
                  <TaskForm onSubmit={handleTaskSubmit} />
                </Grid>
                <Grid item xs={12} md={9} sx={{ borderLeft: 1, borderColor: 'divider' }}>
                    <TaskList tasks={tasks} />
                </Grid>
            </Grid>
        </Container>
    );
};
