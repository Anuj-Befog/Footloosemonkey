import React from 'react';

export default function Collaboration({ competition }) {
    return (
        <section className="collaboration-section bg-[aliceblue] pt-8 pb-1">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold text-blue-500 mb-4">Collaboration with Red Hill School Aliganj, Lucknow</h2>
                <p className="text-lg text-gray-700 mb-8">
                    We are excited to collaboration with <strong className='text-red-500 uppercase'>Red Hill School Aliganj, Lucknow</strong> to showcase <strong>{competition}</strong> talent and creativity on a global platform.
                </p>
            </div>
        </section>
    );
};