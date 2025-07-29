import { useEffect } from "react";
import axiosInstance from "../api/axios"; 

const useDeleteStayedTrashTask = (taskId: string, updatedAt: string) => {
  useEffect(() => {
    const checkAndDelete = async () => {
      const now = new Date().getTime();
      const lastUpdate = new Date(updatedAt).getTime();
      const thirtyDaysInMs = 1000 * 60 * 60 * 24 * 30;

      const diff = now - lastUpdate;

      if (diff >= thirtyDaysInMs) {
        try {
          await axiosInstance.delete(`/task/${taskId}`);
          console.log(`Task ${taskId} deleted after 30 days.`);
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    };

    checkAndDelete();

    const interval = setInterval(() => {
      checkAndDelete();
    }, 1000 * 60 * 60 * 24); 

    return () => clearInterval(interval);
  }, [taskId, updatedAt]);
};

export default useDeleteStayedTrashTask;

