import axios from 'axios';
const baseDomain = 'http://manageecom.com:1337'; // API for products
export const basePostUrl = 'http://manageecom.com:1337'; // API for post
export const baseStoreURL = 'http://manageecom.com:1337'; // API for vendor(store)


export const sellerProductUrl = 'http://manageecom.com:8081'; // API seller product url
export const sellerPolicyUrl = "http://manageecom.com:8083";//change the name policy maker  url
export const marketplaceUrl = "http://manageecom.com:8084";//marketplace api url

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
