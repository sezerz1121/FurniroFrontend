import React from 'react';
import OrderCard from './OrderCard';

const OrderCardList = ({ orders, userID, products }) => {
  // Check if orders or products are null or undefined
  if (!orders || !products) {
    return <div>...</div>;
  }
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className='productListEditing'>
      {orders.slice().reverse().map(order => (
        order.orderItems.map(item => {
          // Find the product that matches the productId in the order item
          const product = products.find(p => p.productId === item.productId);
          // Get the product name, if product is found
          const productName = product ? product.name : 'Unknown Product';
          const proudctPicture = product ? product.productImage:"";
          const ProductId = product ? product.productId:"";
        
          return (
            <OrderCard key={item._id} orderPrice={order.orderPrice} productName={productName} productImage={proudctPicture} date={formatDate(order.createdAt)} name={productName} Total={order.orderPrice} ProductId={ProductId}/>
          );
        })
      ))}
    </div>
  );
};

export default OrderCardList;
