import React, { useState, useEffect } from 'react';
import Navbar from './Component/Navbar';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductListUser from './Component/ProductListUser';

function SavedProduct() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = sessionStorage.getItem("accessToken");
                if (!accessToken) {
                    navigate("/signin");
                    return;
                }
                const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/userinfo`, { accessToken });
                setUser(response.data.data.userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (user && user._id) {
                    const response = await axios.post(`${import.meta.env.VITE_APIURL}/save/savedproductlist`, { userId: user._id });
                    setProducts(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [user]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            {user ? (
                <>
                    <Navbar email={user.email} _id={user._id}/>
                    <div className='savedDiv'>
                        <div className='savedBack' onClick={handleBack}>
                            <IoArrowBack />
                        </div>
                        <div className='savedTitle'>
                            <p>Saved</p>
                        </div>
                        <div>
                            <ProductListUser products={products} userID={user._id} />
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default SavedProduct;
