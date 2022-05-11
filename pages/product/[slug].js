import { AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { client, urlFor } from '../../utils/client'
import { Product } from '../../utils/components'
import { useStateContext } from '../../state/StateContext'
import React, { useState } from 'react'



const Details = ({ product, products }) => {
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    }

    return (
        <div>
            <div className='flex flex-wrap gap-10 m-6'>
                <div>
                    <div className='w-full flex justify-center'>
                        <div className='transition duration-150 ease-in-out w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-md cursor-pointer bg-gray-200 hover:bg-red-600'>
                            <img src={urlFor(product.image && product?.image[index])} alt='Product'/>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-5'>
                        {product?.image?.map((img, i) => (
                            <img 
                            key={i} 
                            alt='Product'
                            onClick={() => setIndex(i)}
                            src={urlFor(img)} 
                            className={`${i == index ? 'bg-red-500' : 'bg-gray-200'} rounded-md w-[70px] h-[70px] cursor-pointer`} />
                        ))}
                    </div>
                </div>

                <div className='mt-3'>
                    <h1 className='text-gray-500 font-bold text-4xl'>{ product.name }</h1>
                    <div className='flex gap-1 text-yellow-400 mt-3 items-center'>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                        <p className='text-gray-500 text-base'>
                            (20)
                        </p>
                    </div>
                    <h4 className='text-gray-500 font-semibold mt-3 text-2xl'>Details: </h4>
                    <p className='text-gray-500 mt-3 text-xl'>{ product.details }</p>
                    <p className='text-red-500 font-semibold text-3xl my-6'>£{ product.price.toFixed(2) }</p>
                    <div className='flex gap-4 mt-3 items-center'>
                        <h3 className='text-lg font-semibold'>Quantity:</h3>
                        <p className='flex items-center border border-1 border-gray-500 p-1'>
                            <span onClick={decQty} className='mr-4 cursor-pointer'><AiOutlineMinus /></span>
                            <span className='mx-2'>{ qty }</span>
                            <span onClick={incQty} className='ml-4 cursor-pointer'><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='flex flex-col gap-8 mt-5'>
                        <button onClick={() => onAdd(product, qty)} className='transiton duration-100 hover:scale-90 text-red-500 text-lg border border-1 border-red-500 py-2 min-w-[250px]'>Add to cart</button>
                        <button onClick={handleBuyNow} className='transiton duration-100 hover:scale-90 font-semibold text-white text-lg bg-red-500 py-2 min-w-[250px]'>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className='mt-[100px]'>
                <h2 className='text-center text-gray-500 text-3xl font-bold'>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: {
            product: product,
            products: products
        }
    }
}

export const getStaticPaths = async () => {
    const query = `*[_type =="product"] {
        slug {
            current
        }
    } `;

    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}
export default Details