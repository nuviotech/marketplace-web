import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

const FooterSecond = ({ classes }) => {
    
    return(
    <footer className={`ps-footer ps-footer--2 ${classes}`}>
        <div className="container">
            <div className="ps-footer__content">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">
                                        Quick links
                                    </h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/policy">
                                                <a>Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/terms_of_service">
                                                <a>Term Of Service</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Shipping</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Return</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/faqs">
                                                <a>FAQs</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Company</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/about-us">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/career_nuvio">
                                                <a>Career</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/contact-us">
                                                <a>Contact</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Bussiness</h4>
                                    <ul className="ps-list--link">
                                        
                                        <li>
                                            <Link href="/account/checkout">
                                                <a>Checkout</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/account/login">
                                                <a>My account</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/shop">
                                                <a>Shop</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <aside className="widget widget_newletters">
                            <h4 className="widget-title">Newsletter</h4>
                            <form
                                className="ps-form--newletter"
                                action="#"
                                method="get">
                                <div className="form-group--nest">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                    <button onClick={()=>{saveSubscriber()}} className="ps-btn">
                                        Subscribe
                                    </button>
                                </div>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google-plus" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="ps-footer__copyright">
                <p className='text-center'>&copy; 2023 For Nuvio.in (Nuvio Sellers Private Limited) All Rights Reserved</p>
               
            </div>
        </div>
    </footer>
    );
};

export default FooterSecond;
