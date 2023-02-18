import axios from 'axios';
const baseDomain = 'https://nuvio.in:8443'; // API for products
export const basePostUrl = 'https://nuvio.in:8443'; // API for post
export const baseStoreURL = 'https://nuvio.in:8443'; // API for vendor(store)

export const sellerProductUrl = 'https://manageecom.com:8001'; // API seller product url
export const sellerPolicyUrl = "https://manageecom.com:8003";//change the name policy maker  url
export const marketplaceUrl = "https://manageecom.com:8004";//marketplace api url

export const customHeaders = {
    Accept: 'application/json',
	//'Access-Control-Allow-Origin': 'https://manageecom.com:8001,https://manageecom.com:8003,https://manageecom.com:8004,https://nuvio.in:8443,https://nuvio.in'
	//'Access-Control-Allow-Origin': '*',
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
