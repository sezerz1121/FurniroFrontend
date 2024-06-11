import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
    console.log(productId)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post('http://localhost:3000/products/productList', { productId })
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form>
        <label>
          Name:
          <input type="text" placeholder={product.name} />
        </label>
        <label>
          Price:
          <input type="number" placeholder={product.price} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
