import Image from 'next/image'
import React from 'react'

const Singing = () => {
  return (
    <div className='bg-[#FFD8D8] pt-10 pb-14'>
      <div className='w-full h-[950px]'>
        <h1 className='text-center mt-7 text-5xl font-semibold text-[#FF0000]'>Singing</h1>
        <div className="flex">
          <div className="flex flex-col ml-14 mt-16">
            <p className='text-xl font-semibold'>Welcome to the Footloosemonkey Singing Competition, where your voice takes center stage. Whether you sing solo or in a group, this is your chance to showcase your talent and impress our judges. </p>
            <ul className='list-disc ml-20 mt-5'>
              <li className='font-semibold'><span className='text-[#FF0000]'>Show Off Your Skills:</span> Sing your heart out in any genre you love - pop, classical, rock, or folk.</li>
              <li className='font-semibold'><span className='text-[#FF0000]'>Build Confidence: Gain performance</span> experience in a supportive environment.</li>
              <li className='font-semibold'><span className='text-[#FF0000]'>Win Exciting Prizes:</span> Compete for amazing rewards and recognition</li>
            </ul>
            <p className='mt-5 text-xl font-semibold'>Don’t miss out on this fantastic opportunity to become a star! Register now and let your voice be heard across the world.</p>
            <p className='mt-10 text-xl font-semibold'>Register today and start your journey to stardom!</p>
            <Image 
              src="/register-sing-btn.png" 
              width={292} 
              height={39} 
              className='mx-auto mt-10' 
              alt="Register button for singing competition" 
            />
          </div>
          <Image 
            src="/singing-page.png" 
            width={503} 
            height={503} 
            alt="Singing competition page image" 
          />
        </div>
        <h1 className='mt-12 text-3xl text-center'>Our <span className='text-[#FF0000]'>Winners</span></h1>
        <div className='flex justify-center mt-10 gap-14'>
          <Image src="/sing-win.png" width={178} height={164} alt="Singing competition winner" />
          <Image src="/sing-win.png" width={178} height={164} alt="Singing competition winner" />
          <Image src="/sing-win.png" width={178} height={164} alt="Singing competition winner" />
          <Image src="/sing-win.png" width={178} height={164} alt="Singing competition winner" />
          <Image src="/sing-win.png" width={178} height={164} alt="Singing competition winner" />
        </div>
        <Image 
          src="/see-more.png" 
          width={126} 
          height={27} 
          className='absolute right-[118px] mt-[79px]' 
          alt="See more button" 
        />
      </div>
    </div>
  )
}

export default Singing
