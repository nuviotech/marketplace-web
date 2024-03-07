import { Button, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { saveUserDetails } from '~/repositories/UserDeatils';

export default function GuestUserForm({ guestUserData }) {
    const [state, setState] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', password2: '' });
    const router = useRouter();
    const [cflag,setCflag]=useState(null);

    const onChangeCatcha = (value) => {
        setCflag(value);
    }

    const handleGuestUserForm = (e) => {
        e.preventDefault();
        const urlRegex = /(https?:\/\/[^\s]+)/gi;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneNumberRegex = /^(?:\+91|0)?[6789]\d{9}$/;

        if (state.firstName == 'undefined' || state?.firstName == '' || state?.lastName == '' || urlRegex.test(state?.firstName)) {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid input!',
                content: `Please enter first name or last name.`,
            });
            modal.update;
        } else if (state.email.length == 0 || !emailRegex.test(state.email) || urlRegex.test(state.email)) {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid Email',
                content: `Please enter valid email.`,
            });
            modal.update;
        } else if (state.phone == 'undefined' || state?.phone?.length < 10 || state?.phone?.length > 10 || !phoneNumberRegex.test(state.phone) || urlRegex.test(state?.phone)) {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid input!',
                content: `Please enter correct phone number.`,
            });
        } else if (state.password == 'undefined' || state?.password?.length < 4 || state?.password?.length > 20 || urlRegex.test(state?.password)) {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid password!',
                content: `password must be greter than 4 character or less than 20 character.`,
            });
            modal.update;
        } else if (state.password != state.password2) {
            const modal = Modal.error({
                centered: true,
                title: 'Wrong confirm password!',
                content: `Please enter the same password in both fields to confirm it..`,
            });
            modal.update;
        }else if(cflag==null){
            const modal = Modal.error({
                centered: true,
                title: 'Check the captcha !!',
                content: `Before proceeding, please complete the CAPTCHA.`,
            });
            modal.update;
        } else {
            saveUserDetails(state, "checkout", router);
            guestUserData(state)
        }

        // console.log(state);
        //guestUserData(state);
    }

    return (
        <div>
            <h3 className="ps-form__heading">Account Information</h3>
            <form>
                <div className="form-group">
                    <div className='row'>
                        <div className="col-12 col-md-6">
                            <input type="text" required="required" className='form-control' placeholder='first name' name="firstName" onChange={(e) => { setState({ ...state, firstName: e.target.value }) }} />
                        </div>
                        <div className="col-12 col-md-6">
                            <input type="text" required="required" className='form-control' placeholder='last name' name="lastName" onChange={(e) => { setState({ ...state, lastName: e.target.value }) }} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="email" required="required" className='form-control' placeholder='email' onChange={(e) => { setState({ ...state, email: e.target.value }) }} />
                </div>
                <div className="form-group">
                    <input type="text" required="required" className='form-control' placeholder='contact number' onChange={(e) => { setState({ ...state, phone: e.target.value }) }} />
                </div>
                <div className="form-group">
                    <div className='row'>
                        <div className="col-12 col-md-6">
                            <input type="password" required="required" className='form-control' placeholder='password' name="password" onChange={(e) => { setState({ ...state, password: e.target.value }) }} />
                        </div>
                        <div className="col-12 col-md-6">
                            <input type="password" required="required" className='form-control' placeholder='confirm password' name="cpass" onChange={(e) => { setState({ ...state, password2: e.target.value }) }} />
                        </div>
                    </div>
                </div>

                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITEKEY}
                    onChange={onChangeCatcha}
                    size="normal"
                />
                <div>
                    <button onClick={handleGuestUserForm} className="ps-btn ps-btn--fullwidth">submit</button>
                </div>
            </form>

        </div >
    )
}
