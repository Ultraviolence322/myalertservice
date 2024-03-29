import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#fff" />
  </Head>  
  <Component {...pageProps} />
  </> 
}
