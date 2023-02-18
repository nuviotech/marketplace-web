import React, { Component } from 'react';
import { Table, Divider, Tag, Modal } from 'antd';
import Link from 'next/link';
import { getToken } from '~/store/auth/action';
import { marketplaceUrl } from '~/repositories/Repository';
import axios from 'axios';

class TableInvoices extends Component {
    constructor(props) {
        super(props);
       // alert(JSON.stringify(props))

        this.state = {
        };
    }
    render() {
        /*
            You can change data by API
            example: https://ant.design/components/table/
        */
        const tableData=[];
        this.props.data.orders?.map((data)=>{
          //  var r=data.razorpayOrderDetails?.replace("\\","");
          
            var obj={
                id: data.orderId,
                invoiceId: data.orderId,
                razorpayId:JSON.parse(data.razorpayOrderDetails)?.id,
                title: 'Marshall Kilburn Portable Wireless Speaker',
                dateCreate: ""+new Date(data.orderDate).toISOString().split('T')[0] ,
                amount: data.totalBill,
                paymentStatus:data.paymentStatus,
                status: data.orderStatus,
            }
            tableData.push(obj);
        })
    /*
        //payment code here
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement('script')
                script.src = src;
                script.onload = () => {
                    resolve(true);
                }
                script.onerror = () => {
                    resolve(false);
                }
                document.body.appendChild(script);
            })
        }
    
    const payment= async (orderId,totalAmount,rzOrderId)=>{
            alert(orderId+" | "+totalAmount+" | "+rzOrderId);
            
            const result = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!result) {
                alert("network issue...");
                return;
            }
            const amt = totalAmount;
            console.log("amt " + amt)
            const Razorpay_payment = rzOrderId;
            const order_ref_id = orderId;
            const options = {
                key: "rzp_test_qN46tu51pwl8nZ",//arange the key dynamicaly
                currency: "INR",
                name: "Payment gateway.",
                description: "Test Wallet Transaction",
                image: "/static/img/nuvioseller.png",
                order_id: Razorpay_payment.id,
                handler: function (response) {

                    const payment_id = response.razorpay_payment_id;
                    const rz_order_id = response.razorpay_order_id;
                    const signature = response.razorpay_signature;

                    if (response.razorpay_payment_id) {
                        //update the states of order payment
                        const paymentObject = {
                            "rzPaymentId": payment_id,
                            "rzOrderId": rz_order_id,
                            "rzSignature": signature,
                            "orderID": order_ref_id
                        }
                        axios.post(`${marketplaceUrl}/updateOrder`, paymentObject, {
                            headers: {
                                Authorization: "Bearer "+getToken(),
                            }
                        }).then(
                            (response) => {
                                // alert("payment is success full");
                                const modal = Modal.success({
                                    centered: true,
                                    title: 'Payment Success!',
                                    content: `Thank you! Your order is ` + order_ref_id,
                                });
                                modal.update;
                                review.fname = "";
                            },
                            (error) => {
                                alert("error happning in update payment status...")
                            }
                        )

                    }
                },
                prefill: {
                    name: this.props.data.firstName + " " + this.props.data.lastName,
                    email: this.props.data.email,
                    contact: this.props.data.phone,
                },
                theme: {
                    color: "#fcb800"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            

            //order details is save to database
            //console.log("Razor pay details : "+JSON.stringify(response));
            // alert(" Order are successfully save to store. ");

            //Router.push('/account/payment');
        }
        //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

       const tableData = [
            {
                id: '1',
                invoiceId: '500884010',
                title: 'Marshall Kilburn Portable Wireless Speaker',
                dateCreate: '20-1-2020',
                amount: '42.99',
                status: 'Successful delivery',
            }
        ];
*/
        //const tableData = this.props.data.orders;
        //alert(JSON.stringify(tableData));
        const tableColumn = [
            {
                title: 'Id',
                dataIndex: 'invoiceId',
                rowKey: 'invoiceId',
                key: 'invoiceId',
                width: '90px',
                render: (text, record) => (
                    <Link href="/account/invoice-detail">
                        {record.invoiceId}
                    </Link>
                ),
            },
            {
                title: 'Title',
                dataIndex: 'title',
                rowKey: 'title',
                key: 'title',
            },
            {
                title: 'Date',
                rowKey: 'dateCreate',
                dataIndex: 'dateCreate',
                key: 'dateCreate',
                width: '120px',
            },
            {
                title: 'Amount',
                rowKey: 'amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (text, record) => (
                    <span className="text-right">₹{record.amount}</span>
                ),
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                rowKey: 'status',
                width: '60px',
                render: (text, record) => (
                    <span className="text-right">{record.status}</span>
                ),
            },
            {
                title: 'Action',
                key: 'status',
                dataIndex: 'status',
                rowKey: 'status',
                width: '60px',
                render: (text, record) => (
                    <span className="text-right">
                        {
                        record.paymentStatus=="unpaid"?
                            <button onClick={()=>{removeOrder(record.id)}} className="btn btn-outline-danger">Remove</button>
                        : record.status==null?
                            <button onClick={()=>{removeOrder(record.id)}} className="btn btn-outline-warning">Cancel</button>
                            :
                            <></>
                        }
                    </span>
                ),
            },
            
        ];
        return (
            <Table
                columns={tableColumn}
                dataSource={tableData}
                rowKey={record => record.id}
            />
        );
    }
}

export default TableInvoices;
