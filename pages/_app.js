import '../styles/reset.css'
import '../styles/globals.css';
import '../styles/Header.component.css';
import '../styles/Footer.component.css';

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
