import { useStateContext } from '../state/StateContext'
import { BsBagCheckFill } from 'react-icons/bs'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { runFireworks } from '../utils/utils'


const success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();

    useEffect(() => {
        localStorage.clear()
        setTotalPrice(0)
        setTotalQuantity(0)
        setCartItems([]);

        runFireworks();
    }, [])

    return (
        <div className='flex justify-center px-2'>
            <div className='w-full md:w-9/12 min-h-[64vh] flex justify-center items-center rounded-md px-3 py-4 bg-gray-200 text-center'>
                <div>
                    <p className='flex text-7xl w-full justify-center text-green-500 mb-4'>
                        <BsBagCheckFill />
                    </p>

                    <h2 className='font-bold text-4xl text-blue-500 mb-2'>Thank you for your order!</h2>
                    <p className='font-semibold text-lg mb-5'>Check your email inbox for the receipt.</p>
                    <p className='font-semibold text-lg mt-[50px] mb-6'>If you have any questions, please email <span className='text-red-500'>contact@example.com</span></p>
                    <Link href='/'>
                        <button type="button" className='uppercase transiton duration-100 rounded-md hover:scale-90 font-semibold text-white text-lg bg-red-500 py-2 min-w-[250px]'>
                            Continue shopping
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default success