import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Posts.module.css';
import profundarSVG from '../public/images/profundar.svg';

//componentes
import Header from '../components/header';
import Footer from '../components/footer';
import PostShort from '../components/post.short';



export default function Posts( { data } ) {
    //textos
    const tituloPagina = 'Tecnologías:',
        short_description = 'Profundate en cualquier tema y aprendelo a fondo.',
        tituloFooter = "Profundar a futuro...",
        shortDescriptionFooter = "¿Qué deberiamos aprender?",
        noDataTitle = "¡Cuidado!",
        noDataMessage = "Esta vacío.",
        noDataButtonText = "Volver al inicio.";

    return (
        <>
            <Head>
                <title>PROFUND.AR - ¿Qué te gustaría aprender?</title>
                <meta name="description" content="Colección de tecnologías para profundar en..." />
            </Head>

            <Header />

            <main role="main" className={styles.main_container}>
                <header className={styles.page_header}>
                    <h1 className='title-font'>{tituloPagina}</h1>
                    <p>{short_description}</p>
                </header>

                <div className={styles.grid}>

                    {data && !data.error ? 
                    <section className={styles.posts_container}>
                        {
                            //recorro Posts
                            data.body.posts.map(articulo => PostShort(articulo))
                        }
                    </section> 
                    :
                    //no hay contenido
                    <section className={styles.no_data_container}>
                        <h2>
                            {noDataTitle}
                        </h2>
                        <p>
                            {noDataMessage}
                        </p>
                        <Link href="/"><a> {noDataButtonText}</a></Link>
                        

                    </section> }
                    
                    <footer className={styles.page_footer}>
                        <h2>{tituloFooter}</h2>
                        <p>{shortDescriptionFooter}</p>

                        <Image className={styles.image_background}
                            src={profundarSVG}
                            alt="©Profundate por Emi"
                            layout='responsive'
                            />
                    </footer>
                    
                </div>
            </main>
            
            <Footer />
        </>
)}


//get data from fake db
Posts.getInitialProps = async ({ query }) => {
    const res = await fetch(`http://localhost:3000/api/posts`)
    const json = await res.json()
    return { data: json }
}