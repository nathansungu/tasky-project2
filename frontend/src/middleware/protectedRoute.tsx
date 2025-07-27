import {useNavigate} from "react-router-dom"
import useUserStore from "../store/logedinState.store";
import { useEffect } from "react"

function Protected ({children}: {children:React.ReactNode}){
    const {user} =  useUserStore();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate("/login");

        }
    }, [user]);

    return (<> {children}</>)
}

export default Protected