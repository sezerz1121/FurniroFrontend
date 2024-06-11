import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Component/Navbar';
import { IoArrowBack } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import CombinedProductList from './Component/CombinedProductList';

const Buy = () => {
  const { productId } = useParams();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productSizeClass, setProductSizeClass] = useState('BuySize');
  const [stock, setStock] = useState();
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
        const response = await axios.post(`${import.meta.env.VITE_APIURL}/products/productinfo`, { productId });
        setProduct(response.data.data);

        if (response.data.data.stock !== 0) {
          setStock("available");
        } else {
          setStock('out of stock');
        }
        setProductPrice(response.data.data.prices[0].price);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIURL}/products/productAll`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
    fetchProducts();
    fetchUserData();
  }, [navigate, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSizeClick = (e, index) => {
    const selectedPrice = product.prices[index].price;
    setProductPrice(selectedPrice);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBuy = async () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/buy/${productId}`);
      navigate("/signin");
      return;
    }

    if (!user.address) {
      navigate("/address");
    } else {
      try {
        const userId = user._id;
        const addressId = user.address;
        const quantity = 1;

        const response = await axios.post(`${import.meta.env.VITE_APIURL}/order/buy`, {
          orderPrice: productPrice,
          userId,
          orderItems: [{ productId: productId, name: product.name, productImage: product.productImage, quantity: 1 }],
          addressId
        });
        navigate("/order");
      } catch (error) {
        if (error.response.data.message === 'Product is out of stock') {
          setStock('out of stock');
        }
      }
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
      <div className='BuyPage'>
        <div className='BuyPageTextI' onClick={handleNavigateHome}>Home</div>
        <div className='BuyPageTextIIarrow'><MdArrowForwardIos /></div>
        <div className='BuyPageTextII' onClick={handleNavigateShop}>Shop</div>
        <div className='BuyPageTextIIarrow'><MdArrowForwardIos /></div>
        <div className='BuyDivDif'></div>
        <div className='BuyPageTextIII'>{product.name}</div>
      </div>
      <div className='BuyparentDiv'>
        <div className='BuyImageDiv'>
          <img className='BuyImage' src={product.productImage} alt={product.name} />
        </div>
        <div className='BuyInfoDiv'>
          <div className='BuyName'>
            <p className='BuyNameText'>{product.name}</p>
          </div>
          <div className='BuySizeDivParent'>
            <div className='BuySizeDivlabel'>Size:</div>
            <div className='BuySizeDiv'>
              {product.prices.map((price, index) => (
                <div key={index} className={'BuySize'} name={price.size} onClick={(e) => handleSizeClick(e, index)}>{price.size}</div>
              ))}
            </div>
          </div>
          <div className='BuyPrice'>
            <p>Price: ₹{productPrice} </p>
          </div>
          <div>
            <p className='BuyPrice'>Stock :{stock} </p>
            <div className='BuyButton' onClick={handleBuy}>Buy now</div>
          </div>
        </div>
      </div>
      <div className='BuyExtraProduct'>
        <div className='FurniroProducts'>
          <div className='FurniroProductsText'><p>Related Products</p></div>
          <CombinedProductList
            products={products}
            userID={user?._id}
            categorys={null}
            minPrice={productPrice - 5000}
            maxPrice={productPrice + 5000}
          />
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
    </>
  );
}

export default Buy;
