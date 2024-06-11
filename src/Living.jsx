import React, { useEffect, useState } from 'react';
import Navbar from './Component/Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import ProductListHome from './Component/ProductListHome.jsx';
import axios from 'axios';
import { MdArrowForwardIos } from "react-icons/md";

function Living() {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(null);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(20000);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
          const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/userinfo`, { accessToken });
          setUser(response.data.data.userInfo);
        }
      } catch (error) {
        console.error('Error fetching User info:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIURL}/products/productAll`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    fetchUserData();
  }, []);

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeMinAmount = (e) => {
    setMinAmount(e.target.value);
  };

  const handleChangeMaxAmount = (e) => {
    setMaxAmount(e.target.value);
    if (!e.target.value) {
      setMaxAmount(20000);
    }
  };

  const handleNavigateShop = () => {
    navigate("/living");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar email={user?.email} _id={user?._id} />
      <div className='BuyPage'>
        <div className='BuyPageTextI' onClick={handleNavigateHome}>Home</div>
        <div className='BuyPageTextIIarrow'><MdArrowForwardIos /></div>
        <div className='BuyPageTextII' onClick={handleNavigateShop}>Living</div>
        <div className='BuyDivDif'></div>
      </div>


      <div className='FurniroProductsDiv'>
        <div className='FurniroProducts'>
          <ProductListHome 
            products={products} 
            userID={user?._id} 
            categorys={'Living'} 
            minPrice={minAmount} 
            maxPrice={maxAmount} 
          />
        </div>
      </div>
      
      <div className='ShopDiv'>
        <div className='FurniroFooterParent'>
          <div className='FurniroFooter'>
            <div className='FurniroFooterDivI'>
              <div className='FurniroFooterDivITextDivI'><p className='FurniroFooterDivITextI'>Furniro.</p></div>
              <div className='FurniroFooterDivITextDivII'><p className='FurniroFooterDivITextII'>400 University Drive Suite 200 Coral<br /> Gables,<br /> FL 33134 USA</p></div>
            </div>
            <div className='FurniroFooterDivII'>
              <div className='FurniroFooterDivIITextDivIII'><p className='FurniroFooterDivIITextIII'>Links</p></div>
              <div className='FurniroFooterDivIITextDivVI'><p className='FurniroFooterDivIITextVI'>Home</p></div>
              <div className='FurniroFooterDivIITextDivVI'><p className='FurniroFooterDivIITextVI'>Shop</p></div>
              <div className='FurniroFooterDivIITextDivVI'><p className='FurniroFooterDivIITextVI'>About</p></div>
              <div className='FurniroFooterDivIITextDivVI'><p className='FurniroFooterDivIITextVI'>Contact</p></div>
            </div>
            <div className='FurniroFooterDivII'>
              <div className='FurniroFooterDivIITextDivIII'><p className='FurniroFooterDivIITextIII'>Help</p></div>
              <div className='FurniroFooterDivIITextDivVI'><p className='FurniroFooterDivIITextVI'>Returns</p></div>
            </div>
          </div>
          <div className='FurniroFooterRights'>
            <div>2023 furino. All rights reserved</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Living;
