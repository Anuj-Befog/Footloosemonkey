'use client'; // Required when using useRouter in the App Router

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { addData, getData } from '../services/index';

export default function AdminPage() {
    const [selectedTalent, setSelectedTalent] = useState('');
    const [selectedFees, setSelectedFees] = useState('');
    const [dataId, setDataId] = useState(null); // Store fetched _id

    // Fees list based on talent
    const feesList = {
        Acting: [299, 399, 599], // Example fees for Acting
        Dancing: [299, 399, 599], // Example fees for Dancing
        Mimicry: [299, 399, 599], // Example fees for Mimicry
        Singing: [299, 399, 599], // Example fees for Singing
    };

    // Load data from getData()
    useEffect(() => {
        // Fetch data and set _id
        const fetchData = async () => {
            const response = await getData();
            if (response.success && response.data) {
                setDataId(response.data[0]._id); // Assuming the response contains data with _id
            } else {
                console.error('Error fetching data:', response.message);
            }
        };

        fetchData();
    }, []);

    const handleTalentChange = (e) => {
        const value = e.target.value;
        setSelectedTalent(value);
        setSelectedFees(''); // Reset selected fees when talent changes
    };

    const handleFeesChange = (e) => {
        setSelectedFees(e.target.value);
    };

    const handleSubmit = async () => {
        if (!dataId) {
            console.log('Data ID not found. Cannot submit form.');
        }

        // Prepare form data to be sent to the server
        const formData = {
            _id: dataId,  // Pass the fetched _id
            selectedTalent,
            selectedFees,
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
                {/* Dropdown for Talent Categories */}
                <select
                    value={selectedTalent}
                    onChange={handleTalentChange}
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    <option value="Acting">Acting</option>
                    <option value="Dancing">Dancing</option>
                    <option value="Mimicry">Mimicry</option>
                    <option value="Singing">Singing</option>
                </select>

                {/* Dropdown for Fees based on selected Talent */}
                {selectedTalent && (
                    <select
                        value={selectedFees}
                        onChange={handleFeesChange}
                        className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a fees</option>
                        {feesList[selectedTalent].map((fees, idx) => (
                            <option key={idx} value={fees}>₹ {fees}</option>
                        ))}
                    </select>
                )}

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
