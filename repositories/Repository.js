import axios from 'axios';
import { myDecipher } from './RepoSequrity';
const baseDomain = 'http://localhost:1337'; // API for products
export const basePostUrl = 'http://localhost:1337'; // API for post
export const baseStoreURL = 'http://localhost:1337'; // API for vendor(store)

export const policyMakerUrl = "http://localhost:9001";//change the name policy maker  url
export const marketplaceUrl = "http://localhost:8089";//marketplace api url
//export const policyMakerKey = myDecipher("343f4950613e646437735e6d3e4f2d645640703f4f564564");
export const policyMakerKey = process.env.API_KEY;


export const customHeaders = {
    Accept: 'application/json',
   // 'Access-Control-Allow-Origin': 'https://manageecom.com:8001,https://manageecom.com:8003,https://manageecom.com:8004'
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
