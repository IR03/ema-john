import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://rocky-depths-31427.herokuapp.com/products/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    },[productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    document.title = "Product Detail";
    return (
        <div>
            <h1>Product Details</h1>
            <Product 
           showAddToCart = {false} product= {product}></Product>
        </div>
    );
};

export default ProductDetail;