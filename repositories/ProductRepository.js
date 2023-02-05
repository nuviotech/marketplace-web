import Repository, { baseUrl, serializeQuery,sellerProductUrl,sellerPolicyUrl } from './Repository';

class ProductRepository {
    async getRecords(params) {
        const reponse = await Repository.get(
            `${sellerProductUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
          console.log("get Recorder quesry: products?  : "+JSON.stringify(response) );
        return reponse;
    }

    async getProducts(params) {
        const reponse = await Repository.get(
            `${sellerProductUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        console.log(serializeQuery(params)+" *****get all products : "+JSON.stringify(reponse));    
        return reponse;
    }

    async getBrands() {
        //`${baseUrl}/brands`
        const reponse = await Repository.get(`${sellerPolicyUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
            console.log("get all brands are call. : "+JSON.stringify(reponse));
        return reponse;
    }

    async getProductCategories() {
        //${baseUrl}/product-categories
        const reponse = await Repository.get(`${sellerPolicyUrl}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        console.log("get all categorys are call. : "+JSON.stringify(reponse));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(`${sellerProductUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        console.log("total record call "+JSON.stringify(reponse));    
        return reponse;
    }
    //getProduct
    async getProductsById(payload) {
        const reponse = await Repository.get(`${sellerProductUrl}/products/${payload}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        console.log("get product by id : "+JSON.stringify(reponse));
        return reponse;
    }

    async getProductsByCategory(payload) {
        const reponse = await Repository.get(
            `${sellerProductUrl}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        console.log("getProductsByCategory "+JSON.stringify(reponse));
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${sellerProductUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        console.log("get product by brands : "+reponse);    
        return reponse;
    }

    async getProductsByIds(payload) {
        //const endPoint = `${baseUrl}/products?${payload}`;
        const endPoint = `${sellerProductUrl}/productsByIds?${payload}`;
        const reponse = await Repository.get(endPoint)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });

        console.log("getproductByIds (payload): "+payload);
        return reponse;
    }
}

export default new ProductRepository();
