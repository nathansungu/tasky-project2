import {Routes, Route} from "react-router-dom"
import LandingPage from "../pages/landingPage"
import HandleLogin from "../pages/loginPage"
import Register from "../pages/registrationPage"
import DashboardPage from "../pages/dashBoard"
import HandleTasks from "../pages/tasks"
import CreateTaskPage from "../pages/createTaskPage"
import GroupPage from "../pages/groupPage"
import GroupsPage from "../pages/groupsPage"
const HandleRouting= ()=>{
    return(
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<HandleLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/tasks" element= {<HandleTasks/>}/>
        <Route path="/create-task/:id?" element={<CreateTaskPage/>}/>
        <Route path="/groups" element={<GroupsPage/>}/>
        <Route path="/group/:id" element={<GroupPage/>}/>

    </Routes>
    )
    
}

export default HandleRouting