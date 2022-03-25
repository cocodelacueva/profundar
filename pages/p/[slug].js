import Head from 'next/head';
//import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/Post.module.css';

//componentes
import Header from '../../components/header';
import Footer from '../../components/footer';
import PostsSelected from '../../components/postsselected';

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
    
    let postsSelection = frontmatter.related ? frontmatter.related.split(',') : null;
    let postsSelectionFilter = [];
    if (postsSelection) {
        postsSelection.map((post, index) =>{
            let p = post.split('|');
            postsSelectionFilter.push({id:index,title:p[0],slug:p[1]});
        })
    }

    return (
        <>
        <Head>
            <title>PROFUND.AR</title>
            <meta name="description" content="Colección de tecnologías para profundar en..." />
        </Head>

        <Header />

        <div className={styles.grid}>

            <main role="main" className={styles.main_container}>
                <h3 className={styles.authorData}>Escrito por: {frontmatter.author} | <a href={frontmatter.authorurl} target="_blank"><small>{frontmatter.authorurl}</small></a> </h3>
                
                <div className={styles.content_post}>
                    <MDXRemote {...source} />
                </div>
            </main>

            <footer className={styles.page_footer}>
                <h2>{tituloFooter}</h2>
                <p>{shortDescriptionFooter}</p>
                
                <PostsSelected posts={postsSelectionFilter} styles={styles.posts_selected_container} />

                <img src="/images/profundar.svg" alt="©Profundate por Emi" className={styles.image_background} />
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