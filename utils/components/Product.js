import { urlFor } from '../client'
import Link from 'next/link'
import React from 'react'


const Product = ({ product }) => {
  return (
    <div>
        <Link href={`/product/${product.slug.current}`}>
            <div className='cursor-pointer transition ease-linear duration-75 hover:scale-110 mb-5'>
                <img className='rounded-md bg-gray-100' src={urlFor(product.image && product.image[0])} width={250} height={250} alt='Headphones' />

                <p className='font-medium'>{ product.name }</p>
                <p className='font-extrabold mt-3'>£{ product.price.toFixed(2) }</p>
            </div>
        </Link>
    </div>
  )
}

export default Product