import React from 'react'
import './Navbar.scss'
import {MdOutlineLightMode as LightModeIcon, MdDarkMode as DarkModeIcon} from "react-icons/md"
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import toast from 'react-hot-toast';
import { setAuth } from '../../slice/UserSlice'
import { useNavigate } from "react-router-dom";

const NavBar = ({darkMode, toggleDarkMode}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.user.auth)
  
  const logoutFun = async (e) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/logout`)
      localStorage.removeItem("token");
      if(response.status == 200){
        dispatch(setAuth(false))
        navigate('/signIn')
      }
    }
  catch(err){
    console.log(err)
    }
  }
  return (
    <div className="navBar">
        <div className="navBarContent">
        <div className="navBarTitle">SimpleNote</div>
        <div className="navBar-right">
          <div className="navBarTitle theme" onClick={() => toggleDarkMode(!darkMode) }>{darkMode? <DarkModeIcon/> : <LightModeIcon/>}</div>
          {userAuth && <div className="navBarTitle logout" onClick={(e) => logoutFun(e)}>Logout</div>}
        </div>
        </div>
    </div>
  )
}

export default NavBar