import axios from 'axios';
const baseDomain = 'https://nuvio.in:8443'; // API for products
export const basePostUrl = 'https://nuvio.in:8443'; // API for post
export const baseStoreURL = 'https://nuvio.in:8443'; // API for vendor(store)

export const policyMakerUrl = "https://nuviosellers.com:8003";//change the name policy maker  url
export const marketplaceUrl = "https://nuvio.in:8004";//marketplace api url

export const customHeaders = {
    Accept: 'application/json',
};


export const baseUrl = `${baseDomain}`;


export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    console.log("Serializing query : "+query);
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
