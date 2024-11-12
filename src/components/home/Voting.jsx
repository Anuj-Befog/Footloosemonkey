import Image from 'next/image';
import Link from 'next/link';

const Voting = () => {
  return (
    <div className="bg-[aliceblue] pt-14 pb-4 md:pb-12">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-sky-700 mb-6">Hurry Up, Vote Now!</h2>
        <p className="text-lg text-gray-600 mb-10">Support your favorite contestant and help them shine! Every vote counts.</p>

        <div className="bg-white shadow-xl p-8 rounded-lg max-w-lg mx-auto">
          <Image src="/home/vote.png" alt="Vote Now" width={250} height={250} className="rounded-lg mx-auto" />
          <h3 className="text-3xl font-semibold text-sky-700 mt-6">Your Vote Matters!</h3>
          <p className="text-gray-600 mt-4">Be part of the journey. Vote for the contestant who deserves to win!</p>
          <Link href="/spotlight">
            <button className='mt-6 uppercase w-full py-2 flex justify-center items-center bg-[#004873] text-white font-semibold rounded hover:bg-[#0076ff] transition duration-300'>Vote Now</button>
          </Link>
        </div>

        <p className="text-lg mt-8 text-blue-500">Make sure your favorite contestant wins by voting today!</p>
      </div>
    </div>
  );
};

export default Voting;
