import React from 'react';


const ProductImageUploader = ({ handleChange }) => {
  const fileInputRef = React.createRef();

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='productInputImageDiv' onClick={handleDivClick}>
      <input
        type="file"
        placeholder='Add product image'
        name="productImage"
        onChange={handleChange}
        required
        className='productInputImage'
        ref={fileInputRef}
      />
      click to upload picture
    </div>
  );
};

export default ProductImageUploader;
