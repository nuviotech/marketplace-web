import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;

    if (product.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">&#8377;{product.sale_price}</del>&#8377;
                {product.price}
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">&#8377;{product.price}</h4>;
    }
    return (
        <header>
            <h1>{product.title}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">{product.brand}</a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div>
            <div> 
                    {priceView}
                M.R.P.: <del>&#8377;{product.price}</del> 
            </div>
        </header>
    );
};

export default ModuleDetailTopInformation;
