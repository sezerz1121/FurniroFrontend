import React, { useState, useEffect } from 'react';
import Navbar from './Component/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductListUser from './Component/ProductListUser.jsx';
import ProductListHome from './Component/ProductListHome.jsx';

function HomePage() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("home page");
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
        setTitle(error.response?.data?.message || 'Error fetching data');
        setTimeout(() => {
          setTitle("home page");
        }, 3000);
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

  const handleBuyPic = () => {
    navigate('/buy/665ed7511d92e036f2aabb2c');
  }
  const handleDining = () => {
    navigate('/dining');
  }
  const handleLiving = () => {
    navigate('/living');
  }
  const handleBedroom = () => {
    navigate('/bedroom');
  }

  return (
    <>
      <Navbar email={user?.email} _id={user?._id} />

      <div className='HomeDiv'>
        <div className='HomeShowcaseImageDiv'>
          <div className='HomeShowcaseInfoDiv'>
            <div className='HomeShowcaseTextDiv'>
              <p className='HomeShowcaseTextI'>New Arrival</p>
              <p className='HomeShowcaseTextII'>Discover Our<br /> New Collection</p>
              <p className='HomeShowcaseTextIII'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut<br /> elit tellus, luctus nec ullamcorper mattis.</p>
              <div className='HomeShowcaseButton' onClick={handleBuyPic}>BUY NOW</div>
            </div>
          </div>
        </div>
        <div className='HomeRange'>
          <div className='HomeRangeTitleDiv'>
            <p className='HomeRangeTitle'>Browse The Range</p>
            <p className='HomeRangeText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className='HomeRangImagesDiv'>
            <div className='HomeRangImagesparent' onClick={handleDining}>
              <img className='HomeRangImages' src='/Images/animegenius_fd67a7030e53a3f1d90dda0fc3ac5d5c.png' />
              <p className='HomeRangImagesText'>Dining</p>
            </div>
            <div className='HomeRangImagesparent' onClick={handleLiving}>
              <img className='HomeRangImages' src='/Images/animegenius_b1e5404bf089e629c8c2342e16550045.png' />
              <p className='HomeRangImagesText'>Living</p>
            </div>
            <div className='HomeRangImagesparent' onClick={handleBedroom}>
              <img className='HomeRangImages' src='/Images/animegenius_e3d9b2dcd6e8193576ad08693c0112f7.png' />
              <p className='HomeRangImagesText'>Bedroom</p>
            </div>
          </div>
          <div className='FurniroProducts'>
            <div className='FurniroProductsText'><p>Our Products</p></div>
            <ProductListUser products={products} userID={user?._id} />
          </div>
          <div className='FurniroShare'>
            <div><p className='FurniroShareTextDiv'>Share your setup with</p></div>
            <div><p className='FurniroShareTextDiv2'>#FuniroFurniture</p></div>
            <div className='FurniroSharecollage'>
              <img src='/Images/Images.png' />
            </div>
          </div>
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
      </div>
    </>
  );
}

export default HomePage;
