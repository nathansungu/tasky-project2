import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const CountdownDisplay = ({ deadline }: { deadline: string }) => {
  const calculateRemainingTime = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();

    if (diff <= 0) {
      return null; 
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const [remainingTime, setRemainingTime] = useState(() =>
    calculateRemainingTime(deadline)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateRemainingTime(deadline);
      setRemainingTime(timeLeft);

      if (!timeLeft) {
        clearInterval(interval); // Stop timer when deadline passed
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);



  return (
    <>{!remainingTime && <Typography color="gray" fontWeight="bold">
        Deadline passed
      </Typography>}
    <Typography color="red" fontWeight="bold">
      {`${remainingTime!.days}d ${remainingTime!.hours}h ${remainingTime!.minutes}m ${remainingTime!.seconds}s`}
    </Typography>    
    
    </>
    
  );
};

export default CountdownDisplay;
