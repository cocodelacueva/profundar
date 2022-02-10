import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Posts.module.css';
import profundarSVG from '../public/images/profundar.svg';

//componentes
import Header from '../components/header';
import Footer from '../components/footer';
import PostShort from '../components/post.short';

import { getAllFilesMetaData, orderByDataDesc } from '../lib/mdx';



export default function Posts({posts}) {
    
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

                    {posts ? 
                    <section className={styles.posts_container}>
                        {
                            //recorro Posts
                            posts.map(post => PostShort(post))
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
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesMetaData();
    posts.sort(orderByDataDesc).slice(0, 5);
    return {
        props: {
            posts 
        } 
    }
}