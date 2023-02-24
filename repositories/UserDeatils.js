//author : Rohit Kawade

import axios from "axios";
import { getToken, logOut, } from "~/store/auth/action";
import { marketplaceUrl } from "./Repository";

export const userData =  async ()=>{
   const data= await axios.get(`${marketplaceUrl}/getUserDetails`, {
        headers: {
            Authorization: "Bearer "+getToken(),
        }
    }).then(
        (response)=>{
            return response.data;
        },
        (error)=>{
            logOut();
            window.location.assign("/account/login")
            return error;
        }
    ).catch(err=>{
        return(err)});
    return data;
}

export const updateUserDetails= async (updatedData)=>{
    const data= await axios.post(`${marketplaceUrl}/updateUserDetails`,updatedData,{
        headers: {
            Authorization: "Bearer "+getToken(),
        }
    }).then(
        (response)=>{
            return response.data;
        },
        (error)=>{
            logOut();
            window.location.assign("/account/login")
            return error;
        }
    ).catch(err=>{
        return(err)});
    return data;
}

export const returnPolicyByUser=async (info)=>{
    const data=await axios.post(`${marketplaceUrl}/returnPolicyByUser`,info,{
        headers: {
            Authorization: "Bearer "+getToken(),
        }
    }).then(
        (responce)=>{
            //alert("res :"+responce.data);
            return responce.data;
        },
        (error)=>{
            alert("something wrong  "+error);
        }
    ).catch(err=>{
        return(err)
    });
    //alert(data);
    return data;
}


