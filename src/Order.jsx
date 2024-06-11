import React, { useState, useEffect } from 'react';
import Navbar from './Component/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrderCardList from './Component/OrderCardList';
import { IoArrowBack } from "react-icons/io5";

function Order() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("Orders");
  const [orders, setOrders] = useState(null);
  const [products,setProducts]=useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          navigate("/signin");
          return; // Add return here to prevent further execution if there's no accessToken
        }
        const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/userinfo`, { accessToken });
        setUser(response.data.data.userInfo);
         // Log the response instead of user which is not yet set
      } catch (error) {
        console.error('Error fetching User info:', error);
      }
    };

    fetchUserData();
  }, [navigate]);


  useEffect(() => {
    const fetchUserOrder = async () => {
      if (user) {
        try {
          const userId = user._id;
          const response = await axios.post(`${import.meta.env.VITE_APIURL}/order/userorders`, { userId });
          setOrders(response.data.data);

  
          // Extract unique productIds from orders
          const products = response.data.data.flatMap(order =>
            order.orderItems.map(item => item)
          )
          setProducts(products);
        } catch (error) {
          console.error('Error fetching User orders:', error);
          // Handle error here, perhaps show a message to the user
        }
      }
    };
  
    fetchUserOrder();
  }, [user]); // Dependency array now includes `user`
   // Dependency array now includes `user`
   const handleBack = () => {
    navigate(-1);
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar email={user.email} _id={user._id} />
      
      <div className='savedBack' onClick={handleBack}>
        <IoArrowBack />
      </div>
      <div className='savedTitle'>
                            <p>Orders</p>
      </div>
      <div className='OrderDiv'>
        <OrderCardList orders={orders} userID={user._id}  products={products}/>
      </div>
    </>
  );
}

export default Order;
