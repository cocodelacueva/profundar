import Head from 'next/head';
import Link from 'next/link'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PROFUND.AR</title>
        <meta name="description" content="Sitio creado para profundar en nuevos conocimientos." />
      </Head>
      
      <h1 className={styles.main_title}>
        <Link href="/temas">
        Profund.ar
        </Link>
      </h1>
      
    </div>
  )
}
