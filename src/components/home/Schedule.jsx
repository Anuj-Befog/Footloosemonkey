import Image from 'next/image'
import React from 'react'

export default function Schedule() {
  return (
    <div className='bg-[aliceblue] flex justify-center items-center'>
      <Image 
        width={1300}
        height={520}
        src="/Schedule/schedule.png"
        alt='Schedule'
        className=''
      />
    </div>
  )
}
