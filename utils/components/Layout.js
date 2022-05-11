import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div>
        <Head>
            <title>Ecommerce store</title>
        </Head>
        <header>
            <Navbar />
        </header>
        <main className='min-h-[95vh]'>
            { children }
        </main>
        <footer>
            <Footer />
        </footer>

    </div>
  )
}

export default Layout