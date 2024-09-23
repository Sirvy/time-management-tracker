import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Table, TableBody, TableRow, TableCell, Card, CardContent, TableHead, Button, LinearProgress } from '@mui/material';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Category, Task } from './TaskForm';
import { categories } from '../Mocks/Categories';
import { formatTimeFromSeconds } from '../Utils/Utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { PieChart } from 'react-minimal-pie-chart';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [startDate, setStartDate] = useState<Date>(startOfWeek(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfWeek(new Date()));
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [daysInPeriod, setDaysInPeriod] = useState<Date[]>([]);

  useEffect(() => {
    const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });
    setDaysInPeriod(daysInterval);

    const filtered = tasks.filter(task => 
      isWithinInterval(new Date(task.date), { start: startDate, end: endDate })
    );

    setFilteredTasks(filtered);
  }, [tasks, startDate, endDate]);

  const handleThisWeek = () => {
    const today = new Date();
    setStartDate(startOfWeek(today, { weekStartsOn: 1 }));
    setEndDate(endOfWeek(today, { weekStartsOn: 1 }));
  };

  const handleThisMonth = () => {
    const today = new Date();
    setStartDate(startOfMonth(today));
    setEndDate(endOfMonth(today));
  };

  const groupTasksByDay = () => {
    const grouped: { [key: string]: Task[] } = {};
    daysInPeriod.forEach(day => {
      const dateKey = format(day, 'yyyy-MM-dd');
      grouped[dateKey] = [];
    });
    filteredTasks.forEach(task => {
      const dateKey = format(new Date(task.date), 'yyyy-MM-dd');
      if (grouped[dateKey]) {
        grouped[dateKey].push(task);
      }
    });
    return grouped;
  };

  const getCategoryById = (categoryId: number): Category | undefined => {
    return categories.find(category => category.id === categoryId);
  };

  const getCategoryChartData = (tasksForDay: Task[]) => {
    const categoryTimes: { [key: number]: number } = {};
    tasksForDay.forEach(task => {
      if (categoryTimes[task.category]) {
        categoryTimes[task.category] += task.timeSpent;
      } else {
        categoryTimes[task.category] = task.timeSpent;
      }
    });

    return Object.entries(categoryTimes).map(([categoryId, time]) => {
      const category = getCategoryById(Number(categoryId));
      return {
        title: category?.name || 'Unknown',
        value: time,
        color: category?.color || '#000000',
      };
    });
  };

  const getCategoryProgressData = () => {
    const categoryTimes: { [key: number]: number } = {};
    let totalTime = 0;

    filteredTasks.forEach(task => {
      if (categoryTimes[task.category]) {
        categoryTimes[task.category] += task.timeSpent;
      } else {
        categoryTimes[task.category] = task.timeSpent;
      }
      totalTime += task.timeSpent;
    });

    return Object.entries(categoryTimes).map(([categoryId, time]) => {
      const category = getCategoryById(Number(categoryId));
      return {
        name: category?.name || 'Unknown',
        percentage: (time / totalTime) * 100,
        color: category?.color || '#000000',
      };
    });
  };

  const groupedTasks = groupTasksByDay();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <DatePicker
            label="Start Date"
            format="dd.MM.yyyy"
            value={startDate}
            onChange={(newDate) => newDate && setStartDate(newDate)}
          />
          <DatePicker
            label="End Date"
            format="dd.MM.yyyy"
            value={endDate}
            onChange={(newDate) => newDate && setEndDate(newDate)}
          />
          <Button variant="outlined" onClick={handleThisWeek}>This Week</Button>
          <Button variant="outlined" onClick={handleThisMonth}>This Month</Button>
        </Box>
      </LocalizationProvider>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.entries(groupedTasks).map(([date, tasksForDay]) => (
                <TableCell key={date}>
                  <Typography variant="subtitle1">{format(new Date(date), 'd.M.yyyy EEEE')}</Typography>
                  <Typography variant="body2">
                    Total time: {formatTimeFromSeconds(tasksForDay.reduce((sum, task) => sum + task.timeSpent, 0))}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.entries(groupedTasks).map(([date, tasksForDay]) => (
                <TableCell key={date} sx={{ verticalAlign: 'top', minWidth: '200px' }}>
                  {tasksForDay.length === 0 ? (
                    <Typography variant="body2">No tasks</Typography>
                  ) : (
                    <>
                      {tasksForDay.map((task, index) => (
                        <Card key={index} sx={{ mb: 1, backgroundColor: `${getCategoryById(task.category)?.color}20` }}>
                          <CardContent>
                            <Typography variant="body1">{task.title}</Typography>
                            <Typography variant="body2">{task.description}</Typography>
                            <Typography variant="body2">Time spent: {formatTimeFromSeconds(task.timeSpent)}</Typography>
                            <Typography variant="body2">Category: {getCategoryById(task.category)?.name}</Typography>
                          </CardContent>
                        </Card>
                      ))}
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Total tasks: {tasksForDay.length}
                      </Typography>
                      <Box sx={{ height: 150, mt: 2 }}>
                        <PieChart
                          data={getCategoryChartData(tasksForDay)}
                          lineWidth={20}
                          paddingAngle={2}
                          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                          labelStyle={{ fontSize: '5px', fill: '#ffffff' }}
                        />
                      </Box>
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ mt: 4 }}>
        {getCategoryProgressData().map((category, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2">{category.name}</Typography>
            <LinearProgress
              variant="determinate"
              value={category.percentage}
              sx={{
                height: 10,
                backgroundColor: `${category.color}40`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: category.color,
                },
              }}
            />
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {category.percentage.toFixed(2)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskList;
