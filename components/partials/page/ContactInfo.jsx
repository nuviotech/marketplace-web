import React from 'react';
import Link from 'next/link';

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container">
            <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div>
            <div className="ps-section__content">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Contact Directly</h4>
                            <p>
                                <a href="mailto:support@nuvio.in">
                                    support@nuvio.in
                                </a>
                                <span>+91 8928268145</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Registered Address</h4>
                            <p>
                                <span>
                                    Shop No. 1, Shakti Dham, Plot No. 108 Ghansoli, Navi Mumbai - 400701, Maharashtra, India 
                                </span> || <br/>
                                <span>905,The Crown, Nr. D-Mart, Gharkul, Sector 15, Kharghar, Navi Mumbai, Maharashtra 410210</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Work With Us</h4>
                            <p>
                                <span>Send your CV to our email:</span>
                                <a href="#">support@nuvio.in</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Customer Service</h4>
                            <p>
                                <a href="#">support@nuvio.in</a>
                                <span>+91 8928268145</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Media Relations</h4>
                            <p>
                                <a href="#">support@nuvio.in</a>
                                <span>+91 8928268145</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Vendor Support</h4>
                            <p>
                                <a href="#">support@nuvio.in</a>
                                <span>+91 8928268145</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactInfo;
