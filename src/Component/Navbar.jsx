import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
function Navbar(props) {
    const[dropdown,setDropdown]= useState(false);
    const navigate = useNavigate();
    const handleDropdown=()=>
    {
        
        setDropdown(!dropdown)
    }
    const handleNavigateSave =()=>
    {
        navigate("/saved")
            
    }
    const handleNavigateShop =()=>
    {
            navigate("/shop")
            
    }
    const handleNavigateHome =()=>
        {
                navigate("/")
                
        }
        const handleNavigateOrders =()=>
            {
                    navigate("/order")
                    
            }
    
  return (
    <>
        <div className='navbar'>
            <div className='navbarLogoDiv'><img src='/Images/Meubel House_Logos-05.png'/><p>Furniro</p></div>
            <div className='navbarInfoDiv'>
                <div className='navbarInfoDivHome' onClick={handleNavigateHome}>Home</div>
                <div className='navbarInfoDivShop' onClick={handleNavigateShop}>Shop</div>
                <div className='navbarInfoDivAbout'>About</div>
                <div className='navbarInfoDivContact'>Contact</div>
            </div>
            <div className='navbarProccessDiv'>
                <div className='navbarProccessDivProfile'><IoPerson /></div>
                <div className='navbarProccessDivSearch'><CiSearch /></div>
                <div className='navbarProccessDivHeart' onClick={handleNavigateSave}><CiHeart /></div>
                <div className='navbarProccessDivCart' onClick={handleNavigateOrders}><LuShoppingBag /></div>
            </div>
        </div>
    </>
  )
}

export default Navbar