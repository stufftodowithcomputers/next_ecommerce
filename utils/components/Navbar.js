import { useStateContext } from '../../state/StateContext'
import { AiOutlineShopping } from 'react-icons/ai'
import Link from 'next/link'
import React from 'react'
import Cart from './Cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext();

  return (
    <div className='flex justify-between py-3 px-6'>
      <Link href='/'>
        <p className='text-xl text-gray-500 cursor-pointer'>Ecommerce</p>
      </Link>
      
      <button onClick={() => setShowCart(!showCart)} className='relative'>
        <AiOutlineShopping className='text-gray-500' size={30} />
        <span className='absolute top-[-20%] right-[-20%] bg-red-600 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center'>{ totalQuantity }</span>
      </button>
    
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar