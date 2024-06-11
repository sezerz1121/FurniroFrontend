import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Navbar from './Navbar';
import axios from 'axios';

function OrderCard(props) {
    const navigate = useNavigate();
    const[saved,setSaved] = useState(false);
    const[userId,setUserId] = useState(null);
    const[clickSave,setClickSave]= useState(0);
    const[productStatus,setProductStatus]=useState(null);
    const handleClick = () => {
        
    };
    const handleBuy = () => {
        navigate(`/buy/${props.ProductId}`);
    };
    
 

    return (
        <>
            
        <div className='OrderCardDiv' >
        <div className='OrderCardImageDiv'>
        <img  className='OrderImage'src={props.productImage}/>
        </div>
        <div className='OrderCardInfoDiv'>

            <div className='OrderText'>
                
                <p>{props.date}</p>
            </div>

            <div className='OrderText'>
                
                <p>{props.name}</p>
            </div>
            


        </div>   
        <div className='OrderCardInfoDiv'>
            <div className='OrderText'>
                
                <p>Total</p>
            </div>  
            <div className='OrderText'>
                
                <p>₹{props.Total}</p>
            </div>
        </div>
        <div className='OrderCardButtonDiv'>
        <div className='BuyButtonI' onClick={handleBuy}>Buy again</div>
        </div>  
        </div>
        </>
    );
}

export default OrderCard;