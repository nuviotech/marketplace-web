import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import { marketplaceUrl } from '~/repositories/Repository';
import axios from 'axios';

import { Form, Input, Modal, Select } from 'antd';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            password2: null,
            phone: null,
            reportingAccountId:0,
            // city: null,
            //state: "Nan",
            //country: null,
            //shippingAddress: null
            reportingAccntDetails:[]
        };
        this.fetchData = this.fetchData.bind(this);
    }
  
    fetchData() {
     fetch(marketplaceUrl + '/getReportingAccountDetails')
      .then(response => response.json())
      .then(data => this.setState({ reportingAccntDetails:data }));
    }
  
    componentDidMount() {
      this.fetchData();
    }

    
    getData=()=>{
        var reportingAccountDetails=[];
        this.state?.reportingAccntDetails?.map(data=>{
            var obj ={
                value: data?.reportingAccountId,
                label: data?.reportingAccountName,
              }
              reportingAccountDetails.push(obj);
        })
        return reportingAccountDetails;
    }
    onChange = (value) => {
        this.setState({reportingAccountId:value});
    };
      

    handleSubmit = async (e) => {
        // e.preventDefault();
        //  console.log(JSON.stringify(this.state))

        if (this.state.firstName == '' || this.state.lastName == '') {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid input!',
                content: `Please enter first name or last name.`,
            });
            modal.update;
        } else if (this.state.phone.length < 10) {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid input!',
                content: `Please enter correct phone number.`,
            });
        } else if (this.state.password.length < 4 || this.state.password.length > 20) {
            const modal = Modal.error({
                centered: true,
                title: 'Invalid password!',
                content: `password must be greter than 4 character or less than 20 character.`,
            });
            modal.update;
        } else if (this.state.password != this.state.password2) {
            const modal = Modal.error({
                centered: true,
                title: 'Wrong confirm password!',
                content: `enter the same password in password field or confirm password field.`,
            });
            modal.update;
        } else {
            await axios.post(`${marketplaceUrl}/saveUser`, this.state).then(
                (response) => {
                    var statusCode = response.data;
                    if (statusCode == '-1') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Invalid input!',
                            content: `Please enter valid first name or last name.`,
                        });
                        modal.update;
                    } else if (statusCode == '-2') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Invalid input!',
                            content: `Please enter valid first name or last name.`,
                        });
                        modal.update;
                    } else if (statusCode == '-3') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Invalid input!',
                            content: `Please enter valid first name or last name.`,
                        });
                        modal.update;
                    } else if (statusCode == '-4') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Invalid input!',
                            content: `Please enter valid first name or last name.`,
                        });
                        modal.update;
                    } else if (statusCode == '-5') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Email already exists!!',
                            content: `Please try with another email id, this email already present.`,
                        });
                        modal.update;
                    } else if (statusCode == '-6') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Invalid state!!',
                            content: `please select the state.`,
                        });
                        modal.update;
                    } else if (statusCode == '1') {
                        const modal = Modal.error({
                            centered: true,
                            title: 'Server Error!!',
                            content: `Something went wrong on server.`,
                        });
                        modal.update;
                    } else if (statusCode == '0') {
                        const modal = Modal.success({
                            centered: true,
                            title: 'Successfully Registered !',
                            content: `You'r Information is successfully saved on server, please login with credentials..`,
                        });
                        modal.update;
                        Router.push('/account/login');
                    }
                },
                (error) => {
                    console.error("Register user (error) : " + error);
                    alert("Something went wrong on server!!");
                }
            )
        }

        this.props.form?.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch(login());
                Router.push('/account/login');
            } else {
            }
        });
    };

    render() {
        return (

            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                        
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="firstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter your first name!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="First Name"
                                                    name="fname"
                                                    onChange={(event) => { this.setState({ firstName: event.target.value }) }}

                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="lastName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter your last name!!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    name="last_name"
                                                    onChange={(event) => { this.setState({ lastName: event.target.value }) }}

                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email id"
                                            onChange={(event) => { this.setState({ email: event.target.value }) }}

                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your contact!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter contact"
                                            onChange={(event) => { this.setState({ phone: event.target.value }) }}

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
                                            onChange={(event) => { this.setState({ password: event.target.value }) }}

                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password2"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please repeat your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="repeat password.."
                                            id='password2'
                                            onChange={(event) => { this.setState({ password2: event.target.value }) }}

                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Select
                                        showSearch
                                        placeholder="select reporting accounts"
                                        optionFilterProp="children"
                                        style={{ width: "100%" }}
                                        onChange={this.onChange}
                                        options={this.getData()}
                                    />
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                            </div>
                            {/*<div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                             </div>*/}
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
export default connect(mapStateToProps)(Register);
