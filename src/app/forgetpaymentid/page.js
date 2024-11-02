"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

const ForgetPaymentId = () => {
    const [email, setEmail] = useState('');
    const [guardianNumber, setGuardianNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        setIsButtonDisabled(!emailRegex.test(email) || !guardianNumber.trim());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, guardianNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            setLoading(true);
            console.log('Fetching data...');
            const response = await axios.get('/api/payment/get');

            if (response.data.success) {
                const payment = response.data.data.find((p) => p.email === email && p.guardianNumber === guardianNumber);

                if (!payment) {
                    throw new Error('Payment ID not found. Please check your details and try again.');
                }
                setMessage(`Your Payment ID is: ${payment.paymentId}`);
                toast.success('Payment ID retrieved successfully!');
                setTimeout(() => {
                    toast.info(
                        `Your Payment ID is: ${payment.paymentId}`,
                        { draggable: false, autoClose: false }
                    );
                }, 1000);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            setError(err.message || 'Failed to retrieve Payment ID. Please try again.');
            toast.error('Failed to retrieve Payment ID. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">Forgot Payment ID</h2>
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
                    <label htmlFor="guardianNumber" className="block text-sm font-medium text-gray-700">
                        Guardian Number
                    </label>
                    <input
                        type="text"
                        id="guardianNumber"
                        value={guardianNumber}
                        onChange={(e) => setGuardianNumber(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isButtonDisabled || loading}
                    className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    Retrieve Payment ID
                </button>

                {/* Verify Payment Option */}
                <Link href='/verifyuser' className='text-center'>
                    <button className="mt-4 text-sm w-full text-blue-500 hover:underline">
                        Back to Verify Payment
                    </button>
                </Link>
            </form>
            {message && <p className="mt-4">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default ForgetPaymentId;
