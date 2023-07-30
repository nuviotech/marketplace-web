/*import Axios from "axios";
import { NextResponse } from "next/server";
import { marketplaceUrl } from "~/repositories/Repository";
import { getToken } from "~/store/auth/action";

export default function handler(req,res){
    const reqMethod = req.method;
    if(reqMethod=="POST"){
        const flag = req.query.flag;
        const transactionId = req.query.txid;
       // return res.redirect(307,`http://localhost:3000/account/orders?flag=${flag}&txid=${transactionId}`);
      // return res.redirect(307,`https://nuvio.in/account/orders?flag=${flag}&txid=${transactionId}`);
       return res.writeHead(302, {
        Location: `https://nuvio.in/account/orders?flag=${flag}&txid=${transactionId}`,
        //add other headers here...
      })
    
    }
    
}*/