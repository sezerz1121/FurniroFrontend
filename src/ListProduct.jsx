import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from './Component/TopBar';
import ProductImageUploader from './Component/ProductImageUploader';
import ProductList from './Component/ProductList.jsx';
import { useNavigate } from 'react-router-dom';

function ListProduct() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        productImage: null,
        prices: [{ size: '', price: 0 }],
        discount: 0,
        stock: 0,
        category: '',
        fillingMaterial: '',
        finishType: '',
        adjustableHeadrest: '',
        loadCapacity: 0,
        dimensions: {
            width: 0,
            height: 0,
            depth: 0,
            weight: 0
        }
    });
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APIURL}/products/productAll`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                navigate("/signin");
            }
            const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/userinfo`, { accessToken });
            console.log('User info:', response.data);
            setUser(response.data.data.userInfo);
        } catch (error) {
            console.error('Error fetching User info:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchProducts();
    }, []);

    const handleChange = (e, index) => {
        const { name, value, files } = e.target;
        if (name === 'size' || name === 'price') {
            const newPrices = [...formData.prices];
            newPrices[index][name] = value;
            setFormData({ ...formData, prices: newPrices });
        } else if (name === 'productImage') {
            setFormData({ ...formData, productImage: files[0] });
        } else if (name.includes('dimensions')) {
            const dimensionKey = name.split('.')[1];
            setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, [dimensionKey]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addPriceField = () => {
        if (formData.prices.length < 4) {
            setFormData({
                ...formData,
                prices: [...formData.prices, { size: '', price: 0 }]
            });
        } else {
            console.log("You can only add up to 4 price fields");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('productImage', formData.productImage);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('fillingMaterial', formData.fillingMaterial);
            formDataToSend.append('finishType', formData.finishType);
            formDataToSend.append('adjustableHeadrest', formData.adjustableHeadrest);
            formDataToSend.append('loadCapacity', formData.loadCapacity);
            formDataToSend.append('dimensions[width]', formData.dimensions.width);
            formDataToSend.append('dimensions[height]', formData.dimensions.height);
            formDataToSend.append('dimensions[depth]', formData.dimensions.depth);
            formDataToSend.append('dimensions[weight]', formData.dimensions.weight);
            formDataToSend.append('discount', formData.discount);
            formData.prices.forEach((price, index) => {
                formDataToSend.append(`prices[${index}][size]`, price.size);
                formDataToSend.append(`prices[${index}][price]`, price.price);
            });

            const response = await axios.post(`${import.meta.env.VITE_APIURL}/products/product`, formDataToSend);
            console.log('Product created:', response.data);

            // Reset form data
            setFormData({
                name: '',
                productImage: null,
                prices: [{ size: '', price: 0 }],
                discount: 0,
                stock: 0,
                category: '',
                fillingMaterial: '',
                finishType: '',
                adjustableHeadrest: '',
                loadCapacity: 0,
                dimensions: {
                    width: 0,
                    height: 0,
                    depth: 0,
                    weight: 0
                }
            });

            // Refresh product list
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    if (!user) {
        return <div>loading...</div>;
    }

    if (user?.role !== 'admin') {
        navigate("/");
    }

    return (
        <>
            <TopBar />
            <div className='productListing'>
                <div className='productListingForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='productInputDiv'>
                            <input
                                type="text"
                                name="name"
                                placeholder='Name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='productInput'
                            />
                        </div>
                        <br />
                        <div>
                            <ProductImageUploader handleChange={handleChange} />
                            {formData.productImage && <p>Selected file: {formData.productImage.name}</p>}
                        </div>
                        <br />
                        {formData.prices.map((price, index) => (
                            <div key={index} className='productInputMeasurementDiv'>
                                <input
                                    type="text"
                                    name="size"
                                    value={price.size}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                    placeholder='Size'
                                    className='productInputMeasurement'
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={price.price}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                    className='productInputMeasurement'
                                />
                            </div>
                        ))}
                        <div className='productInputMeasurementAddDiv'>
                            <button type="button" onClick={addPriceField} className='productInputMeasurementAdd'>Add Price</button>
                        </div>
                        <br />
                        <div className='productInputDiv'>
                            <label>Discount:</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className='productInput'
                                placeholder='Discount'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <label>Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Stock'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Category'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="text"
                                name="fillingMaterial"
                                value={formData.fillingMaterial}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Filling Material'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="text"
                                name="finishType"
                                value={formData.finishType}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Finish Type'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <select
                                name="adjustableHeadrest"
                                value={formData.adjustableHeadrest}
                                onChange={handleChange}
                                required
                                className='productInput'
                            >
                                <option value="">Adjustable Headrest</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className='productInputDiv'>
                        <label>Load Capacity:</label>
                            <input
                                type="number"
                                name="loadCapacity"
                                value={formData.loadCapacity}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Load Capacity'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="number"
                                name="dimensions.width"
                                value={formData.dimensions.width}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Width'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="number"
                                name="dimensions.height"
                                value={formData.dimensions.height}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Height'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="number"
                                name="dimensions.depth"
                                value={formData.dimensions.depth}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Depth'
                            />
                        </div>
                        <div className='productInputDiv'>
                            <input
                                type="number"
                                name="dimensions.weight"
                                value={formData.dimensions.weight}
                                onChange={handleChange}
                                required
                                className='productInput'
                                placeholder='Weight'
                            />
                        </div>
                        <div className='productListDiv'>
                            <button type="submit" className='productListAdd' onClick={handleSubmit}>List Product</button>
                        </div>
                    </form>
                </div>
                <div className='DivProductEdit'>
                    <ProductList products={products} />
                </div>
            </div>
        </>
    );
}

export default ListProduct;
