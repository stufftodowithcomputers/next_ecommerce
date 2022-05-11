import React from 'react'

const Footer = () => {
  const date = new Date();

  return (
    <div className='flex items-center justify-center py-5'>
      <p className='text-xl text-gray-500'>&copy; {date.getFullYear()} Ecommerce All rights reserved</p>
    </div>
  )
}

export default Footer