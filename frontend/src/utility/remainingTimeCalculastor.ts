const calculateRemainingTime = (deadeline: string) => {
  if (deadeline === null) {
    return;
  }
  var remainingTime = Math.abs(
    (new Date(deadeline).getTime() - new Date().getTime())/1000
  );

  const days = Math.floor(remainingTime/86400);
  const hours = Math.floor((remainingTime%86400)/3600);
  const minutes = Math.floor((remainingTime%86400-hours*3600)/60);
  const seconds = Math.floor(remainingTime%60)

console.log(days)
  return {days, hours, minutes,seconds};
};

export default calculateRemainingTime;
