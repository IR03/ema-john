import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import'./Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart , setCart] = useState([]);
    // document.title = "Shop More";
    //same as review.js

    useEffect(()=>{
        fetch('https://rocky-depths-31427.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    
    useEffect(()=>{
        const saveCart =getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        fetch('https://rocky-depths-31427.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    //data passing on cart
    const handleAddProduct = (product) => {
        const toBeAddedKey =product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart , product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className ="twin-container">
            <div className="product-container">
                {
                  products.map(product => <Product
                    key = {product.key}
                    showAddToCart = {true} 
                    handleAddProduct = {handleAddProduct}
                    product = {product}
                    ></Product>)
                } 
            </div>
            <div className="cart-container">
                {/* cart data pass by cart = {cart} */}
                <Cart cart = {cart}>
                    <Link to = '/review'>
                       <button className ="main-button" >Review Order</button>
                    </Link>
               </Cart>
            </div>
            
            
        </div>
    );
};

export default Shop;