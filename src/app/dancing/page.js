import Image from 'next/image';
import Link from 'next/link';

const Dancing = () => {
  return (
    <div className='bg-[aliceblue]'>
      <div className="pt-10 pb-14 container">
        <h2 className="text-5xl text-center font-bold md:mb-20 mb-14">Dancing Competition</h2>
        <div className="flex md:ml-14">
          <div>
            <h1 className="text-2xl font-semibold text-[#004873] mb-6">
              Let the Rhythm Move You in Our Dancing Competition!
            </h1>
            <p className="text-xl mb-8">
              Show off your best moves and take the stage with confidence. Whether you love hip-hop, ballet, or freestyle, this competition is open to all dance styles!
            </p>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Why Join?</h3>
              <ul className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Show Your Talent:</span> Impress the judges with your unique dance routine.</li>
                <li><span className="font-semibold text-sky-900">Build Confidence:</span> Step into the spotlight and feel the thrill of performing on stage.</li>
                <li><span className="font-semibold text-sky-900">Win Prizes:</span> Compete for a chance to win exciting awards and be recognized for your talent.</li>
              </ul>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Who Can Participate?</h3>
              <p className="text-xl mt-7 md:mx-14">All aspiring dancers between the ages of 3 to 12 who love to dancing and want to share their passion with the world!</p>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">How to Join:</h3>
              <ol className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Register:</span> Click the Register button to sign up.</li>
                <li><span className="font-semibold text-sky-900">Prepare Your Act:</span> Rehearse and perfect your dance routine.</li>
                <li><span className="font-semibold text-sky-900">Perform on Stage:</span> Bring your routine to life and impress the crowd!</li>
              </ol>
            </div>
          </div>
          <Image
            src="/competition/dancer.png"
            alt="Dancer"
            width={600}
            height={400}
            className="my-[-10rem] h-[62rem] hidden md:block"
          />
        </div>
        <div className="md:pt-32 pt-16">
          <p className="pt-4 text-xl text-center md:mx-16">Join the competition and let the rhythm take over as you dance your way to victory!</p>
        </div>
        <div className="text-center">
          <Link href="/register">
            <button className="mt-10 font-bold py-2 px-4 rounded">
              <Image src="/competition/registerbtn.png" alt="Dancer" width={300} height={300} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dancing;
