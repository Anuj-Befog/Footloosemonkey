import Image from 'next/image';
import Link from 'next/link';

const Singing = () => {
  return (
    <div className='bg-[aliceblue]'>
      <div className="pt-10 pb-14 container">
        <h1 className='text-5xl text-center font-bold md:mb-20 mb-14 text-sky-700'>Singing Competition</h1>
        <div className="flex md:ml-14">
          <div className="md:w-[65%] w-[100%]">
            <h1 className="text-2xl font-semibold text-[#004873] mb-6">
              Let Your Voice Soar in Our Singing Competition!
            </h1>
            <p className="text-xl mb-8">
              Take the stage and showcase your vocal talent in our exciting Singing Competition. Whether you’re a solo singer or part of a group, this is your moment to shine!
            </p>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Why Join?</h3>
              <ul className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Showcase Your Skills:</span> Sing your heart out in any genre of your choice - pop, classical, rock, or folk.</li>
                <li><span className="font-semibold text-sky-900">Build Confidence:</span> Gain valuable performance experience and enhance your stage presence.</li>
                <li><span className="font-semibold text-sky-900">Win Exciting Prizes:</span> Compete for amazing rewards and get recognized for your talent.</li>
              </ul>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Who Can Participate?</h3>
              <p className="text-xl mt-7 md:mx-14">All aspiring singers between the ages of 3 to 12 who love to sing and want to share their passion with the world!</p>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">How to Join:</h3>
              <ol className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Register:</span> Click the Register button to sign up.</li>
                <li><span className="font-semibold text-sky-900">Prepare Your Act:</span> Practice your song and get ready to perform.</li>
                <li><span className="font-semibold text-sky-900">Perform on Stage:</span> Share your talent and impress the judges!</li>
              </ol>
            </div>
          </div>
          <Image
            src="/competition/singing.png"
            alt="Singing"
            width={400}
            height={400}
            className="mt-[-4rem] h-[52rem] hidden md:block"
          />
        </div>
        <div className="md:pt-32 pt-16">
          <p className="pt-4 text-xl text-center md:mx-16">Join the competition and let your voice be heard! Whether it’s pop, classical, or folk, sing your way to stardom!</p>
        </div>
        <div className="text-center">
          <Link href="/register">
            <button className="mt-10 font-bold py-2 px-4 rounded">
              <Image src="/competition/registerbtn.png" alt="Register Button" width={300} height={300} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Singing;
