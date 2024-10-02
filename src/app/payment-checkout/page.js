"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import React, { useState, useRef, useEffect } from 'react';
import { getRegistrationData } from '../services/index';  // Import necessary services


const PaymentCheckout = () => {
  const router = useRouter()

  const formRef = useRef(null);

  const [paymentStatus, setPaymentStatus] = useState(true);
  const [charge, setCharge] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userContact, setUserContact] = useState('')
  const [registerData, setRegisterData] = useState([])

  // Load data from getRegistrationData()
  useEffect(() => {
    const fetchRegistrationData = async () => {
      const response = await getRegistrationData();
      if (response.success && response.data) {
        setRegisterData([...response.data]); // Spread the data into a new array
        setCharge(response.data[0].charge)
        setUserEmail(response.data[0].email)
        setUserName(response.data[0].participantName)
        setUserContact(response.data[0].guardianNumber)
      } else {
        console.error('Error fetching data:', response.message);
      }
    };

    fetchRegistrationData();
  }, []); // Empty dependency array ensures this runs only on initial render

  useEffect(() => {
  }, [registerData, charge, userEmail, userName, userContact]);

  // Calculate IGST and CGST
  let igstRate = 9, cgstRate = 9;

  const igstAmount = (charge * igstRate) / 100;
  const cgstAmount = (charge * cgstRate) / 100;

  // Calculate total amount including GST
  const totalAmount = Number(charge) + (Number(charge) * igstRate) / 100 + (Number(charge) * cgstRate) / 100;

  // Format total amount to two decimal places
  const totalIncludingGST = Number(totalAmount.toFixed(2));

  const razorpayCharge = Math.floor(totalIncludingGST)

  // Razorpay Payment Gateway Integration
  const makePayment = async () => {
    setPaymentStatus(false);

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
      return;
    }

    const { order } = await data.json();

    const options = {
      key: "rzp_test_Cl7u3umPOApZLL",
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
          return;
        }

        const res = await verifyData.json();
        if (res?.message === "success") {
          setPaymentStatus(true);
          alert(`Payment successful! Your payment ID = ${response.razorpay_payment_id} has been processed.`);
        }
      },
      prefill: {
        email: userEmail || '',
        name: userName || '',
        contact: userContact || '',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help.");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus(false);
    setTimeout(() => {
      makePayment();
      setPaymentStatus(true);
    }, 500);
  };

  return (
    <div className="max-w-[100rem] mx-auto md:py-10 md:px-[5%] py-5 sm:px-5 px-3 grid lg:grid-cols-3 grid-cols-1 md:gap-10 relative">

      {/* Cart Items */}
      <div className="cart-items col-span-2">
        <div className="cart-header flex justify-between items-center mb-2">
          <h1 className="md:text-2xl sm:text-xl text-base font-medium pb-0">Payment Checkout</h1>
          <button onClick={() => router.push('/register')} className="px-6 py-2 bg-[#003470] text-white font-semibold rounded hover:bg-[#5385ac] transition duration-300">
            Go back
          </button>
        </div>

        {/* Cart Table */}
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="border-b text-gray-600 uppercase">
                <th className="h-12 px-1.5 text-left font-medium">Chekout Info</th>
              </tr>
            </thead>
            <tbody>
              {
                registerData.map((registerData, index) => {
                  return (
                    <tr key={index} className="border-b py-1 px-10 hover:bg-muted/50">
                      <td className="p-1.5 w-96">
                        <div className="flex items-start">
                          <div className="img-qty flex flex-col w-[5vw] h-[5vh] mr-3">
                            <Image
                              alt="MSI GF 63 thin laptop"
                              loading="lazy"
                              width="50"
                              height="100"
                              className="md:w-28 w-20 md:h-24 h-20 mx-auto mb-1.5"
                              src="/logo.png"
                              style={{ color: 'transparent' }}
                            />
                          </div>

                          <div className="text-base">
                            <p className="font-semibold uppercase">{registerData.talent} COMPETITION FOR AGE {registerData.ageCriteria}</p>
                            <div className='flex gap-1'>
                              <p className="text-gray-500 font-medium uppercase text-sm mt-2 mb-1">{registerData.participantName} |</p>
                              <p className="text-gray-500 font-medium uppercase text-sm mt-2 mb-1">{registerData.guardianNumber} |</p>
                              <p className="text-gray-500 font-medium text-sm mt-2 mb-1">{registerData.email}</p>
                            </div>
                            <p className="md:text-sm text-xs">
                              <span className="text-red-600 font-medium mr-2">₹ {registerData.charge}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
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
                className={`w-full py-2 bg-purple-700 text-white font-semibold rounded ${paymentStatus ? 'hover:bg-[#003470]' : 'opacity-50 cursor-not-allowed'
                  } transition duration-300`}
                disabled={!paymentStatus}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentCheckout;
