import Image from 'next/image';
import Link from 'next/link';

const DiwaliOffer = () => {
    return (
        <div className='w-100 pt-12 pb-6 px-8 bg-[aliceblue] flex flex-col justify-center items-center'>
            <h2 className="text-5xl text-center font-bold mb-8 text-sky-700">Special Offer</h2>
            <div className="bg-yellow-100 p-8 shadow-xl rounded-lg text-center container md:w-1/3">
                <Image src="/home/diwali-offer.png" alt="Diwali Offer" width={300} height={200} className="mx-auto mt-3 rounded-lg mb-6" />
                <h3 className="text-3xl font-semibold text-yellow-600 mt-7 mb-4">Diwali Offer</h3>
                <p className="text-4xl font-bold text-green-700 mb-2">FREE</p>
                <p className="text-lg text-gray-500 mb-6">For All Age Categories</p>
                <p className="text-md text-gray-600">
                    Celebrate Diwali with us! Join the competition for free and showcase your talent—limited time only!
                </p>
                <Link href="/register">
                    <button className="mt-8 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition">Register Now</button>
                </Link>
            </div>
        </div>
    );
};

export default DiwaliOffer;
