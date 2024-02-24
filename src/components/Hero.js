import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div 
        className='relative h-screen bg-cover' 
        style={{backgroundImage: "url('/assets/backgrounds/hero-bg.svg')"}}>
            <div className=' fixed top-0 left-0 w-screen h-screen overflow-hidden '>
                <video 
                    className=' absolute top-0 h-full w-full object-cover' 
                    width={'auto'}
                    height={'auto'}
                    autoPlay
                    muted
                    loop
                    preload='none'>
                    <source src='/assets/backgrounds/bg-vid.mp4' type='video/mp4' />
                </video>

            </div>
        <div className=' absolute top-0 bg-black h-screen w-full opacity-60 z-10' />
        <div className=' absolute flex items-center justify-center text-white h-full w-full z-20'>
            <div className=' w-full flex flex-col md:flex-row items-center justify-center gap-10'>
                <Link href={'/register'} className='act-btn'>
                    REGISTER
                </Link>
                <p className='act-btn'>
                    ACCOMODATION
                </p>
            </div>
        </div>
    </div>
  )
}

export default Hero