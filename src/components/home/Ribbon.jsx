import React from 'react'
import Image from 'next/image'

export default function Ribbon() {
  return (
    <>
      {/* Image */}
      <div className='hidden 2xl:block'>
        <Image
          width={100}
          height={100}
          src="/collaboration/register.svg"
          alt="Collaboration"
          className="absolute object-cover right-0 w-[9rem]"
        />
      </div>
    </>
  )
}
