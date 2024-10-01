"use client"

import Image from 'next/image';
import React, { useState, useRef } from 'react';

const PaymentCheckout = () => {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [values, setValues] = useState({
    email: "",
    participantName: "",
    ageCriteria: "",
    participantAge: "",
    guardianNumber: "",
    address: "",
    talent: "",
    termsAccepted: {
      videoSharing: false,
      offensiveContent: false,
      incidents: false,
    },
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const fees = 95; // Define dynamic fees here

  // Google Sheet Integration
  const handleSubmitGoogleForm = async () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxUfsJR5oWPQtvpchqO3JHz25brnjSOYrQCkpSD0g0GBVmEb0Ng_Z8BDuWw1sNRloSv/exec';
    const formData = new FormData(formRef.current);

    formData.append('videoSharing', values.termsAccepted.videoSharing ? 'Yes' : 'No');
    formData.append('offensiveContent', values.termsAccepted.offensiveContent ? 'Yes' : 'No');
    formData.append('incidents', values.termsAccepted.incidents ? 'Yes' : 'No');

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        if (!response.ok) throw new Error('Failed to submit to Google Sheets');
        formRef.current.reset(); // Reset form after submission
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Form Submission Failed");
      });
  };

  // Razorpay Payment Gateway Integration
  const makePayment = async () => {
    setPaymentStatus(false);

    // Make API call to the server for Razorpay order
    const data = await fetch('/api/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: fees * 100 }), // Send fees in paisa
    });

    if (!data.ok) {
      console.error('Failed to fetch Razorpay order:', data.statusText);
      return;
    }

    const { order } = await data.json();

    const options = {
      key: "rzp_test_Cl7u3umPOApZLL",
      name: "Foot Loose Monkey",
      amount: fees * 100, // Dynamic amount in paisa
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
          await handleSubmitGoogleForm(); // Submit to Google Sheets after successful payment
          alert(`Payment successful! Your payment ID = ${response.razorpay_payment_id} has been processed.`);

          // Reset form after successful payment
          setValues({
            email: "",
            participantName: "",
            ageCriteria: "",
            participantAge: "",
            guardianNumber: "",
            address: "",
            talent: "",
            termsAccepted: {
              videoSharing: false,
              offensiveContent: false,
              incidents: false,
            },
          });
          setErrors({});
        }
      },
      prefill: {
        email: values.email,
        name: values.participantName,
        contact: values.guardianNumber,
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
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fill in all required fields before submitting.");
      return;
    }

    makePayment(); // Initiate payment and form submission
  };

  return (
    <div className="max-w-[100rem] mx-auto md:py-10 md:px-[5%] py-5 sm:px-5 px-3 grid lg:grid-cols-3 grid-cols-1 md:gap-10 relative">
      {/* Cart Items */}
      <div className="cart-items col-span-2">
        <div className="cart-header flex justify-between items-center mb-2">
          <h1 className="md:text-2xl sm:text-xl text-base font-medium pb-0">Payment Checkout</h1>
          <button className="inline-flex items-center justify-center text-sm font-medium text-white bg-[#4E1B61] md:text-sm md:px-5 px-3 md:py-2.5 py-2 rounded">
            Go back
          </button>
        </div>

        {/* Cart Table */}
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="border-b text-gray-600 uppercase">
                <th className="h-12 px-1.5 text-left font-medium">Competition Info</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b py-1 px-10 hover:bg-muted/50">
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
                      <a className="font-semibold" href="/product/msi-gf63-thin-laptop/undefined">MSI GF 63 thin laptop</a>
                      <p className="text-gray-500 font-medium uppercase text-sm mt-2 mb-1">Prachi Infotech</p>
                      <p className="md:text-sm text-xs">
                        <span className="text-red-600 font-medium mr-2">₹ 95</span>
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
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
                <p className="text-sm">₹ 95</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium sm:text-base text-sm">Discount:</p>
                <p className="text-sm">₹ 0</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium sm:text-base text-sm">IGST:</p>
                <p className="text-sm">₹ 0</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium sm:text-base text-sm">CGST:</p>
                <p className="text-sm">₹ 0</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium sm:text-base text-sm">Total Including GST:</p>
                <p className="text-sm">₹ 95</p>
              </div>
              <button type='submit' className="inline-flex items-center justify-center text-sm font-medium text-white bg-[#4E1B61] px-8 py-2.5 my-1 w-full rounded">
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
