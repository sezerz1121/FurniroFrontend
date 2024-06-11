import React, { useEffect, useState } from 'react';
import Navbar from './Component/Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import ProductListHome from './Component/ProductListHome.jsx';
import axios from 'axios';

function Shop() {
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
    navigate("/shop");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar email={user?.email} _id={user?._id} />

      <div className='currentPageBar'>
        <div>
          <div className='currentPageBarTitle'>Shop</div>
          <div className='currentPageBarTextDiv'>
            <div className='currentPageBarText' onClick={handleNavigateHome}>Home</div>
            <div className='currentPageBarText' onClick={handleNavigateShop}>Shop</div>
          </div>
        </div>
      </div>

      <div className='ShopFilterDiv'>
        <div className='ShopFilter'>
          <div className='ShopFilterText'><HiOutlineAdjustmentsHorizontal /></div>
          <div className='ShopFilterText'>Filter</div>
        </div>
        <div className='ShopDivDif'></div>
        <div className='ShopFilerInputTextDiv'>
          <p className='ShopFilerInputText'>Category</p>
          <select className='ShopFilerInput' onChange={handleChangeCategory}>
            <option value="">Category</option>
            <option value="Sofa">Sofa</option>
            <option value="Table">Table</option>
            <option value="Jhula">Jhula</option>
            <option value="Bed">Bed</option>
            <option value="Chair">Chair</option>
          </select>
        </div>
        <div className='ShopFilerInputTextDiv'>
          <p className='ShopFilerInputText'>Min Amount</p>
          <input className='ShopFilerInput' onChange={handleChangeMinAmount} />
        </div>
        <div className='ShopFilerInputTextDiv'>
          <p className='ShopFilerInputText'>Max Amount</p>
          <input className='ShopFilerInput' onChange={handleChangeMaxAmount} />
        </div>
      </div>

      <div className='FurniroProductsDiv'>
        <div className='FurniroProducts'>
          <ProductListHome
            products={products}
            userID={user?._id}
            categorys={category}
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
              <div className='FurniroFooterDivITextDivII'>
                <p className='FurniroFooterDivITextII'>400 University Drive Suite 200 Coral<br /> Gables,<br /> FL 33134 USA</p>
              </div>
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

export default Shop;
