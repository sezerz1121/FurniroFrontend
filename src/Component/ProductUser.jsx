import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

function ProductUser(props) {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [clickSave, setClickSave] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    }

    useEffect(() => {
        const fetchSaveData = async () => {
            try {
                const userId = props.userId;
                const response = await axios.post(`${import.meta.env.VITE_APIURL}/save/checksavedproduct`, { productId: props._id, userId });
                
                setSaved(response.data.data.isSaved);
            } catch (error) {
                console.error('Error fetching save data:', error);
            }
        };
        
        fetchSaveData();
    }, [props.userId, props._id, clickSave]);

    const handleSave = async () => {
        const userId = props.userId;
        try {
            if (saved) {
                await axios.post(`${import.meta.env.VITE_APIURL}/save/unsaveproduct`, { productId: props._id, userId });
            } else {
                await axios.post(`${import.meta.env.VITE_APIURL}/save/saveproduct`, { productId: props._id, userId });
            }
            setClickSave(clickSave + 1); // Trigger useEffect to re-fetch save status
        } catch (error) {
            console.error('Error saving/removing product:', error);
        }
    };

    const handleBuy = () => {
        navigate(`/buy/${props._id}`);
    };

    return (
        <div className='Product' >
            <div className='productSecondDiv' onClick={handleBuy}>
                <img className='ProductImage' src={props.productImage} alt={props.name} />
                {props.discount && (
                    <div className="productSecondDivdiscount-label">
                        {props.discount}%
                    </div>
                )}
            </div>
            <div className='productThirdDiv' onClick={handleBuy}>
                <p className='productThirdDivText'>{props.name}</p>
                 
            </div>
            <div className='productThirdfiveDiv' onClick={handleBuy}>
                <p className='productThirdfiveDivText'>{props.category}</p>
                 
            </div>
            <div className='productFourthDivUser' onClick={handleBuy}>
                <div className='productFourthDivText'>Rs {props.price}</div>
            </div>
        </div>
    );
}

export default ProductUser;
