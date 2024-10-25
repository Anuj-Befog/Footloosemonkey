"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdLocate } from "react-icons/io";
import { getAdminData, getRegistrationData, addRegistrationData } from '../services/index';  // Import necessary services
import { cookies } from "next/headers";

const PORT = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3030'


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
  // States for form values, errors, submission status, etc.
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

  const router = useRouter();

  // States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [options, setOptions] = useState([]);  // Options for dropdown
  const [groupCharge, setGroupCharge] = useState([])
  const [charges, setCharges] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 }); // Default age range
  const [dataId, setDataId] = useState(null);  // For fetching existing registration data

  // Fetch talents data from Admin
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setOptions(response.data);
      }
    };
    fetchData();
  }, []);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Map names to state
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
      // Check for age input and ensure it's within the specified range
      if (mappedName === "participantAge" && (value < ageRange.min || value > ageRange.max)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          participantAge: `Participant's age must be between ${ageRange.min} and ${ageRange.max} years.`,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, participantAge: "" })); // Clear the age error if valid
      }

      setValues((prevValues) => ({
        ...prevValues,
        [mappedName]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setOptions(response.data);
        setGroupCharge(response.data)
      }
    };
    fetchAdminData();
  }, []);

  // Use a separate useEffect to log the fees when it changes
  useEffect(() => {
  }, [charges]);

  // Handle age criteria change and set charges + min/max age range
  const handleAgeCriteriaChange = (e) => {
    const ageCriteria = e.target.value;
    setValues((prevValues) => ({ ...prevValues, ageCriteria }));

    let charge, minAge, maxAge;

    switch (ageCriteria) {
      case "3-5":
        charge = groupCharge[0]?.groupACharge;
        minAge = 3;
        maxAge = 5;
        break;
      case "6-8":
        charge = groupCharge[0]?.groupBCharge;
        minAge = 6;
        maxAge = 8;
        break;
      case "9-12":
        charge = groupCharge[0]?.groupCCharge;
        minAge = 9;
        maxAge = 12;
        break;
      default:
        charge = '';
        minAge = 0;
        maxAge = 12;
    }

    setCharges(charge);
    setAgeRange({ min: minAge, max: maxAge });
  };

  // Dropdown Change for Talent
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setDropdownValue(value);
    setValues((prevValues) => ({
      ...prevValues,
      talent: value, // Update the talent in values state
    }));
  };

  const [dropdownValue, setDropdownValue] = useState('');

  const [isLocating, setIsLocating] = useState(false);

  // Update the function:
  const handleLocationClick = async () => {
    setIsLocating(true); // Start loading

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
          setIsLocating(false); // End loading
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location. Please try again.");
          setIsLocating(false); // End loading
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false); // End loading
    }
  };

  // Define all possible categories
  const allCategories = ["Acting", "Dancing", "Mimicry", "Singing"]; // Add any other categories here

  // Load the dropdown value from getAdminData API
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        const fetchedCategories = response.data.map(item => item.talent); // Assuming talent field in response
        setOptions(fetchedCategories);
      } else {
        console.error('Error fetching data:', response.message);
      }
    };

    fetchData();
  }, []);

  // Submit Data in MongoDB -->

  // Load data from getRegistrationData()
  useEffect(() => {
    const fetchRegistrationData = async () => {
      const response = await getRegistrationData();
      if (response.success && response.data) {
        setDataId(response.data[0]._id); // Assuming the response contains data with _id
      } else {
        console.error('Error fetching data:', response.message);
      }
    };

    fetchRegistrationData();
  }, []);

  // Google Sheet Integration
  const handleSubmitGoogleForm = async () => {
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
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Form Submitted Failed");
      });
  };

  // Registration logic here
  const registrationSuccess = true; // Update based on your registration logic

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // If there are validation errors, prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Continue with submission if no validation errors
    setIsSubmitting(true);

    // Fetch existing registration data
    const registrationResponse = await getRegistrationData();
    if (registrationResponse.success && registrationResponse.data.length > 0) {
      setDataId(registrationResponse.data[0]._id);
    }

    // Submit form data
    const response = await addRegistrationData({
      _id: dataId,
      charges,
      ...values,
    });

    if (response.success) {
      await handleSubmitGoogleForm()

      if (registrationSuccess) {
        cookies().set({
          name: 'isRegistered',
          value: 'true',
          path: '/',
          maxAge: 60 * 60 * 24, // 1 day
        });
      }
      router.push("/payment-checkout");
    } else {
      setServerError(response.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#c3dbff] p-6 space-y-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Registration Form</h1>
        <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
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
              className={`w-full p-2 border rounded ${errors.participantName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.participantName && (
              <p className="text-red-500 text-sm">{errors.participantName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant&apos;s Talent:
            </label>
            <select
              name="Talent"
              value={dropdownValue}
              onChange={handleDropdownChange}
              className={`w-full p-2 border rounded ${errors.talent ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Talent</option>
              {allCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                  disabled={!options.includes(category)} // Disable if not in fetched options
                >
                  {category}
                </option>
              ))}
            </select>
            {errors.talent && <p className="text-red-500 text-sm">{errors.talent}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Age Criteria:</label>
            <select
              name="Age Criteria"
              value={values.ageCriteria}
              onChange={handleAgeCriteriaChange}
              className={`w-full p-2 border rounded ${errors.ageCriteria ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Age Criteria</option>
              <option value="3-5">3-5 years (Group A)</option>
              <option value="6-8">6-8 years (Group B)</option>
              <option value="9-12">9-12 years (Group C)</option>
            </select>

            {errors.ageCriteria && (
              <p className="text-red-500 text-sm">{errors.ageCriteria}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Participant&apos;s Age:</label>
            <input
              type="number"
              name="Participant Age"
              value={values.participantAge}
              onChange={handleChange}
              min={ageRange.min}
              max={ageRange.max}
              className={`w-full p-2 border rounded ${errors.participantAge ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.participantAge && <p className="text-red-500 text-sm">{errors.participantAge}</p>}
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
            className={`w-full py-2 bg-[#004873] text-white font-semibold rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0076ff]'} transition duration-300`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
