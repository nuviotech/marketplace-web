import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import { Rate } from 'antd';

const Product = ({ product }) => {
    const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <>
            {
                product &&
                <div className="ps-product">
                    <div className="ps-product__thumbnail">
                        <Link href="/product/[pid]" as={`/product/${product?.title?.replaceAll("/", " | ").replaceAll(" ", "-")}&pid=${product?.id}`}>
                            <a>{thumbnailImage(product)}</a>
                        </Link>
                        {badge(product)}
                        <ModuleProductActions product={product} />
                    </div>
                    <div className="ps-product__container">
                        {/* <Link href="/shop">
                            <a className="ps-product__vendor">shopper</a>
                        </Link> */}
                        <div className="ps-product__content">
                            {title(product)}
                            {
                                (product?.totalRatingRation != null && product?.totalRatingRation?.split(":")[0] > 0) &&
                                <Rate allowHalf defaultValue={product?.totalRatingRation?.split(":")[0]} disabled />
                            }
                            
                            {price(product)}
                        </div>
                        <div className="ps-product__content hover">
                            {title(product)}
                            {price(product)}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Product;
