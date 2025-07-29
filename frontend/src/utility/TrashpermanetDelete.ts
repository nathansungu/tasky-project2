import { useEffect } from "react";



const deleteStayedTrashTask= (updatedAt: string) => {
  const diff = new Date().getTime()- new Date(updatedAt).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!diff) {
        clearInterval(interval);
      }
    }, 1000*60*60*24*10);

    return () => clearInterval(interval);
  }, [updatedAt]);
};

export default deleteStayedTrashTask;
