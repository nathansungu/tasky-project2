import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
type Props = { deadline: string }
const CountdownDisplay = ({ deadline }: Props) => {
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
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);



  return (
    <>{!remainingTime && <Typography color="gray" fontWeight="bold">
        Deadline passed
      </Typography>}
    <Typography color="red" fontWeight="bold">
      {remainingTime&&`${remainingTime!.days} days ${remainingTime!.hours} hrs ${remainingTime!.minutes} min ${remainingTime!.seconds} sec`}
    </Typography>    
    
    </>
    
  );
};

export default CountdownDisplay;
