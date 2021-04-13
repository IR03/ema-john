import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

    const Product = (props) => {
     //console.log(props.handleAddProduct);
     
    const name = props.product?.name;
    const img = props.product?.img;
    const seller = props.product?.seller;
    const price = props.product?.price;
    const stock = props.product?.stock;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button 
                   className="main-button" 
                   onClick={()=>props.handleAddProduct(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>
            </div>
        </div>

    );
};

export default Product;