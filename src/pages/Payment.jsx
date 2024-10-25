import React, { useState, useEffect } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Stripe from '../components/Stripe';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const { state: { price, items, orderId } } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const navigate = useNavigate();

    // eSewa payment configuration
    const eSewaMerchantId = 'EPAYTEST';
    const eSewaSecretKey = 'cb46a901-c14c-4e0e-8ea0-015a09285569';
    const eSewaUrl = 'https://uat.esewa.com.np/epay/main';
    const successURL = 'http://localhost:3000/payment/success';
    const failureURL = 'http://localhost:3000/payment/failure';

    // Handle eSewa payment
    const handleESewaPayment = () => {
        const serviceCharge = 0;
        const deliveryCharge = 0;
        const taxPercentage = 0.13;
        const taxAmount = parseFloat(price) * taxPercentage;
        const totalAmount = parseFloat(price) + taxAmount + serviceCharge + deliveryCharge;

        const paymentData = {
            amt: price,
            txAmt: taxAmount,
            psc: serviceCharge,
            pdc: deliveryCharge,
            tAmt: totalAmount.toFixed(2),
            pid: orderId,
            scd: eSewaMerchantId,
            su: successURL,
            fu: failureURL
        };

        // Redirect to eSewa payment page
        const queryString = new URLSearchParams(paymentData).toString();
        window.location.href = `${eSewaUrl}?${queryString}`;
    };

    // Handle eSewa payment success
    const handleESewaSuccess = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const refId = urlParams.get('refId');
        const oid = urlParams.get('oid');
        const amt = urlParams.get('amt');

        try {
            // Verify the payment with your backend
            const response = await axios.post('/api/payment/verify', {
                refId,
                oid,
                amt
            });

            if (response.data.success) {
                // Update the payment status in the order
                await axios.post('/api/orders/update-payment-status', {
                    orderId: oid,
                    paymentStatus: 'paid'
                });

                // Navigate to the orders page after updating the status
                navigate('/seller/dashboard/orders');
            } else {
                alert('Payment verification failed!');
            }
        } catch (error) {
            console.error('Payment verification error:', error);
            alert('An error occurred during payment verification.');
        }
    };

    useEffect(() => {
        const currentUrl = window.location.href;
        if (currentUrl.includes('payment/success')) {
            handleESewaSuccess();
        }
    }, []);

    return (
        <div>
            <Headers />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                    <div className='flex flex-wrap md:flex-col-reverse'>
                        <div className='w-7/12 md:w-full'>
                            <div className='pr-2 md:pr-0'>
                                <div className='flex flex-wrap'>
                                    <div onClick={() => setPaymentMethod('stripe')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src="http://localhost:3000/images/payment/stripe.png" alt="stripe" />
                                            <span className='text-slate-600'>Stripe</span>
                                        </div>
                                    </div>
                                    <div onClick={() => setPaymentMethod('esewa')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'esewa' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src="http://localhost:3000/images/payment/esewa.png" alt="esewa" />
                                            <span className='text-slate-600'>eSewa</span>
                                        </div>
                                    </div>
                                    {/* <div onClick={() => setPaymentMethod()} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod ===  ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src="http://localhost:3000/images/payment/" alt=/>
                                            <span className='text-slate-600'></span>
                                        </div>
                                    </div>
                                    <div onClick={() => setPaymentMethod()} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod ===  ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src="http://localhost:3000/images/payment/" alt= />
                                            <span className='text-slate-600'></span>
                                        </div>
                                    </div> */}
                                </div>
                                {/* Stripe payment component */}
                                {paymentMethod === 'stripe' && <Stripe orderId={orderId} price={price} />}
                                {/* eSewa payment button */}
                                {paymentMethod === 'esewa' && (
                                    <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button 
                                            className='px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white'
                                            onClick={handleESewaPayment}
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                )}
                                {/* Other payment methods */}
                            </div>
                        </div>
                        <div className='w-5/12 md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-0'>
                                <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                    <h2>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <span>{items} items and shipping fee included</span>
                                        <span>Npr{price}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Tax (13%)</span>
                                        <span className='text-lg text-orange-500'>Npr{(price * 0.13).toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Total Amount</span>
                                        <span className='text-lg text-orange-500'>Npr{(parseFloat(price) + (price * 0.13)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div> 
    );
};

export default Payment;
