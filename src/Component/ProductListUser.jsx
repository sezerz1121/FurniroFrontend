import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import ProductUser from './ProductUser.jsx';
const ProductListUser = ({ products,userID }) => {
  // Check if products is null or undefined
  if (!products) {
    return <div>y</div>;
  }
  console.log(products)
  const [visibleCount, setVisibleCount] = useState(6); 

  const showMoreProducts = () => {
      setVisibleCount(prevCount => prevCount + 6); 
  };

  const reversedProducts = [...products].reverse();

  return (
    <div >
      
    <div className='productListEdting'>
    {reversedProducts.slice(0, visibleCount).map(product => (
  <ProductUser key={product._id} productImage={product.productImage} name={product.name} _id={product._id} userId={userID} price={product.prices[0].price} category={product.category[0].name} discount={product.discount}/>
    ))}
    </div>
    {visibleCount < products.length && (
                <button onClick={showMoreProducts} className="show-more-btn">
                    Show More
    </button>
    )}
    </div>
  );
};

export default ProductListUser;