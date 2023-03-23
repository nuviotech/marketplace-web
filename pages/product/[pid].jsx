import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import SEO from "@bradgarropy/next-seo"
import axios from 'axios';
import { marketplaceUrl } from '~/repositories/Repository';

const ProductDefaultPage = ({ responseData }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    //alert(responseData.keyWords)
    const title = responseData.title;
    const keyWords = [];
    responseData?.keywords?.split(",").map((item) => keyWords.push(item))
    console.warn(keyWords);
    const description = responseData?.title + " | price : " + responseData?.sale_price;



    async function getProduct(pid) {
        setLoading(true);
        //const responseData = await ProductRepository.getProductsById(pid);
        if (responseData) {
            setProduct(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            headerView = (
                <>
                    <HeaderProduct product={product} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            headerView = (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
    } else {
        productView = <SkeletonProductDetail />;
    }

    return (
        <>
            <SEO title={title} description={description} keywords={keyWords} icon={responseData?.images[0].url} />

            <PageContainer
                header={headerView}
                title={responseData ? responseData.title : 'Loading...'}>
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="ps-page--product">
                    <div className="ps-container">
                        <div className="ps-page__container">
                            <div className="ps-page__left">{productView}</div>
                            <div className="ps-page__right">
                                <ProductWidgets />
                            </div>
                        </div>

                        <CustomerBought
                            layout="fullwidth"
                            collectionSlug="deal-of-the-day"
                        />
                        <RelatedProduct collectionSlug="shop-recommend-items" />
                    </div>
                </div>
                <Newletters />
            </PageContainer>
        </>
    );
};


export async function getStaticPaths() {
    // const responseData = await ProductRepository.getAllProducts();
    const responseData = await axios.get(
        `${marketplaceUrl}/getAllProducts`
    )
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));

    const data = responseData;
    console.log(data);
    const paths = data.map((item) => {
        console.log(item.id);
        return {
            params: {
                pid: item.id.toString()
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const responseData = await ProductRepository.getProductsById(params.pid);

    return {
        props: {
            responseData
        }
    }
}


export default ProductDefaultPage;
