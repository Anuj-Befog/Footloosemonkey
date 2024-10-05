import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="bg-[#E0F7FA] min-h-screen">
            <div className="container mx-auto px-8 py-16">
                <h1 className="text-5xl font-bold text-center mb-12 text-sky-700">About Footloosemonkey</h1>

                <div className="text-center mb-12">
                    <p className="text-xl leading-8 text-gray-700">
                        Welcome to Footloosemonkey, the ultimate platform for young and talented performers! We are passionate about giving children aged 6-12 a stage to express their creativity in singing, dancing, acting, and mimicry. Our mission is to inspire confidence, nurture talent, and create stars in a fun, supportive, and safe environment.
                    </p>
                    <p className="text-xl leading-8 text-gray-700 mt-6">
                        At Footloosemonkey, we believe that every child has a unique talent waiting to shine. Whether it&apos;s singing a beautiful melody, dancing to upbeat tunes, performing a dramatic scene, or mimicking your favorite character, our competition is the perfect place for kids to showcase their skills.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-12">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <Image src="/about/old-children.jpg" alt="Performers on stage" width={600} height={350} className="rounded-lg" />
                        <h2 className="text-3xl font-semibold mt-8 text-sky-700">Our Vision</h2>
                        <p className="text-xl mt-4 text-gray-600">
                            To create a vibrant community where children can grow, gain confidence, and explore their artistic potential. We are dedicated to bringing out the best in every performer and making their journey as exciting as possible!
                        </p>
                    </div>

                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <Image src="/about/young-children.jpg" alt="Dancers performing" width={600} height={350} className="rounded-lg" />
                        <h2 className="text-3xl font-semibold mt-8 text-sky-700">What We Offer</h2>
                        <ul className="list-disc list-inside text-xl text-gray-600 mt-4 space-y-3">
                            <li>Professional guidance from expert judges</li>
                            <li>Opportunities to perform on a big stage</li>
                            <li>Exciting prizes and recognition for talent</li>
                            <li>A platform to collaborate with other young performers</li>
                            <li>A fun-filled experience where every child is a winner!</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-4xl text-center font-bold mb-12 text-sky-700">Why Choose Footloosemonkey?</h2>
                    <div className="grid grid-cols-3 gap-10">
                        <div className="bg-white p-8 shadow-md rounded-md text-center">
                            <Image src="/about/singing.png" alt="Singing" width={250} height={180} className="rounded-md mx-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Singing</h3>
                            <p className="text-xl mt-4 text-gray-600">From classical to pop, our singing competition allows young vocalists to take the stage and shine in front of the world.</p>
                        </div>
                        <div className="bg-white p-8 shadow-md rounded-md text-center">
                            <Image src="/about/dancing.png" alt="Dancing" width={300} height={180} className="rounded-md mx-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Dancing</h3>
                            <p className="text-xl mt-4 text-gray-600">Our dancing competition invites performers to express themselves through movement and choreography.</p>
                        </div>
                        <div className="bg-white p-8 shadow-md rounded-md text-center">
                            <Image src="/about/mimicryAndDancing.jpg" alt="Acting" width={400} height={180} className="rounded-md mx-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Acting & Mimicry</h3>
                            <p className="text-xl mt-4 text-gray-600">Young actors and mimics get the chance to bring their favorite characters to life and showcase their creativity.</p>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h2 className="text-6xl font-bold text-sky-700">Choose Your Plan</h2>
                        <p className="text-xl text-gray-600 mt-4">Flexible pricing options for every young performer.</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-10">

                        {/* Card for 6-8 years */}
                        <div className="bg-white p-8 shadow-2xl rounded-xl w-full md:w-1/3 relative">
                            <Image src="/about/young-performer.png" alt="Young Contestent" width={350} height={250} className="rounded-xl mx-auto" />
                            <div className="absolute -top-8 left-4 bg-sky-600 text-white px-4 py-2 rounded-lg text-lg">Most Popular</div>
                            <h3 className="text-4xl font-semibold text-sky-700 mt-8">6-8 Years</h3>
                            <p className="text-5xl font-extrabold text-gray-900 mt-4">₹299</p>
                            <p className="text-gray-600 mt-2">GST included</p>
                            <p className="text-lg text-gray-500 mt-4">Includes stage performance, feedback, and exciting activities!</p>
                            <Link href="/register">
                                <button className="mt-8 bg-sky-700 hover:bg-sky-800 text-white py-3 px-8 rounded-full transition">Register</button>
                            </Link>
                        </div>

                        {/* Card for 9-12 years */}
                        <div className="bg-white p-8 shadow-2xl rounded-xl w-full md:w-1/3 relative">
                            <Image src="/about/older-performer.png" alt="Older Contestent" width={185} height={250} className="rounded-xl mx-auto" />
                            <div className="absolute -top-8 left-4 bg-cyan-600 text-white px-4 py-2 rounded-lg text-lg">Best Value</div>
                            <h3 className="text-4xl font-semibold text-sky-700 mt-8">9-12 Years</h3>
                            <p className="text-5xl font-extrabold text-gray-900 mt-4">₹399</p>
                            <p className="text-gray-600 mt-2">GST included</p>
                            <p className="text-lg text-gray-500 mt-4">Perfect for experienced performers aiming to compete for bigger prizes.</p>
                            <Link href="/register">
                                <button className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-8 rounded-full transition">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-24">
                    <h3 className="text-4xl font-bold text-sky-700 mb-8">Join the Competition Today!</h3>
                    <p className="text-xl leading-8 text-gray-700 max-w-3xl mx-auto">
                        At Footloosemonkey, we are all about making dreams come true. Every child who steps onto our stage has the chance to become the next big star. So, what are you waiting for? Register now and let your talent shine!
                    </p>
                    <div className="mt-10">
                        <Link href='/register'>
                            <Image src="/about/register-btn.png" alt="Register now" width={300} height={100} className="mx-auto cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}