import Image from 'next/image';
import Link from 'next/link';

const Acting = () => {
  return (
    <div className="bg-[aliceblue]">
      <div className="pt-10 pb-14 container">
        <h2 className="text-5xl text-center font-bold md:mb-20 mb-14">Acting Competition</h2>
        <div className="flex md:ml-14">
          <div>
            <h1 className="text-2xl font-semibold text-[#004873] mb-6">
              Unleash Your Inner Star with Our Acting Competition!
            </h1>
            <p className="text-xl mb-8">
              Have you ever dreamed of being on stage or in the spotlight? Do you love pretending to be different characters and telling amazing stories? If so, our Acting Competition is the perfect place for you to shine!
            </p>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Why Join?</h3>
              <ul className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Show Your Talent:</span> Perform your favorite scenes, monologues, or create your own original skits.</li>
                <li><span className="font-semibold text-sky-900">Build Confidence:</span> Acting helps you become more confident and expressive.</li>
                <li><span className="font-semibold text-sky-900">Win Prizes:</span> Stand a chance to win awesome prizes and recognition for your talent.</li>
              </ul>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Who Can Participate?</h3>
              <p className="text-xl mt-7 md:mx-14">All young stars aged 3 to 12 who love acting and performing!</p>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">How to Join:</h3>
              <ol className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Register:</span> Click the Register button below to sign up.</li>
                <li><span className="font-semibold text-sky-900">Prepare Your Act:</span> Practice your performance and get ready to impress the judges.</li>
                <li><span className="font-semibold text-sky-900">Submit Your Video:</span> Record your act and upload it to our platform.</li>
              </ol>
            </div>
          </div>
          <Image
            src="/competition/acting.png"
            alt="Acting"
            width={600}
            height={400}
            className="my-[-4rem] h-[52rem] hidden md:block"
          />
        </div>
        <div className="md:pt-32 pt-16">
          <p className="pt-4 text-xl text-center md:mx-16">
            Join us and step into the world of acting where your imagination knows no bounds! Show the world what you&apos;ve got and become the next big star!
          </p>
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

export default Acting;
