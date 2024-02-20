import { Form, Modal } from 'antd';
import Axios from 'axios';
import React, { useState } from 'react';
import { marketplaceUrl } from '~/repositories/Repository';

const Add_Affilate_Accnt = () => {
    const [refresh, setRefresh] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        var obj = {
            reportingAccountName: fd.get("accountName"),
            phone: fd.get("accountPhone"),
            email: fd.get("accountEmail"),
            address: fd.get("accountAddress")
        }
        if (obj?.phone.length < 10 || obj?.phone.length < 10) {
            alert("invalid mobile number, 10 digit required!!");
        } else {
            Axios.post(`${marketplaceUrl}/saveAffilateAccountDatails`, obj, {

            }).then(
                async (response) => {

                    if (response?.data?.status == 0) {
                        const modal = Modal.success({
                            centered: true,
                            title: 'Success!',
                            content: `Affilate account created successfully.`,
                        });
                        setRefresh(!refresh);
                    } else {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Error!!',
                            content: response?.data?.message,
                        });
                    }
                },
                (error) => {
                    console.error(error);
                }
            )
        }
    }

    return (
        <div className="ps-section--custom">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12 offset-md-3">
                        <div className='card px-3 py-5'>
                            <form
                                className="ps-form__billing-info"
                                onSubmit={(event) => { handleLoginSubmit(event) }}>
                                <div>

                                    <h3 className="ps-form__heading pb-2">Create Affiliate Account</h3>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            placeholder='Enter Account Name'
                                            required="true"
                                            name="accountName"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            placeholder='Enter Account email'
                                            required="true"
                                            name="accountEmail"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            placeholder='Enter Account phone number'
                                            required="true"
                                            name="accountPhone"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            placeholder='Enter Address'
                                            required="true"
                                            name="accountAddress"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="ps-btn">Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Add_Affilate_Accnt;
