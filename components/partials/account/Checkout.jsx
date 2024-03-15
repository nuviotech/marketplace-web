import React, { useEffect, useState } from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import useEcomerce from '~/hooks/useEcomerce';
const Checkout = () => {
    const [coupon, setCoupon] = useState(null);
    const [orderTotalAmt, setOrderTotalAmt] = useState();
    const handleSetCoupon = (couponCode, amt) => {
        setCoupon(couponCode);
        setOrderTotalAmt(amt);
    }
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__content px-md-5 mx-md-5">
                    <div className="ps-form--checkout">
                        {/* this for laptop sreen */}
                        <div className="ps-form__content d-md-block d-none">
                            <div className="row ">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                    <FormCheckoutInformation coupon={coupon} orderTotalAmt={orderTotalAmt} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>Your Order</h3>
                                        <ModulePaymentOrderSummary handleSetCoupon={handleSetCoupon} />
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* this for mobile sreen */}
                        <div className="ps-form__content d-block d-md-none ">
                            <div className="row ">
                                <div className="mx-4 alert alert-info" role="alert">
                                    <h4 className="alert-heading">Just a little more to go!</h4>
                                    <p>To complete your order, we just need a bit more information. <u>Please provide your shipping details </u> below to ensure your order arrives without a hitch.</p>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>Your Order</h3>
                                        <ModulePaymentOrderSummary handleSetCoupon={handleSetCoupon} />
                                    </div>

                                </div>

                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                    <FormCheckoutInformation coupon={coupon} orderTotalAmt={orderTotalAmt} />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
