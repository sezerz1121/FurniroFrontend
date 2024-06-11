import React from 'react';
import { Link } from 'react-router-dom';
import ProductListed from './ProductListed'
const ProductList = ({ products }) => {
  // Check if products is null or undefined
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className='productListEdting'>
      
      {products.slice().reverse().map(product => (
  <ProductListed key={product._id} productImage={product.productImage} name={product.name} _id={product._id} />
))}
      
    </div>
  );
};

export default ProductList;
