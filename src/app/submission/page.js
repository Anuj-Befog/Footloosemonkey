"use client";

import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

const UploadForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState(null);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        if (emailParam) setEmail(emailParam);
    }, []);

    console.log("Email", email);

    // Participant data
    const [formData, setFormData] = useState({
        participantId: '',
        participantName: '',
        participantEmail: '',
        participantAge: '',
        participantAgeCriteria: '',
        participantTalent: '',
        postTitle: '',
        description: '',
        originalSize: '',
        partcipantAddress: '',
        participantNumber: '',
        participantCharge: '',
        participantPaymentID: '',
        participantPaymentStatus: ''
    });

    // Fetch data based on email
    useEffect(() => {
        const fetchData = async () => {
            if (!email) return;

            setLoading(true);
            setError('');

            try {
                // Check if the user already has an existing submission
                const checkResponse = await axios.get(`/api/checksubmission?email=${encodeURIComponent(email)}`);

                if (checkResponse.data.success) {
                    setTimeout(() => {
                        toast.error("You have already uploaded a video. Multiple uploads are not allowed.");
                    }, 1000);
                    setEmail(''); // Clear email field
                    setError("You have already uploaded a video. Multiple uploads are not allowed.");
                    return; // Stop further execution if the user has already uploaded
                }

                // Fetch payment data by email if no submission exists
                const response = await axios.get(`/api/payment/getDataByEmail?email=${encodeURIComponent(email)}`);
                { response.data.success && setError("") }

                if (response.data.success && response.data.data.length > 0) {
                    const participantData = response.data.data[0];
                    const {
                        participantName,
                        participantAge,
                        ageCriteria: participantAgeCriteria,
                        talent: participantTalent,
                        guardianNumber: participantNumber,
                        address: partcipantAddress,
                        charge: participantCharge,
                        paymentId: participantPaymentID,
                        status: participantPaymentStatus
                    } = participantData;

                    setFormData(prev => ({
                        ...prev,
                        participantId: email.split('@')[0], // Generate participantId from email
                        participantName,
                        participantEmail: email,
                        participantAge,
                        participantAgeCriteria,
                        participantTalent,
                        participantNumber,
                        partcipantAddress,
                        participantCharge,
                        participantPaymentID,
                        participantPaymentStatus,
                    }));
                } else {
                    setError('No user found for this email.');
                    toast.info('No user found for this email.');
                }
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
                setError('Error fetching data. Please try again.');
                toast.error('Error fetching data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handler = setTimeout(() => {
            fetchData();
        }, 500); // Debounce for 500 ms

        return () => {
            clearTimeout(handler);
        };
    }, [email]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'file') {
            setVideoFile(files[0]);
        } else if (name === 'profilepic') {
            setProfilePicFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //max file size of 100 mb
        const MAX_FILE_SIZE = 100 * 1024 * 1024

        if (videoFile.size > MAX_FILE_SIZE) {
            setError('File size exceeds 100 MB. Please upload a smaller file.');
            toast.error('File size exceeds 100 MB. Please upload a smaller file.');
            return;
        }

        const data = new FormData();

        // Append form data
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        // Append files
        data.append('file', videoFile);
        data.append('profilepic', profilePicFile);

        try {
            setLoading(true);
            await axios.post('/api/submission', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Reset form after successful upload
            setFormData({
                participantId: '',
                participantName: '',
                participantEmail: '',
                participantAge: '',
                participantAgeCriteria: '',
                participantTalent: '',
                postTitle: '',
                description: '',
                originalSize: '',
                partcipantAddress: '',
                participantNumber: '',
                participantCharge: '',
                participantPaymentID: '',
                participantPaymentStatus: ''
            });
            setEmail('');  // Reset email field
            setVideoFile(null);  // Clear video file
            setProfilePicFile(null);  // Clear profile picture file
            toast.success('Upload successful!');
            router.push('/spotlight')
        } catch (error) {
            console.error('Upload failed:', error.response?.data || error.message);
            setError('Upload failed. Please try again.');
            toast.error('Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] py-10 bg-[aliceblue]">
            <h1 className="text-3xl font-bold mb-4">Upload Form</h1>
            <form onSubmit={handleSubmit} className="w-[85vw] md:w-[30vw] bg-white p-6 rounded shadow-md" encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="postTitle"
                        value={formData.postTitle}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Profile Picture:
                    </label>
                    <input
                        type="file"
                        name="profilepic"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Video File:
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full flex justify-center items-center bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading || error} // Disable button while loading and if there is an error
                >
                    {loading ? (
                        <Loader className="animate-spin" size={20} />
                    ) : (
                        "Upload"
                    )}
                </button>
            </form>
        </div>
    );
};

export default UploadForm;
