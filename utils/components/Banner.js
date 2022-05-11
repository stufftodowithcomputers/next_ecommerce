import { urlFor } from '../client'
import React from 'react'
import Link from 'next/link'

const Banner = ({ banner }) => {
  return (
    <div className='relative w-full lg:w-10/12 h-[560px] md:h-[500px] bg-gray-200 rounded-md'>
      <img className='absolute w-[77%] h-[62%] top-[5%] right[-6%] md:top-0 md:right-20 w-[450px] h-[450px]' src={urlFor(banner.image)} alt='HEADPHONES' />
      <div className='p-6'>
        <p className='font-semibold text-lg mb-4'>{ banner.smallText }</p>
        <h3 className='text-white font-bold text-3xl md:text-6xl mb-4'>{ banner.midText }</h3>
        <h1 className='text-white font-bold text-4xl md:text-9xl mb-4'>{ banner.largeText1 }</h1>

        <div className='mt-6'>
          <Link href={`/product/${banner.product}`}>
            <button className='transition duration-75 hover:scale-90 px-4 py-2 text-xl bg-red-600 text-white uppercase rounded-md'>{ banner.buttonText }</button>
          </Link>

          <div className='absolute right-10 bottom-5 w-[300px] text-left'>
            <p className='font-semibold text-blue-700 text-lg mb-1'>Description</p>
            <p className='text-blue-800 text-lg mb-4 uppercase'>{banner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner