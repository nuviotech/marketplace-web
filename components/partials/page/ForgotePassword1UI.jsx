import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { marketplaceUrl } from '~/repositories/Repository';
import { getToken } from '~/store/auth/action';

const ForgotePassword1UI = () => {
    const [email, setEmail] = useState(null);
    const [loader,setLoader] = useState(false);


    const sendEmailToResetPassword = () =>{
        if(email != null){
            const data={
                "emailId" : email
            };
            setLoader(true);
            axios.post(`${marketplaceUrl}/forgotePasswordCreateId`,data).then(
                async (response) => {
                    setLoader(false);

                    if(response.status==200){
                        const modal = Modal.success({
                            centered: true,
                            title: 'Success',
                            content: `Email send on your email id please use that link for reset the password..`,
                        });
                        modal.update;
                    }
                },
                (error) => {
                    //order details is not save to database
                    const modal = Modal.error({
                        centered: true,
                        title: 'Failed',
                        content: `Something went wrong `,
                    });
                    modal.update;
                    setLoader(false);
                    console.log("error : " + JSON.stringify(error));
                }
            )

           

        }else{
            alert("please enter valid email id...")
        }
    }

    return (
        <div className='container text-center'>
            <div className='col-12 col-md-6 offset-md-3 my-5'>
                <div className="card p-4 mb-5">
                    <label className='text-left'>Enter Email </label>
                    <Form.Item
                        name="Email id"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your registered email id.',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="email"
                            placeholder="Enter your email id"
                            name="email"
                            onChange={(event) => { setEmail(event.target.value) }}
                        />

                    </Form.Item>
                    <div className="text-right">
                        {loader ? (
                            <i className='fa fa-tv fa-spin fa-2x'>please wait ...</i >
                        ) : (
                            <button onClick={()=>{sendEmailToResetPassword()}} className='btn btn-lg btn-warning'>Send</button>
                        ) 
                        }
                        
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ForgotePassword1UI;
