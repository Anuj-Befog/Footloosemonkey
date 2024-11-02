"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { getRegistrationData, addPaymentData } from '../services/index';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentCheckout = () => {
  const router = useRouter();
  const formRef = useRef(null);

  const [paymentStatus, setPaymentStatus] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [charge, setCharge] = useState('');
  const [userTalent, setUserTalent] = useState('');
  const [userAgeCriteria, setUserAgeCriteria] = useState('');
  const [userParticipantAge, setUserParticipantAge] = useState('');
  const [registerData, setRegisterData] = useState([]);

  // Load data from getRegistrationData()
  useEffect(() => {
    const fetchRegistrationData = async () => {
      const response = await getRegistrationData();
      if (response.success && response.data) {
        setRegisterData([...response.data]);
        setUserEmail(response.data[0].email);
        setUserName(response.data[0].participantName);
        setUserContact(response.data[0].guardianNumber);
        setUserAddress(response.data[0].address)
        setCharge(response.data[0].charge);
        setUserTalent(response.data[0].talent)
        setUserAgeCriteria(response.data[0].ageCriteria)
        setUserParticipantAge(response.data[0].participantAge)
      } else {
        console.error('Error fetching data:', response.message);
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
      paymentId: paymentId,
      status: status,
    };

    const response = await addPaymentData(paymentData);
    if (response.success) {

    } else {
      console.error("Error adding payment data:", response.message);
    }
  };

  // Razorpay Payment Gateway Integration
  const initiatePayment = async () => {
    setPaymentStatus(false); // Disable the button immediately when starting payment

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
      setPaymentStatus(true); // Re-enable the button if there's an error fetching the order
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
      image: '/logo.png', // Correct your image path here
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
          await handlePaymentData(response.razorpay_payment_id, 'failed');
          setPaymentStatus(true); // Re-enable the button on failure
          return;
        }

        const res = await verifyData.json();
        if (res?.message === "success") {
          toast.success(`Payment successful! Your payment ID = ${response.razorpay_payment_id} has been processed.`);
          await handlePaymentData(response.razorpay_payment_id, 'success');
          setPaymentStatus(true); // Re-enable the button after success
        } else {
          await handlePaymentData(response.razorpay_payment_id, 'failed');
          setPaymentStatus(true); // Re-enable the button on failure
        }
      },
      theme: {
        color: "#004873",
      },
      prefill: {
        name: userName || '', // User's name from state
        email: userEmail || '', // User's email from state
        contact: userContact || '', // User's contact number from state
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus(false);
    initiatePayment(); // Call to initiate payment
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
                            alt="MSI GF 63 thin laptop"
                            loading="lazy"
                            width="50"
                            height="100"
                            className="md:w-28 w-20 md:h-24 h-20 mx-auto mb-1.5"
                            src="/logo.png"
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
        <form ref={formRef} name="submit-to-google-sheet" onSubmit={handleSubmit}>
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
