import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { login,loginSuccess,saveToken} from '../../../store/auth/action';
import { marketplaceUrl } from '~/repositories/Repository';

import { Form, Input, notification ,Modal} from 'antd';
import { connect } from 'react-redux';
import { AuthContextProvider } from '~/context/loginContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:null,
            password:null,
            login:false,
            store:null,
        };
    }

    

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    

    handleLoginSubmit = e => {
        console.log('test');
        //alert(this.state.email+" | "+this.state.password);
        const loginCredentials = {
            email:this.state.email,
            password:this.state.password,
        }


        
        axios.post(`${marketplaceUrl}/login`,loginCredentials).then(
            async (response) => {
                console.log(JSON.stringify(response));
               var token=response.data.Token;
                var status=response.data.status;
                if(status==0){
                    saveToken(token);
                    //this.props.dispatch(login());
                    //this.props.dispatch(loginSuccess());
                   // Router.push('/');
                    window.location.assign('/');
                }else if(status==1){
                    const modal = Modal.error({
                        centered: true,
                        title: 'Opps, something went wrong!!',
                        content: ``+response.data.message,
                        });
                        modal.update;
                }
            },
            (error)=>{
                const modal = Modal.error({
                    centered: true,
                    title: 'Wrong credentials !!',
                    content: `Email or password is wrong, please enter correct one.. `,
                });
                modal.update;
                console.error("error : "+error);
                
            }
        )
        

       // this.props.dispatch(login());
      //  Router.push('/');
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="enter email address"
                                            onChange={(event)=> {this.setState({email:event.target.value})} }
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            onChange={(event)=>{this.setState({password:event.target.value})}}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        <label htmlFor="remember-me">
                                            Rememeber me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a
                                            className="facebook"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="google"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="instagram"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);
