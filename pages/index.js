import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import profundarSVG from '../public/images/profundar.svg';
//import profundarPNG from '../public/images/profundar.png';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PROFUND.AR</title>
        <meta name="description" content="Sitio creado para profundar en nuevos conocimientos." />
      </Head>
      
      <Image className={styles.image_background}
        src={profundarSVG}
        alt="©Profundate por Emi"
        layout='fill'
        />
      <h1 className={styles.main_title}>
        <Link href="/posts">
          Profund.ar
        </Link>
      </h1>
      
    </div>
  )
}
