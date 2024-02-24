'use client'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';


const page = () => {

    
  return (
    <div className=' h-screen w-full flex bg-neutral-50'>
    <div className=' p-8 md:p-20 w-full md:w-[60%] md:flex md:flex-col md:items-center'>
      <p className=' uppercase font-semibold'>
        step 1 of 2
      </p>

      <div className=' w-full bg-slate-200 rounded-2xl h-3 mt-5'>
        <div className=' w-1/2 h-full bg-sky-500 rounded-2xl'>

        </div>
      </div>

      <div className=' mt-10 w-full'>
        <div className='cat-select flex flex-col gap-5'>
            <Link href={'/register/attendee'}>Attendee</Link>
            <Link href={'/register/family'}>Family</Link>
            <Link href={'/register/group'}>Group</Link>
        </div>

        <div className=' flex mt-10 gap-5 '>
          <Link href={'/'} className='purple-btn '>
            Back
          </Link>
          {/* <p className=' black-btn'>
            Skip this step
          </p> */}
        </div>
      </div>
    </div>



    <div className=' hidden md:flex'>
      <Image src={'/assets/onboard/hbd.jpg'} alt='' width={500} height={100} className=' h-screen w-full object-cover' />
    </div>

  </div>
  )
}

export default page