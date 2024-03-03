import { Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface Props {
  time: number;
  onResend: () => void;
}
const Timer = (props: Props) => {
  const { time, onResend } = props;
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <Stack sx={{ mt: 3 }}>
      {seconds === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          onClick={() => {
            onResend();
            setSeconds(120);
          }}
        >
          ارسال مجدد
        </Typography>
      ) : (
        <Typography variant="h6" color="text.secondary">
          {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}
          {seconds % 60}
        </Typography>
      )}
    </Stack>
  );
};

export default Timer;
