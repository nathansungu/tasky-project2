import {Routes, Route} from "react-router-dom"
import LandingPage from "../pages/landingPage"
const HandleRouting= ()=>{
    return(
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
           

    </Routes>
    )
    
}

export default HandleRouting