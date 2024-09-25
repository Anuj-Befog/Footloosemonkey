"use client";
import React, { useEffect, useState } from "react";
import { IoMdLocate } from "react-icons/io";

const PORT = 'http://localhost:3030'


// Validation function
const validate = (values) => {

  const errors = {};
  if (!values.email) errors.email = "Email is required";
  if (!values.participantName) errors.participantName = "Participant's Name is required";
  if (!values.ageCriteria) errors.ageCriteria = "Age Criteria is required";
  if (!values.participantAge) errors.participantAge = "Participant's Age is required";
  if (!values.guardianNumber) errors.guardianNumber = "Parent's/Guardian's Number is required";
  if (!values.address) errors.address = "Address is required";
  if (!values.talent) errors.talent = "Participant's Talent is required";

  if (!values.termsAccepted.videoSharing) {
    errors.termsAccepted = errors.termsAccepted || {};
    errors.termsAccepted.videoSharing = "You must accept the video sharing terms";
  }

  if (!values.termsAccepted.offensiveContent) {
    errors.termsAccepted = errors.termsAccepted || {};
    errors.termsAccepted.offensiveContent = "You must accept the terms regarding offensive content";
  }

  if (!values.termsAccepted.incidents) {
    errors.termsAccepted = errors.termsAccepted || {};
    errors.termsAccepted.incidents = "You must accept the terms regarding incidents";
  }

  return errors;
};

