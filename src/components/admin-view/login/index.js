"use client"

import FormControls from "../forms-control";

const controls = [
    {
        name: 'username',
        placeholder: 'Enter your username',
        type: 'text',
        label: 'Username'
    },
    {
        name: 'password',
        placeholder: 'Enter your password',
        type: 'text',
        label: 'Password'
    },
];

export default function Login({ formData, setFormData, handleLogin }) {
    return (
        <div className="flex justify-center items-center min-h-[85vh] bg-gray-100 ">
            <div className="w-[85vw] md:max-w-md bg-white shadow-lg rounded-[4px] p-8">
                <h1 className="text-3xl text-blue-500 font-bold text-center mb-4">Footloose Admin Login</h1>

                <FormControls controls={controls} formData={formData} setFormData={setFormData} />

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLogin}
                        className="bg-sky-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-sky-600 transition duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}