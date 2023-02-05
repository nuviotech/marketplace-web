import axios from 'axios';
const baseDomain = 'http://localhost:1337'; // API for products
export const basePostUrl = 'http://localhost:1337'; // API for post
export const baseStoreURL = 'http://localhost:1337'; // API for vendor(store)

export const sellerProductUrl = 'http://localhost:9090'; // API seller product url
export const sellerPolicyUrl = "http://localhost:9001";//change the name policy maker  url
export const marketplaceUrl = "http://localhost:8089";//marketplace url

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;
//export const sellerProductUrl=`${spURL}`;


export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
