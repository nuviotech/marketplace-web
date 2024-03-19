import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { marketplaceUrl } from '~/repositories/Repository';
import Axios from 'axios';
import { getToken, logOut } from '~/store/auth/action';
import { Modal } from 'antd';

const ModulePaymentOrderSummary = ({ ecomerce, shipping, handleSetCoupon }) => {
    //const[tax,setTax] =useState(0);
    const [coupon, setCoupon] = useState(null);
    const { products, getProducts } = useEcomerce();
    const [couponDiscount, setCouponDiscount] = useState({ isValid: false, discountAmt: 0, msg: null })
    const [defaultCoupon, setDefaultCoupon] = useState(null);
    // view
    let listItemsView, shippingView, totalView;
    let amount;

    const showCoupon = () =>{
        const modal = Modal.success({
            centered: true,
            title: 'Success',
            content: `Your coupon code is:  ${defaultCoupon}`,
        });
        modal.update;
    }
    const getDefaultCouponDetails = async () => {
        await Axios.get(`${marketplaceUrl}/getDefaultCoupon`)
            .then(
                (response) => {
                    if (response?.data?.status == 0) {
                        setDefaultCoupon(response?.data?.coupon)
                    } else {
                        console.error("Default coupon : " + response);
                    }
                },
                (error) => {
                    console.error("Default coupon : " + error);
                    return null;
                }
            )
    }

    useEffect(() => {
        if (ecomerce.cartItems) {
            getDefaultCouponDetails();
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);

    //check validation coupon here
    const handleApplyCoupon = async () => {
        const obj = {
            products: JSON.stringify(ecomerce.cartItems),
            coupon: coupon,
            amount: parseInt(amount)
        }

        await Axios.post(`${marketplaceUrl}/applyCoupon`, obj, {
            // headers: {
            //     Authorization: "Bearer " + getToken(),
            // }
        }).then(
            (response) => {
                if (response.data.status == 0) {
                    handleSetCoupon(coupon, parseInt(amount));
                    setCouponDiscount({ isValid: true, discountAmt: response.data.discountedPrice, coupon: coupon })
                    const modal = Modal.success({
                        centered: true,
                        title: 'Valid Coupon Code.',
                        content: response.data.message,
                    });
                    modal.update;
                }
                if (response.data.status == 1) {
                    handleSetCoupon(null, 0);
                    setCouponDiscount({ isValid: false, discountAmt: 0, msg: null })
                    const modal = Modal.error({
                        centered: true,
                        title: 'Invalid Coupon Code.',
                        content: response.data.message,
                    });
                    modal.update;
                }
            },
            (error) => {
                logOut();
                console.error(error);
                window.location.assign("/account/login")
                return error;
            }
        ).catch(err => {
            return (err)
        });
    }


    //let tax=0;
    if (products && products.length > 0) {
        amount = calculateAmount(products);

        listItemsView = products.map((item) => {
            // tax +=(item.sale_price * item.hsnRate / (100 + (item.hsnRate*1))) * item.quantity
            return (
                <Link href="/" key={item.id}>

                    <a>
                        <strong>
                            {item.title}
                            <span>x{item.quantity}</span>
                        </strong>
                        <small>₹{item.quantity * item.sale_price}.00 <del>₹{item.quantity * item.price}.00</del></small>
                    </a>
                </Link>
            );


        });
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (true) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>₹50.00</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    {
                        parseInt(amount) > 0 ?
                            <strong>₹{parseInt(amount) + 50}.00</strong>
                            :
                            <strong>₹ 00.00</strong>
                    }

                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>₹{parseInt(amount)}</strong>
                </h3>
            </figure>
        );
    }
    return (
        <>        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                {/*<figure>
                    <figcaption className='text-danger'>
                        <strong>Total Tax </strong>
                        <small>₹{tax.toFixed(2)}</small>
                    </figcaption>
                </figure>*/}
                {shippingView}
                {totalView}

            </div>
        </div>

            {/* coupon functionality */}

            <div className="ps-form__orders mt-2">
                <figure>
                    <figcaption>
                        <h4>Coupon Discount</h4>
                    </figcaption>
                    {defaultCoupon &&
                        <p ><b>Don't have a coupon?No worries! </b> <u onClick={()=>{showCoupon()}} style={{cursor:"pointer"}} className='text-warning'>Click here </u>to grab yours and enjoy special discounts on your next purchase!</p>
                    }
                    {
                        couponDiscount.isValid &&
                        <div className='card p-3'>
                            <h5>Coupon code : <strong>{couponDiscount.coupon}</strong> </h5>
                            <h5>Before Coupon Applied Price :  <strong>₹{parseInt(amount) + 50}.00 </strong></h5>
                            <h5>After Coupon Applied Price :  <strong>₹{couponDiscount.discountAmt + 50}.00</strong></h5>
                        </div>


                    }
                    <div className=' p-3'>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter coupon here..."
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-right">
                            <button onClick={() => { handleApplyCoupon() }} className="ps-btn ps-btn--outline">
                                Apply Coupon
                            </button>
                        </div>
                    </div>
                </figure>
            </div >
        </>

    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);