import {Routes, Route} from "react-router-dom"
import LandingPage from "../pages/landingPage"
import HandleLogin from "../pages/loginPage"
import Register from "../pages/registrationPage"
import DashboardPage from "../pages/dashBoard"
const HandleRouting= ()=>{
    return(
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<HandleLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
           

    </Routes>
    )
    
}

export default HandleRouting