import { urlFor } from '../client'
import Link from 'next/link'
import React from 'react'


const FooterBanner = ({ banner }) => {
  return (
    <div className="md:py-[100] md:px-[40px] h-[560px] mt-[80px] bg-red-600 w-full rounded-md">
      <div className="relative flex gap-x-4 justify-between items-center h-full">
        <div className="ml-[25px] text-white">
          <p className='text-2xl mb-3'>{banner.discount}</p>
          <h3 className='font-black text-3xl md:text-6xl'>{banner.largeText1}</h3>
          <h3 className='font-black text-3xl md:text-6xl mb-3'>{banner.largeText2}</h3>
          <p className='text-xl mb-3'>{banner.saleTime}</p>
        </div>
        <div className="mr-[25px] text-white">
          <p className='text-xl mb-3'>{banner.smallText}</p>
          <h3 className='font-black text-3xl md:text-6xl mb-3'>{banner.midText}</h3>
          <p className='text-xl mb-3'>{banner.desc}</p>
          <Link href={`/product/${banner.product}`}>
            <button className='transition duration-75 hover:scale-90 rounded-md mt-4 px-4 py-2 bg-white text-red-600 font-semibold cursor-pointer text-base md:text-2xl' type="button">{banner.buttonText}</button>
          </Link>
        </div>

        <img 
          src={urlFor(banner.image)} className="absolute lg:left-[25%] md:top[-25%] md:left-[15%] left-[0%] top-[6%]"
        />
      </div>
    </div>
  )
}

export default FooterBanner