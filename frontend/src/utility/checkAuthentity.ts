import { useEffect } from 'react'
import useUserStore from '../store/logedinState.store'
import axiosInstance from '../api/axios'

const AuthChecker = () => {
  const { setUser } = useUserStore()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axiosInstance.post("/user/me")
        const { data } = response.data  
        setUser(data) 
      } catch (e) {
        setUser(null) 
      }
    }

    checkLogin()
  }, [setUser])

  return null
}

export default AuthChecker