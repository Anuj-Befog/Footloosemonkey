"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { getRegistrationData, addPaymentData } from '../services/index';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentCheckout = () => {
  const router = useRouter();
  const formRef = useRef(null);

  const [paymentStatus, setPaymentStatus] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [charge, setCharge] = useState('');
  const [userPaymentId, setUserPaymentId] = useState('');
  const [userTalent, setUserTalent] = useState('');
  const [userAgeCriteria, setUserAgeCriteria] = useState('');
  const [userParticipantAge, setUserParticipantAge] = useState('');
  const [registerData, setRegisterData] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  // Load data from getRegistrationData()
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const registrationResponse = await getRegistrationData();
        const paymentResponse = await axios.get('/api/payment/get');

        if (registrationResponse.success && registrationResponse.data) {
          const registrationData = registrationResponse.data[0];

          // Set registration data in state
          setRegisterData([...registrationResponse.data]);
          setUserEmail(registrationData.email);
          setUserName(registrationData.participantName);
          setUserContact(registrationData.guardianNumber);
          setUserAddress(registrationData.address);
          setCharge(registrationData.charge);
          setUserTalent(registrationData.talent);
          setUserAgeCriteria(registrationData.ageCriteria);
          setUserParticipantAge(registrationData.participantAge);

          // Use local variables for email and contact before setting state
          const tempUserEmail = registrationData.email;
          const tempUserContact = registrationData.guardianNumber;

          // Find the payment record based on local variables
          const payment = paymentResponse.data.data.find(
            (p) => p.email === tempUserEmail && p.guardianNumber === tempUserContact
          );

          if (payment) {
            setIsPaid(true);
          }
        } else {
          console.error('Something went wrong');
          toast.error('Something went wrong, Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        toast.error('Something went wrong, Please try again later.');
      }
    };

    fetchRegistrationData();
  }, []);

  // Calculate IGST and CGST
  const igstRate = 9, cgstRate = 9;
  const igstAmount = (charge * igstRate) / 100;
  const cgstAmount = (charge * cgstRate) / 100;
  const totalAmount = Number(charge) + igstAmount + cgstAmount;
  const totalIncludingGST = Number(totalAmount.toFixed(2));
  const razorpayCharge = Math.floor(totalIncludingGST);

  // Handle payment data
  const handlePaymentData = async (paymentId, status) => {
    const paymentData = {
      email: userEmail,
      participantName: userName,
      guardianNumber: userContact,
      address: userAddress,
      charge: charge,
      talent: userTalent,
      ageCriteria: userAgeCriteria,
      participantAge: userParticipantAge,
      isPaid: true,
      paymentId: paymentId,
      status: status,
    };

    const response = await addPaymentData(paymentData);
    if (response.success) {
      toast.success("Payment Successful!");
    } else {
      console.error("Payment Failed:", response.message);
      toast.error("Payment Failed. Please try again later.");
    }
  };

  // Razorpay Payment Gateway Integration or Handle Free Payment
  const initiatePayment = async () => {
    try {
      if (charge == 0) {
        setPaymentStatus(false);
        setIsPaid(false)
        const dummyPaymentId = `pay_${Math.random().toString(36).substring(2, 10)}`;
        setUserPaymentId(dummyPaymentId);
        await handlePaymentData(dummyPaymentId, 'success');

        setTimeout(() => {
          toast.success("You availed the Diwali offer successfully!",
            { autoClose: false })
        }, 1000);

        setTimeout(() => {
          toast.success(
            `Payment successful! Your Token ID = ${dummyPaymentId} has been processed.`,
            { autoClose: false }
          );
        }, 2000);

        // Copy the Payment ID to clipboard
        await navigator.clipboard.writeText(dummyPaymentId);

        setTimeout(() => {
          toast.info(`Your Token ID has been copied to your clipboard. Please keep it safe!`, { autoClose: false }
          )
        }, 3000);

        setTimeout(() => {
          router.push('/verifyuser');
        }, 4000);

        setPaymentStatus(true);
        setIsPaid(true);
        return;
      }

      setPaymentStatus(false); // Disable the button immediately when starting payment
      setIsPaid(false);

      // Make API call to the server for Razorpay order
      const data = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: razorpayCharge * 100 }), // Send charge in paisa
      });

      if (!data.ok) {
        console.error('Failed to fetch Razorpay order:', data.statusText);
        toast.error('Failed to fetch Razorpay order. Please try again later.');
        setPaymentStatus(true); // Re-enable the button if there's an error fetching the order
        setIsPaid(true);
        return;
      }

      const { order } = await data.json();

      const options = {
        key: process.env.RAZORPAY_API_KEY,
        name: "Footloosemonkey",
        amount: razorpayCharge * 100, // Dynamic amount in paisa
        currency: "INR",
        description: "Payment for Registration",
        order_id: order.id,
        image: '/logo.png',
        handler: async function (response) {
          const verifyData = await fetch('/api/paymentverify', {
            method: "POST",
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!verifyData.ok) {
            console.error('Failed to verify payment:', verifyData.statusText);
            toast.error('Failed to verify payment. Please try again later.');
            await handlePaymentData(response.razorpay_payment_id, 'failed');
            setPaymentStatus(true);
            setIsPaid(true);
            return;
          }

          const res = await verifyData.json();
          if (res?.message === "success") {
            toast.success(
              `Payment successful! Your Token ID = ${response.razorpay_payment_id} has been processed.`,
              { autoClose: false }
            );

            // Copy the Payment ID to clipboard
            await navigator.clipboard.writeText(response.razorpay_payment_id);

            setTimeout(() => {
              toast.info(`Your Token ID has been copied to your clipboard. Please keep it safe!`, { autoClose: false });
            }, 500);

            setTimeout(() => {
              router.push('/verifyuser');
            }, 1000);

            await handlePaymentData(response.razorpay_payment_id, 'success');
            setPaymentStatus(true);
          } else {
            await handlePaymentData(response.razorpay_payment_id, 'failed');
            setPaymentStatus(true);
          }
        },
        theme: {
          color: "#004873",
        },
        prefill: {
          name: userName || '',
          email: userEmail || '',
          contact: userContact || '',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      toast.error('Failed to initiate payment. Please try again later.');
      setPaymentStatus(true);
      setIsPaid(true);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPaid == true) {
      setPaymentStatus(false);
      toast.info('You have already completed the payment.');
      setTimeout(() => {
        router.push('/verifyuser');
      }, 1000);
      setPaymentStatus(true);
      return;
    }

    setPaymentStatus(false);
    setIsPaid(false);
    initiatePayment();
  };

  return (
    <div className="bg-[#e5e7eb] w-[100%] min-h-[55vh] flex justify-center items-center">
      <div className="max-w-[100rem] bg-white w-[95%] h-[80%] md:py-10 md:px-[5%] py-5 sm:px-5 px-3 grid lg:grid-cols-3 grid-cols-1 md:gap-10 relative">
        {/* Cart Items */}
        <div className="cart-items col-span-2">
          <div className="cart-header flex justify-between items-center mb-2">
            <h1 className="md:text-2xl sm:text-xl text-base font-medium pb-0">Payment Checkout</h1>
            <button onClick={() => router.push('/register')} className="px-6 py-2 bg-[#004873] text-white font-semibold rounded hover:bg-[#0076ff] transition duration-300">
              Go back
            </button>
          </div>
          {/* Cart Table */}
          <div className="relative w-full">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="border-b text-gray-600 uppercase">
                  <th className="h-12 px-1.5 text-left font-medium">Checkout Info</th>
                </tr>
              </thead>
              <tbody>
                {registerData.map((data, index) => (
                  <tr key={index} className="border-b py-1 px-10 hover:bg-muted/50">
                    <td className="p-1.5">
                      <div className="flex flex-col md:flex-row items-start">
                        <div className="img-qty flex flex-col w-[5vw] h-[5vh] mr-3">
                          <Image
                            src="/logo.png"
                            width="50"
                            height="100"
                            className="md:w-28 w-20 md:h-24 h-20 mx-auto mb-1.5"
                            alt="logo"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-base">
                          <p className="font-semibold uppercase">{data.talent} COMPETITION FOR AGE {data.ageCriteria}</p>
                          <div className='flex gap-1'>
                            <p className="text-gray-500 font-medium uppercase text-sm">{data.participantName} |</p>
                            <p className="text-gray-500 font-medium uppercase text-sm">{data.guardianNumber} |</p>
                            <p className="text-gray-500 font-medium text-sm">{data.email}</p>
                          </div>
                          <p className="md:text-sm text-xs">
                            <span className="text-red-600 font-medium mr-2">₹ {data.charge}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checkout Section */}
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="col-span-1">
            <div className="checkout-container">
              <div className="mt-4 p-4 border border-gray-200 rounded md:sticky top-32 h-fit">
                <div className="flex justify-between mb-2">
                  <p className="font-medium sm:text-base text-sm">Subtotal:</p>
                  <p className="text-sm">₹ {charge}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium sm:text-base text-sm">Discount:</p>
                  <p className="text-sm">₹ 0</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium sm:text-base text-sm">IGST:</p>
                  <p className="text-sm">₹ {igstAmount}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium sm:text-base text-sm">CGST:</p>
                  <p className="text-sm">₹ {cgstAmount}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium sm:text-base text-sm">Total Including GST:</p>
                  <p className="text-sm">₹ {totalIncludingGST}</p>
                </div>
                <button
                  type='submit'
                  className={`w-full py-2 bg-[#004873] flex justify-center items-center text-white font-semibold rounded ${paymentStatus ? 'hover:bg-[#0076ff]' : 'opacity-50 cursor-not-allowed'
                    } transition duration-300`}
                  disabled={!paymentStatus}
                >
                  {!paymentStatus ? ( // Show spinner while submitting
                    <Loader className="animate-spin" size={20} />
                  ) : (
                    "Pay"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCheckout;
