import Head from 'next/head';
import styles from '../styles/Home.module.css';

//componentes
import Header from '../components/header';
import Footer from '../components/footer';

export default function Tecnologias() {
  return (
    <>
    <Head>
        <title>PROFUND.AR - ¿Qué te gustaría aprender?</title>
        <meta name="description" content="Colección de tecnologías para profundar en..." />
    </Head>

    <Header />

    <main role="main">
        <h1 className='title-font'>Este es el título</h1>

        <h2 className='title-font'>Este es el subtítulo</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </main>
    
    <Footer />
    </>
)}