import React from 'react';
import Link from 'next/link';
import ReactWhatsapp from 'react-whatsapp';
import { WhatsappIcon } from 'react-share';
import { FloatingWhatsApp } from 'react-floating-whatsapp';


const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us<br />
                <a
                    href="https://wa.me/+918928268145"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i class="fa fa-whatsapp whatsapp-icon fa-3x text-success"  ></i>
                </a>

            </h4>

            <div className="widget_content">

                <p>Whatsapp us 24/7</p>
                <div className='mb-3'>
                <FloatingWhatsApp phoneNumber="918928268145" accountName="nuvio sellers" />
                
                <ReactWhatsapp number="918928268145" message="Hi" element={"div"} >
                    <WhatsappIcon size={35} round="true"></WhatsappIcon>
                </ReactWhatsapp>

                </div>

                <h3 style={{ fontSize: "19px" }}>+91 8928268145</h3>
                <p>
                    <a href="mailto:support@nuvio.in">support@nuvio.in</a>
                </p>
                <ul className="ps-list--social">
                    <li>
                        <a className="facebook" target='_blank' href="https://www.facebook.com/Nuvio.in">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a className="twitter" target='_blank' href="https://twitter.com/Nuvio_Sellers">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a target='_blank' href="https://in.linkedin.com/company/nuvio-technologies-pvt-ltd">
                            <i className="fa fa-linkedin" style={{ color: "#2e5fb2" }}></i>
                        </a>
                    </li>
                    <li>
                        <a target='_blank' className="instagram" href="https://www.instagram.com/nuvio.in/">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Quick links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/policy">
                        <a>Policy</a>
                    </Link>
                </li>

                <li>
                    <Link href="/page/terms_of_service">
                        <a>Terms Of Service</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/return_policy">
                        <a>Return Policy</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/Cancellation_And_Refund_Policy">
                        <a>Cancellation & Refund Policy</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/shipping_and_delivery">
                        <a>Shipping And Delivery</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/privacy_policy">
                        <a>Privacy Policy</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/faqs">
                        <a>FAQs</a>
                    </Link>
                </li>
            </ul>
        </aside>
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
        <aside className="widget widget_footer">
            <h4 className="widget-title">Bussiness</h4>
            <ul className="ps-list--link">

                <li>
                    <Link href="/account/checkout">
                        <a>Checkout</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/user-information">
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
);

export default FooterWidgets;
