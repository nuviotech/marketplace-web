import { Checkbox, Form, Modal, Steps, Tabs } from 'antd';
import Axios from 'axios';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react';
import { marketplaceUrl } from '~/repositories/Repository';
import { saveToken } from '~/store/auth/action';

const Add_Affilate_Accnt = () => {
    const [checkBox, setCheckBox] = useState(false);

    const onChangeCheckBox = (e) => {
        setCheckBox(e.target.checked);
    };

    const loginAxiosAction = (event) => {
        event.preventDefault();
        const dt = new FormData(event.currentTarget);
        const loginCredentials = {
            email: dt.get("accountEmail"),
            loginGateway: "affiliate_account",
            password: dt.get("password"),
        }

        Axios.post(`${marketplaceUrl}/login`, loginCredentials).then(
            async (response) => {
                // console.log(JSON.stringify(response));
                var token = response.data.Token;
                var status = response.data.status;
                if (status == 0) {
                    saveToken(token, "affiliate_account");
                    //this.props.dispatch(login());
                    //this.props.dispatch(loginSuccess());
                    // Router.push('/');

                    window.location.assign('/');
                } else if (status == 1) {
                    const modal = Modal.error({
                        centered: true,
                        title: 'Opps, something went wrong!!',
                        content: `` + response.data.message,
                    });
                    modal.update;
                }
            },
            (error) => {
                const modal = Modal.error({
                    centered: true,
                    title: 'Wrong credentials !!',
                    content: `Email or password is wrong, please enter correct one.. `,
                });
                modal.update;
                console.error("error : " + error);

            }
        )
    }


    const handleAddAffiliateAccntSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        var obj = {
            reportingAccountName: fd.get("accountName"),
            phone: fd.get("accountPhone"),
            email: fd.get("accountEmail"),
            address: fd.get("accountAddress"),
            password: fd.get("pass")
        }
        if (obj?.phone.length < 10 || obj?.phone.length < 10) {
            Modal.info({
                centered: true,
                title: 'invalid mobile number, 10 digit required!!',
            });
        } else if (!checkBox) {
            const modal = Modal.info({
                centered: true,
                title: 'Accept terms and conditions...',
            });
        } else if (fd.get("pass") != fd.get("cpass")) {
            Modal.error({
                centered: true,
                title: 'Password and confirm password not match..',
            });
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
                        
                        window.location.assign("/page/add_affiliate_accnt");
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

    const desc = [
        <>
            <ul className='text-dark'>
                <li>Fill out the registration form with personal details such as name, email address, contact number, and any other required information.</li>
                <li>Create a username and password for logging into the affiliate account.</li>
                <li>Agree to the terms and conditions of the affiliate program.</li>
                <li>Submit the registration form.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>Once the registration is complete and verified, the affiliate contact person can log in to their affiliate account using the username(email) and password they created during registration.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>Upon logging in, the affiliate contact person will be directed to their dashboard. Here, they can access various tools and resources provided by the marketplace software to manage their affiliate account.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>In the dashboard, there should be an option to generate an affiliate link. The affiliate contact person can create a unique affiliate link that they can share with society members.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>The affiliate contact person should share the affiliate link with the members of their society or apartment complex. They can do this through email, social media, or any other communication channels they prefer.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>The affiliate contact person can track the referrals and purchases made by society members through their affiliate dashboard. They should be able to see details such as the number of clicks on their affiliate link, the number of purchases made, and the amount of commission earned.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>Based on the purchases made by society members using the affiliate link, the marketplace software should automatically calculate the commission earned by the affiliate contact person.</li>
                <li>The marketplace software should have a mechanism in place to distribute the cashback or commission to the affiliate contact person's designated account or payment method.</li>
            </ul>
        </>,
        <>
            <ul className='text-dark'>
                <li>The affiliate contact person should regularly monitor their affiliate account, track performance, and manage settings as needed. This includes updating personal information, adjusting payment preferences, and accessing support if required.</li>
            </ul>
        </>
    ]


    const affiliateRegistrationForm = <form
        className="ps-form__billing-info"
        onSubmit={(event) => { handleAddAffiliateAccntSubmit(event) }}>
        <div>
            <h3 className="ps-form__heading pb-2">Create Affiliate Account</h3>
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    placeholder='Enter Account/Society Name'
                    required="true"
                    name="accountName"
                />
            </div>
            <div className="form-group">
                <input type="email"
                    className="form-control"
                    placeholder='Enter Account/Society email'
                    required="true"
                    name="accountEmail"
                />
            </div>
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    placeholder='Enter Account/Society phone number'
                    required="true"
                    name="accountPhone"
                />
            </div>
            <div className="form-group">
                <input type="password"
                    className="form-control"
                    placeholder='Password'
                    required="true"
                    name="pass"
                />
            </div>
            <div className="form-group">
                <input type="password"
                    className="form-control"
                    placeholder='Confirm password'
                    required="true"
                    name="cpass"
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
            <div className="form-group">
                <Checkbox onChange={onChangeCheckBox}>Accept Term Conditions <a href="/page/affiliate_marketing_terms_and_conditions"><u>read all</u></a></Checkbox>
            </div>
        </div>
        <div>
            <button type="submit" className="ps-btn">Create Account</button>
        </div>
    </form>


    const affiliateLogin = <form
        className="ps-form__billing-info"
        onSubmit={(event) => { loginAxiosAction(event) }}>
        <div>
            <h3 className="ps-form__heading pb-2">Login Affiliate Account</h3>
            <div className="form-group">
                <input type="email"
                    className="form-control"
                    placeholder='Enter Account/Society Email'
                    required="true"
                    name="accountEmail"
                />
            </div>
            <div className="form-group">
                <input type="password"
                    className="form-control"
                    placeholder='Enter Account/Society password'
                    required="true"
                    name="password"
                />
            </div>
        </div>
        <div>
            <button type="submit" className="ps-btn">Login</button>
        </div>
    </form>

    const items = [
        {
            key: '1',
            label: 'Login',
            children: affiliateLogin,
        },
        {
            key: '2',
            label: 'Register',
            children: affiliateRegistrationForm,
        }
    ];


    return (
        <div className="ps-section--custom">
            <div className="container">
                <div className="row">

                    <div className="col-md-6 col-12">
                        <Tabs defaultActiveKey="2" items={items} />

                    </div>
                    <div className="col-md-6 col-12">
                        <h3 className="ps-form__heading pb-2">How affiliate program works?</h3>
                        <Steps
                            direction="vertical"

                            items={[
                                {
                                    title: 'Registration',
                                    description: desc[0],
                                },
                                {
                                    title: 'Login',
                                    description: desc[1],
                                },
                                {
                                    title: 'Dashboard Access',
                                    description: desc[2],
                                },
                                {
                                    title: 'Generate Affiliate Link',
                                    description: desc[3],
                                },
                                {
                                    title: 'Share Affiliate Link with Society Members',
                                    description: desc[4],
                                },
                                {
                                    title: 'Track Referrals and Purchases',
                                    description: desc[5],
                                },
                                {
                                    title: 'Cashback Distribution',
                                    description: desc[6],
                                },
                                {
                                    title: 'Account Management',
                                    description: desc[7],
                                },
                            ]}
                        />

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Add_Affilate_Accnt;
