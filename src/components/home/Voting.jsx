import Image from 'next/image';

const Voting = () => {
  return (
    <div className="bg-[aliceblue] py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-sky-700 mb-6">Hurry Up, Vote Now!</h2>
        <p className="text-lg text-gray-600 mb-10">Support your favorite contestant and help them shine! Every vote counts.</p>
        
        <div className="bg-white shadow-xl p-8 rounded-lg max-w-lg mx-auto">
          <Image src="/voting/vote-banner.jpg" alt="Vote Now" width={500} height={300} className="rounded-lg mx-auto" />
          <h3 className="text-3xl font-semibold text-sky-700 mt-6">Your Vote Matters!</h3>
          <p className="text-gray-600 mt-4">Be part of the journey. Vote for the contestant who deserves to win!</p>
        </div>

        <p className="text-lg text-gray-600 mt-12">Make sure your favorite contestant wins by voting today!</p>
      </div>
    </div>
  );
};

export default Voting;