const RegisterForm = () => {
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

  // States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const nameMapping = {
      "Email": "email",
      "Participant Name": "participantName",
      "Age Criteria": "ageCriteria",
      "Participant Age": "participantAge",
      "Guardian Number": "guardianNumber",
      "Address": "address",
      "Talent": "talent",
      "Video Sharing": "videoSharing",
      "Offensive Content": "offensiveContent",
      "Incidents": "incidents",
    };

    const mappedName = nameMapping[name];

    if (type === "checkbox") {
      setValues((prevValues) => ({
        ...prevValues,
        termsAccepted: {
          ...prevValues.termsAccepted,
          [mappedName]: checked,
        },
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [mappedName]: value,
      }));
    }
  };


  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            if (response.ok) {
              const address = data.display_name;
              setValues((prevValues) => ({
                ...prevValues,
                address: address,
              }));
            } else {
              alert("Failed to retrieve address.");
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            alert("Unable to retrieve address. Please try again.");
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Google Sheet Integration
  const handleSubmitGoogleForm = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fill in all required fields before submitting.");
      return; // Exit the function if there are validation errors
    }

    setIsSubmitting(true); // Set isSubmitting to true to disable the button

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxUfsJR5oWPQtvpchqO3JHz25brnjSOYrQCkpSD0g0GBVmEb0Ng_Z8BDuWw1sNRloSv/exec';
    const form = document.forms['submit-to-google-sheet'];

    const formData = new FormData(form);
    formData.append('videoSharing', values.termsAccepted.videoSharing ? 'Yes' : 'No');
    formData.append('offensiveContent', values.termsAccepted.offensiveContent ? 'Yes' : 'No');
    formData.append('incidents', values.termsAccepted.incidents ? 'Yes' : 'No');

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        if (!response.ok) throw new Error('Failed to submit to Google Sheets');
        form.reset();
        alert("Form Submitted Successfully");
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Form Submitted Failed");
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the button regardless of success or failure
      });
  };

  // Razor Payment Gateway Integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation once
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      return; // Exit if validation fails
    }

    // Proceed with the main form submission logic if validation passes
    try {
      const response = await fetch(`${PORT}/api/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.orderId) {
        const options = {
          key: "rzp_test_jeDmc7YaouGYeK",
          amount: 49900,
          currency: "INR",
          name: "footloosemonkey.club",
          description: "Payment for Registration",
          order_id: data.orderId,
          handler: async function (response) {
            const paymentData = {
              ...values,
              paymentStatus: "Done",
            };

            const paymentResponse = await fetch(`${PORT}/api/payment-success`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentData),
            });

            if (paymentResponse.ok) {
              alert("Payment and form submission successful!");
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
              setServerError("");
            } else {
              setServerError("Failed to update Google Sheet after payment.");
            }
          },
          prefill: {
            email: values.email,
            name: values.participantName,
            contact: values.guardianNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        setServerError(data.error || "Failed to create Razorpay order.");
      }
    } catch (error) {
      setServerError("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="bg-[#E5C3FF] p-6 space-y-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Registration Form</h1>
        <form name="submit-to-google-sheet" onSubmit={(e) => {
          handleSubmit(e);
          handleSubmitGoogleForm(e);
        }}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="Email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant&apos;s Name:
            </label>
            <input
              type="text"
              name="Participant Name"
              value={values.participantName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full p-2 border rounded ${errors.participantName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.participantName && (
              <p className="text-red-500 text-sm">{errors.participantName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Age Criteria:</label>
            <select
              name="Age Criteria"
              value={values.ageCriteria}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.ageCriteria ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Age Criteria</option>
              <option value="6-8">6-8 years</option>
              <option value="9-12">9-12 years</option>
            </select>
            {errors.ageCriteria && (
              <p className="text-red-500 text-sm">{errors.ageCriteria}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant&apos;s Age:
            </label>
            <input
              type="number"
              name="Participant Age"
              value={values.participantAge}
              onChange={handleChange}
              placeholder="Age of participant"
              className={`w-full p-2 border rounded ${errors.participantAge ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.participantAge && (
              <p className="text-red-500 text-sm">{errors.participantAge}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Parent&apos;s/Guardian&apos;s Number:
            </label>
            <input
              type="text"
              name="Guardian Number"
              value={values.guardianNumber}
              onChange={handleChange}
              placeholder="123-456-7890"
              className={`w-full p-2 border rounded ${errors.guardianNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.guardianNumber && (
              <p className="text-red-500 text-sm">{errors.guardianNumber}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Address:</label>
            <textarea
              name="Address"
              value={values.address}
              onChange={handleChange}
              placeholder="123 Main St, Apt 4B, City, State, ZIP"
              className={`w-full p-2 pr-10 border rounded ${errors.address ? "border-red-500" : "border-gray-300"
                }`}
            />
            <IoMdLocate
              data-tip="Point Current Location"
              className="absolute top-12 right-2 cursor-pointer text-2xl text-gray-500 hover:text-gray-700" // Adjust size and alignment here
              onClick={handleLocationClick}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant&apos;s Talent:
            </label>
            <select
              name="Talent"
              value={values.talent}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.talent ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Talent</option>
              <option value="acting">Acting</option>
              <option value="dancing">Dancing</option>
              <option value="mimicry">Mimicry</option>
              <option value="singing">Singing</option>
            </select>
            {errors.talent && <p className="text-red-500 text-sm">{errors.talent}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Terms and Conditions:</label>
            <label className="inline-flex items-center block mb-2">
              <input
                type="checkbox"
                name="Video Sharing"
                checked={values.termsAccepted.videoSharing}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting the video, I confirm that I, as a parent/legal guardian, have voluntarily chosen to do so and have no objection to sharing the video.
              </span>
            </label>
            {errors.termsAccepted?.videoSharing && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.videoSharing}</p>
            )}

            <label className="inline-flex items-center block mb-2">
              <input
                type="checkbox"
                name="Offensive Content"
                checked={values.termsAccepted.offensiveContent}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting, I confirm as a parent/guardian that no offensive language or content is being used. Disqualification is at the company&apos;s discretion if found. Registration fees plus GST are non-refundable upon disqualification.
              </span>
            </label>
            {errors.termsAccepted?.offensiveContent && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.offensiveContent}</p>
            )}

            <label className="inline-flex items-center block mb-4">
              <input
                type="checkbox"
                name="Incidents"
                checked={values.termsAccepted.incidents}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting, I acknowledge that the company is not responsible for any incidents that may occur during the shooting and video-making process.
              </span>
            </label>
            {errors.termsAccepted?.incidents && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.incidents}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting} // Disable if submitting or there are errors
            className={`w-full py-2 bg-purple-700 text-white font-semibold rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#003470]'} transition duration-300`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
