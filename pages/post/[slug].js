import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react'

import styles from '../../styles/Post.module.css';
import profundarSVG from '../../public/images/profundar.svg';

//componentes
import Header from '../../components/header';
import Footer from '../../components/footer';

import { getFilesBySlug, getFiles } from '../../lib/mdx';

import { MDXRemote } from 'next-mdx-remote';

export default function Post( { source, frontmatter } ) {
    const
        postFooterTitle = "¿Te empapaste lo suficiente?",
        postFooterText = "Volver a empezar y seguir aprendiendo.",
        tituloFooter = "Profundar a futuro...",
        shortDescriptionFooter = "¿Qué deberiamos aprender?",
        noDataTitle = "Hubo un error en el contenido",
        noDataButtonText = "Volver al inicio";
   
    
    return (
        <>
        <Head>
            <title>PROFUND.AR</title>
            <meta name="description" content="Colección de tecnologías para profundar en..." />
        </Head>

        <Header />

        <div className={styles.grid}>

            <main role="main" className={styles.main_container}>
            <div className={styles.content_post}>
                <MDXRemote {...source} />
            </div>
            </main>

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
        
        <Footer />
        </>
    )
}


//get data from fake db
// Post.getInitialProps = async (ctx) => {
//     const res = await fetch(`http://localhost:3000/api/post/${ctx.query.slug}`)
//     const json = await res.json()
//     return { data: json }
// }

export async function getStaticProps( {params} ) {
    const {source, frontmatter} = await getFilesBySlug(params.slug);
    return { props: { source, frontmatter } }
}

export async function getStaticPaths() {
    const posts = await getFiles();
    const paths = posts.map((post) => ({
            params: {
                slug: post.replace(/\.md/, ''),
            }
        })
    )
    return {
        paths,
        fallback: false
    }
}