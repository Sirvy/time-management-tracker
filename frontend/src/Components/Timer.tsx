import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="body1" component="div" gutterBottom>
        {formatTime(time)}
      </Typography>
      <Box>
        <Button
          variant={isRunning ? "outlined" : "contained"}
          onClick={handleStartPause}
          sx={{ mr: 2, color: isRunning ? 'inherit' : 'primary.contrastText', bgcolor: isRunning ? 'white' : 'primary.main' }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
