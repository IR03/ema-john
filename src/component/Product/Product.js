import React from 'react';

const Product = (props) => {
    // console.log(props.product);

    return (
        <div className="product">
            <h4>{props.product?.name}</h4>
            <h4>{props.product?.wholePrice}</h4>
        </div>
        
    );
};

export default Product;