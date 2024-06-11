import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { BsBox2 } from "react-icons/bs";
import axios from 'axios';
import {useNavigate  } from "react-router-dom";

function Dropdown(props) {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            const response = await axios.post('http://localhost:3000/users/logout');
            console.log('User Logout:', response.data); // Assuming message contains the logout message
            
            navigate("/signin");
        } catch (error) {
            console.error('Error logging out User:', error.response ? error.response.data.message : error.message);
            navigate("/signin");
        }
    };

    const handleOrder =()=>
    {
        navigate("/order");
    }
    
  return (
    <>
    <div className='Dropdown'>
        <div className='DropdownEmail'>
            <p>{props.email}</p>
        </div>
        <div className='DropdownWhiteLineDiv'>
        <div className='DropdownWhiteLine'></div>
        </div>
        <div className='DrodownOrder' onClick={handleOrder}>
        <div className='DrodownOrderIcon'  ><BsBox2 /></div><div className='DrowdownOrderText'>Orders</div>
        </div>
        <div className='DrodownInformation'>
            
        </div>
        <div className='DrodownAddress'>
            
        </div>
        <div className='DrodownPayment'>

        </div>
        <div className='DropdownWhiteLineDiv'>
        <div className='DropdownWhiteLine'></div>
        </div>
        <div className='Drowdownlogout' onClick={handleLogout}>
            <div className='DrowdownlogoutIcon'  ><FiLogOut /></div><div className='DrowdownlogoutText'>Log out</div>
        </div>
    </div>
    </>
  )
}

export default Dropdown ;