import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { marketplaceUrl } from "~/repositories/Repository";

export const ModuleProductVariation = ({ product }) => {
    const [variationProducts, setVariationProducts] = useState([]);
    const router = useRouter();

    const getVariations = async () => {
        await Axios.get(`${marketplaceUrl}/getProductVariations?variationId=${product?.productVariationId}`)
            .then(
                (response) => {
                    setVariationProducts(response?.data);
                },
                (error) => {
                    console.error("product variation : " + error);
                    return null;
                }
            )
    }

    useEffect(() => {
        getVariations();
    }, [product]);



    return (
        <>
            {
                variationProducts.map(vd => {
                    var variation = "";
                    var variationProduct = JSON.parse(vd?.product);
                    JSON?.parse(vd?.data)?.map(vName => {
                        variation += vName?.key + " : " + vName.value + " ";
                    })

                    return (
                        <Link href="/product/[pid]" as={`/product/${variationProduct?.title?.replaceAll("/", " | ").replaceAll(" ", "-")}&pid=${variationProduct?.id}`}>
                            {product?.id===variationProduct?.id ?
                                <button className="btn btn-bg btn-info mx-1">{variation}</button>
                            :
                                <button className="btn btn-bg btn-outline-dark mx-1">{variation}</button>
                            }
                        </Link>
                    )
                })
            }



        </>
    )
}