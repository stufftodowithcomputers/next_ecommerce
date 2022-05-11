import { client } from '../utils/client'
import { Banner, FooterBanner, Product } from '../utils/components'

export const getServerSideProps = async () => {
  const products = await client.fetch('*[_type == "product"]');
  const banners = await client.fetch('*[_type == "banner"]');

  return {
    props: {
      products: products,
      banners: banners
    }
  }
}

export default function Home({ products, banners }) {
  return (
    <div className='flex flex-col items-center'>
      <Banner banner={banners?.length && banners[0]} />
      
      <div className='text-center'>
        <h1 className='font-bold text-blue-700 text-4xl mt-6'>Best Seller Products</h1>
        <p className='text-blue-800 text-lg mb-4 uppercase mt-2'>Selling only the best quality speakers on the market</p>
      </div>
      
      <div className='flex flex-wrap justify-center gap-x-10 mt-5 w-full mb-6'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner banner={banners?.length && banners[0] } />
    </div>
  )
}
