import Image from 'next/image';
import Link from 'next/link';

const Pricing = () => {
  return (
    <div className="bg-[aliceblue] p-16">
      <h2 className="text-5xl text-center font-bold mb-12 text-sky-700">Our Pricing</h2>
      
      <div className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-10">
        
        {/* Plan for 6-8 years */}
        <div className="bg-white p-8 shadow-xl rounded-lg text-center w-full md:w-1/3">
          <Image src="/home/pricing-young.png" alt="Young Contestent" width={300} height={200} className="mx-auto rounded-lg mb-6" />
          <h3 className="text-3xl font-semibold text-sky-600 mb-4">6-8 Years</h3>
          <p className="text-4xl font-bold text-gray-700 mb-2">₹299</p>
          <p className="text-lg text-gray-500 mb-6">Plus GST</p>
          <p className="text-md text-gray-600">
            Perfect for young stars starting their journey. Includes stage performance, judge feedback, and fun activities!
          </p>
          <Link href="/register">
            <button className="mt-8 bg-sky-500 text-white py-2 px-6 rounded-lg hover:bg-sky-600 transition">Register Now</button>
          </Link>
        </div>
        
        {/* Plan for 9-12 years */}
        <div className="bg-white p-8 shadow-xl rounded-lg text-center w-full md:w-1/3">
          <Image src="/home/pricing-old.png" alt="Older Contestent" width={300} height={200} className="mx-auto rounded-lg mb-6" />
          <h3 className="text-3xl font-semibold text-sky-600 mb-4">9-12 Years</h3>
          <p className="text-4xl font-bold text-gray-700 mb-2">₹399</p>
          <p className="text-lg text-gray-500 mb-6">Plus GST</p>
          <p className="text-md text-gray-600">
            Ideal for more experienced performers who want to showcase their talent and compete for bigger rewards.
          </p>
          <Link href="/register">
            <button className="mt-8 bg-sky-500 text-white py-2 px-6 rounded-lg hover:bg-sky-600 transition">Register Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
