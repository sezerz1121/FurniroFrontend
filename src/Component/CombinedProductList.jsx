import React, { useState, useEffect } from 'react';
import ProductUser from './ProductUser.jsx';

const CombinedProductList = ({ products, userID, categorys, minPrice, maxPrice }) => {
  // Check if products is null or undefined
  if (!products) {
    return <div>Loading...</div>;
  }

  const [visibleCount, setVisibleCount] = useState(3);

  // Filter products to include only those in the specified category and within the price range
  const filteredProducts = products.filter(product => {
    const inCategory = !categorys || (product.category && product.category.some(cat => cat.name.includes(categorys)));
    const price = product.prices[0].price;
    const inPriceRange = price >= minPrice && price <= maxPrice;
    return inCategory && inPriceRange;
  });

  // Handle the show more button click
  const showMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 3); // Increment by 3 for "Show More"
  };

  const currentProducts = filteredProducts.slice(0, visibleCount).reverse();

  return (
    <div className='productListEditing'>
      <div className='productss'>
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductUser
              key={product._id}
              productImage={product.productImage}
              name={product.name}
              _id={product._id}
              userId={userID}
              price={product.prices[0].price}
              category={product.category[0].name}
              discount={product.discount}
            />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
      {visibleCount < filteredProducts.length && (
        <button onClick={showMoreProducts} className="show-more-btn">
          Show More
        </button>
      )}
    </div>
  );
};

export default CombinedProductList;
