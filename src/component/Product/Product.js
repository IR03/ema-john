import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

    const Product = (props) => {
     //console.log(props.handleAddProduct);
    const {name, img, seller, price, stock, key} = props?.product || {};
    // const name = props.product?.name;
    // const img = props.product?.img;
    // const seller = props.product?.seller;
    // const price = props.product?.price;
    // const stock = props.product?.stock;
    
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div> 
            <div>
                <h4 className="product-name"> <Link to ={"/product/"+key}>{name}</Link> </h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button 
                   className="main-button" 
                   onClick={()=>props.handleAddProduct(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>}
            </div>
        </div>

    );
};

export default Product;