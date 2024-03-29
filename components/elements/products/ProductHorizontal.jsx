import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductHorizontal = ({ product }) => {
    const { thumbnailImage, price, title } = useProduct();
    return (
        <>
            {
                product &&
                <div className="ps-product--horizontal">
                    <div className="ps-product__thumbnail">
                        <Link href="/product/[pid]" as={`/product/${product?.title?.replaceAll("/", " | ").replaceAll(" ", "-")}&pid=${product?.id}`}>
                            <a>{thumbnailImage(product)}</a>
                        </Link>
                    </div>
                    <div className="ps-product__content">
                        {title(product)}
                        {/*
                <div className="ps-product__rating">
                    <Rating />
                </div>
                */}
                        {price(product)}
                    </div>
                </div>
            }
        </>
    );
};

export default ProductHorizontal;
