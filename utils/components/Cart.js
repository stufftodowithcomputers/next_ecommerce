import { AiOutlineLeft, AiOutlineShopping, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../../state/StateContext'
import { TiDeleteOutline } from 'react-icons/ti'
import React, { useRef } from 'react'
import getStripe from '../getStripe'
import toast from 'react-hot-toast'
import {urlFor} from '../client'
import Link from 'next/link'

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantity, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

    const handleCheckout = async () => {
        console.log('Hello, world')

        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        });

        if(response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');
        let sessionId = data.id;
        stripe.redirectToCheckout({ sessionId });
    }

    return (
        <div className='fixed left-0 top-0 z-50 w-[100vw] bg-white-rgba' ref={cartRef}>
            <div className='relative h-[100vh] w-[400px] bg-white float-right py-5 px-2 md:w-[600px] md:p-2'>

                <button onClick={() => setShowCart(false)} className='flex items-center text-xl font-semibold cursor-pointer gap-0.5 ml-2'>
                    <AiOutlineLeft />
                    <span className='ml-3'>Your Cart</span>
                    <span className='ml-2 text-red-500'>({totalQuantity} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='m-6 text-center'>
                        <div className='flex justify-center'><AiOutlineShopping size={150} /></div>
                        <h3 className='font-bolder text-xl'>Your shopping bag is empty</h3>
                        <Link href='/'>
                            <button onClick={() => setShowCart(false)} className='transition duration-75 hover:scale-90 w-full max-w-[400px] py-2 px-3 rounded-md text-xl mt-6 uppercase bg-red-500 text-white cursor-pointer'>Continue shopping</button>
                        </Link>
                    </div>
                )}

                <div className='mt-3 overflow-auto max-h-[70vh] py-2 px-1'>
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className='flex gap-7 p-3' key={item._id}>
                            <img className='w-25 h-25 md:w-[180px] h-[150px] rounded-md bg-gray-500' src={urlFor(item?.image[0])} alt={item.name} />
                            <div className='px-2'>
                                <div className='flex w-[350px] font-bold text-xl text-gray-500 justify-between'>
                                    <h5>{item.name}</h5>
                                    <p>£{item.price}</p>
                                </div>
                                <div className='flex w-[350px] justify-between mt-[60px]'>
                                    <p className='flex items-center border border-1 border-gray-500 p-1'>
                                        <span onClick={() => toggleCartItemQuantity(item._id, 'dec')} className='mr-4 cursor-pointer'><AiOutlineMinus /></span>
                                        <span className='mx-2'>{ item.quantity }</span>
                                        <span onClick={() => toggleCartItemQuantity(item._id, 'inc')} className='ml-4 cursor-pointer'><AiOutlinePlus /></span>
                                    </p>
                                    <button onClick={() => onRemove(item)} className='text-red-600'>
                                        <TiDeleteOutline fontSize={26} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {cartItems.length >= 1 && (
                        <div className="absolute w-full left-0 bottom-0 my-6">
                            <div className="flex justify-around text-xl font-semibold">
                                <h3>Subtotal:</h3>
                                <h3>${totalPrice.toFixed(2)}</h3>
                            </div>
                            <div className="flex justify-center mt-5">
                                <button onClick={handleCheckout} type="button" className='transiton duration-100 rounded-md hover:scale-90 font-semibold text-white text-lg bg-red-500 py-2 min-w-[250px]'>
                                    Pay with Stripe
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div> 
        </div>
    )
}

export default Cart