import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";

function ProductListed(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/edit/${props._id}`);
    };

    return (
        <div className='Product'>
            <div className='productFirstDiv'>
                {/* You can add content or additional elements here if needed */}
            </div>
            <div className='productSecondDiv'>
                <img className='ProductImage' src={props.productImage} alt={props.name} />
            </div>
            <div className='productThirdDiv'>
                <p className='productThirdDivText'>{props.name}</p> 
            </div>
            <div className='productFourthDiv'>
                <button className='ProductEditButton' onClick={handleClick}>
                    <div><MdModeEditOutline /></div>
                </button>
            </div>
        </div>
    );
}

export default ProductListed;
