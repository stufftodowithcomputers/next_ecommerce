import { Toaster } from 'react-hot-toast'
import { StateContext } from '../state/StateContext'
import '../styles/globals.css'
import { Layout } from '../utils/components'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  ) 
    
}

export default MyApp
