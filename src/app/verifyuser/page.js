"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const VerifyPayment = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        setIsButtonDisabled(!emailRegex.test(email) || !paymentId.trim());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, paymentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            setLoading(true);
            const response = await axios.get('/api/payment/get');
            const payment = response.data.data.find((p) => p.email === email && p.paymentId === paymentId);
            if (!payment) {
                throw new Error('Payment not found. Please check your details and try again.');
            }
            setMessage('Verification successful!');
            toast.success('Payment verified successfully!');
            router.push('/submission');
        } catch (err) {
            setError('Verification failed. Please try again.');
            toast.error('Verification failed. Please try again')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] bg-[aliceblue]">
            <h2 className="text-3xl font-bold mb-4">Verify Your Payment</h2>
            <form onSubmit={handleSubmit} className="w-[85vw] md:w-[25vw] bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">
                        Payment ID
                    </label>
                    <input
                        type="text"
                        id="paymentId"
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isButtonDisabled || loading}
                    className={`w-full flex justify-center items-center bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? ( // Show spinner while voting
                        <Loader className="animate-spin" size={20} />
                    ) : (
                        "Verify Payment"
                    )}
                </button>

                {/* Forgot Payment ID Option */}
                <Link href='/forgetpaymentid' className='text-center'>
                    <button className="mt-4 text-sm w-full text-blue-500 hover:underline">
                        Forgot Payment ID?
                    </button>
                </Link>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default VerifyPayment;
