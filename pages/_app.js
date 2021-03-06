import '../styles/globals.css';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div id="root">
      <Head>
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </div>
    )
}

export default MyApp
