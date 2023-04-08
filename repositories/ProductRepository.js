import Repository, { baseUrl, serializeQuery, marketplaceUrl, policyMakerUrl } from './Repository';

class ProductRepository {

  /*  //this method helps of SSG (Static side generation) SSR
    async getAllProducts() {
        const reponse = await Repository.get(
            `${marketplaceUrl}/getAllProducts`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
*/
    async getRecords(params) {
        //alert(JSON.stringify(params));
        const reponse = await Repository.get(
            `${marketplaceUrl}/searchRecords?keyword=${serializeQuery(params)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
          //console.log("get Recorder quesry: products?  : "+JSON.stringify(response) );
        return reponse;
    }

    async getProducts(params) {
       // alert("get product "+JSON.stringify(params));
        const reponse = await Repository.get(
            `${marketplaceUrl}/products?${serializeQuery(params)}`
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
        //console.log(serializeQuery(params)+" *****get all products : "+JSON.stringify(reponse));    
        return reponse;
    }

    async getBrands() {
        //`${baseUrl}/brands`
        const reponse = await Repository.get(`${policyMakerUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
            console.log("get all brands are call. : "+JSON.stringify(reponse));
        return reponse;
    }

    async getProductCategories() {
        //${baseUrl}/product-categories
        const reponse = await Repository.get(`${policyMakerUrl}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        //console.log("get all categorys are call. : "+JSON.stringify(reponse));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(`${marketplaceUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        //console.log("total record call "+JSON.stringify(reponse));    
        return reponse;
    }
    
    //getProduct
    async getProductsById(payload) {
        const reponse = await Repository.get(`${marketplaceUrl}/products/${payload}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        //console.log("get product by id : "+JSON.stringify(reponse));
        return reponse;
    }

    async getProductsByCategory(payload) {
        const reponse = await Repository.get(
            `${marketplaceUrl}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data;
                    }else{
                        return null;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        //console.log("@@@@@@@@@@@ getProductsByCategory "+JSON.stringify(reponse));
        return reponse;
    }

    async getProductsByBrand(payload) {
       // alert("## "+payload)
        const reponse = await Repository.get(
            `${marketplaceUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                console.warn(JSON.stringify(response.data))
                if (response.data) {
                    if (response.data.length > 0) {
                        console.log("brd;  "+response.data[0])
                        return response.data;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
       // console.log("@@@@ get product by brands : "+reponse);    
        return reponse;
    }

    async getProductsByIds(payload) {
        //const endPoint = `${baseUrl}/products?${payload}`;
        const endPoint = `${marketplaceUrl}/productsByIds?${payload}`;
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

       // console.log("getproductByIds (payload): "+payload);
        return reponse;
    }
}

export default new ProductRepository();
