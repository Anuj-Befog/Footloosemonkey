"use client"

import React, { useState, useEffect } from 'react';
import { getAdminData } from '../../app/services/index';  // Import necessary services

const Alert = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Function to handle closing the alert
    const closeAlert = () => {
        setIsVisible(false);
    };

    const [datas, setDatas] = useState([])

    useEffect(() => {
        const fetchAdminData = async () => {
            const response = await getAdminData();
            if (response.success && response.data) {
                setDatas(response.data);
            }
        };
        fetchAdminData();
    }, []);

    console.log(datas)

    return (
        <>

            {isVisible && (
                <div className="w-[100vw] flex justify-around items-center bg-[#6e96cf] p-4 px-8">
                    <div className="xl:flex xl:flex-row xl:items-center py-2 xl:space-x-2 mx-auto text-center">
                        {
                            datas.map((item, index) => {
                                return (
                                    <div key={index} className="leading-6 lg:text-lg text-[#fff] font-rubik">
                                        <p className='text-xl'>Get ready for the <strong>{item.talent}</strong> Competition at <strong>Footloosemonkey</strong>! Registrations are now <em>live</em>. 🥳🎉</p>
                                    </div>

                                )
                            })
                        }
                        <button
                            aria-label="close"
                            onClick={closeAlert}
                            className="rotate-45 text-4xl text-[#fff] relative left-[5rem]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Alert;
