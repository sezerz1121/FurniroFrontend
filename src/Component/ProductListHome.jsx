import React, { useState, useEffect } from 'react';
import ProductUser from './ProductUser.jsx';

const ProductListHome = ({ products, userID, categorys, minPrice, maxPrice }) => {
  // Check if products is null or undefined
  if (!products) {
    return <div>Loading...</div>;
  }

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  // Reset the current page when the category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [categorys]);

  // Filter products to include only those in the specified category and within the price range
  const filteredProducts = products.filter(product => {
    const inCategory = !categorys || (product.category && product.category.some(cat => cat.name.includes(categorys)));
    const price = product.prices[0].price;
    const inPriceRange = price >= minPrice && price <= maxPrice;
    return inCategory && inPriceRange;
  });

  // Get the current products to display based on pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle the next button click
  const handleNextPage = () => {
    if (endIndex < filteredProducts.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Handle the back button click
  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className='productListEditing'>
      <div className='productss'>
        {currentProducts.length > 0 ? (
          currentProducts.reverse().map(product => (
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
      <div className="pagination-buttonss">
        {currentPage > 0 && (
          <button onClick={handleBackPage}>Back</button>
        )}
        {endIndex < filteredProducts.length && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default ProductListHome;

