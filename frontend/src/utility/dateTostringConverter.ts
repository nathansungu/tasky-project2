const toDateTime = (date: string) => {
  if (date === null) {
    return;
  }
  const updatedDate = new Date(date);

  return updatedDate.toDateString();
};

export default toDateTime;
