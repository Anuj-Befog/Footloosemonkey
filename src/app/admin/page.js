// app/admin/page.js
'use client'; // Required when using useRouter in the App Router

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { addData, getData } from '../services/index';

export default function AdminPage() {
    const [selectedValue, setSelectedValue] = useState('');
    const [dataId, setDataId] = useState(null); // Store fetched _id

    // Load data from getData()
    useEffect(() => {
        // Fetch data and set _id
        const fetchData = async () => {
            const response = await getData();
            console.log("Response: ", response.data[0]._id);

            if (response.success && response.data) {
                setDataId(response.data[0]._id); // Assuming the response contains data with _id
            } else {
                console.error('Error fetching data:', response.message);
            }
        };

        fetchData();
    }, []);

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
    };

    const handleSubmit = async () => {
        if (!dataId) {
            console.log('Data ID not found. Cannot submit form.');
            return;
        }

        // Options array to pass
        const options = ['Acting', 'Dancing', 'Mimicry', 'Singing']; // This should match your available options

        // Prepare form data to be sent to the server
        const formData = {
            _id: dataId,  // Pass the fetched _id
            selectedValue,
            options,
        };

        // Call the addData function to post the data
        const response = await addData(formData);

        // Check the response and navigate or display a message accordingly
        if (response.success) {
            alert("Form Saved");
        } else {
            // Handle the error accordingly (e.g., show an error message)
            alert(`Error: ${response.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome to the Admin Panel</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <select
                    value={selectedValue}
                    onChange={handleDropdownChange}
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    <option value="Acting">Acting</option>
                    <option value="Dancing">Dancing</option>
                    <option value="Mimicry">Mimicry</option>
                    <option value="Singing">Singing</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
