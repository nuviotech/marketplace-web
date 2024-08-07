import React from 'react';

const DownloadApp = () => (
    <section className="ps-download-app">
        <div className="ps-container">
            <div className="ps-block--download-app">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block__thumbnail">
                                <img style={{width:"510", height:"396"}} src="/static/img/App.webp" alt="Nuvio" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block__content">
                                <h3>Download {process.env.NEXT_PUBLIC_WEBSITE_NAME} App Now!</h3>
                                <p>
                                    Shopping fastly and easily more with our app. Get a link to
                                    download the app on your phone
                                </p>
                                <form
                                    className="ps-form--download-app"
                                    action="do_action"
                                    method="post">
                                    <div className="form-group--nest">
                                        <input
                                            className="form-control"
                                            type="Email"
                                            placeholder="Email Address"
                                        />
                                        <button className="ps-btn">Subscribe</button>
                                    </div>
                                </form>
                                <p className="download-link">
                                    <a href="#">
                                        <img style={{width:"127px",height:"43px"}} src="/static/img/google-play.png" alt="nuvio-google" />
                                    </a>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default DownloadApp;
