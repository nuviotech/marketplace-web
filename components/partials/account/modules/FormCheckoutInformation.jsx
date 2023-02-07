import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { marketplaceUrl } from '~/repositories/Repository';
import Link from 'next/link';
import { Form, Input , Modal} from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const FormCheckoutInformation = ({ ecomerce }) => {
    console.log("eccomerce : " + JSON.stringify(ecomerce.cartItems));
    let totalAmount=0;
    const [review, setReview] = useState({});
    const { products, getProducts } = useEcomerce();
    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
            
        }
    }, [ecomerce]);

    if (products && products.length > 0) {
        totalAmount = calculateAmount(products);
    }

    const handleLoginSubmit = () => {
        const orderInformation = {
            "fname": review.fname,
            "lname": review.last_name,
            "shippingAddressPrimary": review.address,
            "landmark": review.apprtment_name,
            "city": review.city,
            "postalCode": review.postal_code,
            "products": ecomerce.cartItems,
            "contactNumber": review.contact,
            "totalBill":totalAmount 
        }

        console.log(orderInformation);

        placeOrder(orderInformation);
        //  Router.push('/account/shipping');

    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }

    const placeOrder = (data) => {
        axios.post(`${marketplaceUrl}/saveOrderDetails`, data).then(
            async (response) => {
                const result = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                if (!result) {
                    alert("network issue...");
                }
                const amt=totalAmount;
                console.log("amt "+amt)
                const Razorpay_payment = response.data.RZ_order;
                const order_ref_id = response.data.order_id;
                const options = {
                    key: response.data.rzKey,
                    currency: "INR",
                    name: "Payment gateway.",
                    description: "Test Wallet Transaction",
                    image: "http://localhost:3000/static/img/nuvio.png",
                    order_id: Razorpay_payment.id,
                    handler: function (response) {

                        const payment_id = response.razorpay_payment_id;
                        const rz_order_id = response.razorpay_order_id;
                        const signature = response.razorpay_signature;

                        if (response.razorpay_payment_id) {
                            //update the states of order payment
                            const paymentObject = {
                                "rzPaymentId": payment_id,
                                "rzOrderId": rz_order_id,
                                "rzSignature": signature,
                                "orderID": order_ref_id
                            }
                            axios.post(`${marketplaceUrl}/updateOrder`, paymentObject).then(
                                (response) => {
                                   // alert("payment is success full");
                                   const modal = Modal.success({
                                    centered: true,
                                    title: 'Payment Success!',
                                    content: `Thank you! Your order is `+order_ref_id,
                                    });
                                    modal.update;
                                    review.fname="";
                                },
                                (error) => {
                                    alert("error happning in update payment status...")
                                }
                            )

                        }
                    },
                    prefill: {
                        name:review.fname+" "+review.last_name,
                        email: "xyz@gmail.com",
                        contact:review.contact,
                    },
                    theme: {
                        color: "#fcb800"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();



                //order details is save to database
                //console.log("Razor pay details : "+JSON.stringify(response));
                // alert(" Order are successfully save to store. ");

                //Router.push('/account/payment');

            },
            (error) => {
                //order details is not save to database
                alert("Something went wrong!");
            }
        )
    }


    //const{fname}=this.state;
    return (
        <Form

            className="ps-form__billing-info"
            onFinish={handleLoginSubmit}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: false,
                            message:
                                'Enter an mobile phone number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="phone number"
                        name="contact"
                        onChange={(e) => {
                            setReview({ ...review, contact: e.target.value })
                        }}
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="keep-update"

                    />
                    <label htmlFor="keep-update">
                        Keep me up to date on news and exclusive offers?
                    </label>
                </div>
            </div>
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter your first name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="First Name"
                                name="fname"
                                onChange={(e) => {
                                    setReview({ ...review, fname: e.target.value })
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter your last name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                onChange={(e) => {
                                    setReview({ ...review, last_name: e.target.value })
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                        name="address"
                        onChange={(e) => {
                            setReview({ ...review, address: e.target.value })
                        }}
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item
                    name="apartment"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an Apartment!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        name="apprtment_name"
                        onChange={(e) => {
                            setReview({ ...review, apprtment_name: e.target.value })
                        }}
                    />
                </Form.Item>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter a city!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="city"
                                placeholder="City"
                                name="city"
                                onChange={(e) => {
                                    setReview({ ...review, city: e.target.value })
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="postalCode"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter a postal oce!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="postalCode"
                                placeholder="Postal Code"
                                name="postal_code"
                                onChange={(e) => {
                                    setReview({ ...review, postal_code: e.target.value })
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="save-information"
                    />
                    <label htmlFor="save-information">
                        Save this information for next time
                    </label>
                </div>
            </div>
            <div className="ps-form__submit">
                <Link href="/account/cart">
                    <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to shopping cart
                    </a>
                </Link>
                <div className="ps-block__footer">
                    <button className="ps-btn">Continue to shipping</button>
                </div>
            </div>
        </Form>
    );
}
export default connect((state) => state)(FormCheckoutInformation);
//export default FormCheckoutInformation;