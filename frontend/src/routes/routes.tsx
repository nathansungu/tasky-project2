import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import HandleLogin from "../pages/loginPage";
import Register from "../pages/registrationPage";
import DashboardPage from "../pages/dashBoard";
import HandleTasks from "../pages/tasks";
import CreateTaskPage from "../pages/createTaskPage";
import GroupPage from "../pages/groupPage";
import GroupsPage from "../pages/groupsPage";
import ProfilePage from "../pages/profile";
import TrashPage from "../pages/trash.Page";
import Protected from "../middleware/protectedRoute";
import HandleUpdateTaskPage from "../pages/updateTask";
import HandleCreateGroupPage from "../pages/createGroupPage";
import CompleteTaskPage from "../pages/completeTasks"; 
const HandleRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<HandleLogin />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <Protected>
            <DashboardPage />
          </Protected>
        }
      > 
        
        <Route path="" element={<HandleTasks />} />
        <Route path="task-update/:id" element={<HandleUpdateTaskPage/>}/>
        <Route path="create-task/:id?" element={<CreateTaskPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="trash" element={<TrashPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="group/:id" element={<GroupPage />} />
        <Route path="create-group" element={<HandleCreateGroupPage/>}/>
        <Route path="task/complete" element={<CompleteTaskPage/>}/>
      </Route>
    </Routes>
  );
};

export default HandleRouting;
